import { useState, useEffect, useRef, useCallback } from 'react';

// Hook personalizado para Auto-save
export const useAutoSave = (data, saveFunction, options = {}) => {
  const {
    delay = 30000, // 30 segundos por defecto
    enabled = true,
    onSaveStart,
    onSaveSuccess,
    onSaveError,
    debounceDelay = 1000 // 1 segundo de debounce
  } = options;

  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveCount, setSaveCount] = useState(0);

  const autoSaveTimer = useRef(null);
  const debounceTimer = useRef(null);
  const lastDataRef = useRef(null);
  const isInitialMount = useRef(true);

  // Detectar cambios en los datos
  useEffect(() => {
    if (isInitialMount.current) {
      lastDataRef.current = JSON.stringify(data);
      isInitialMount.current = false;
      return;
    }

    const currentDataString = JSON.stringify(data);
    const hasDataChanged = currentDataString !== lastDataRef.current;

    if (hasDataChanged) {
      setHasChanges(true);
      lastDataRef.current = currentDataString;

      // Limpiar timers existentes
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }

      // Configurar nuevo timer de auto-save con debounce
      debounceTimer.current = setTimeout(() => {
        if (enabled) {
          autoSaveTimer.current = setTimeout(() => {
            performAutoSave();
          }, delay);
        }
      }, debounceDelay);
    }
  }, [data, delay, enabled, debounceDelay]);

  const performAutoSave = useCallback(async () => {
    if (!hasChanges || isAutoSaving) return;

    setIsAutoSaving(true);
    onSaveStart?.();

    try {
      await saveFunction(data);
      setLastSaved(new Date());
      setHasChanges(false);
      setSaveCount(prev => prev + 1);
      onSaveSuccess?.(data);
    } catch (error) {
      console.error('Auto-save failed:', error);
      onSaveError?.(error);
    } finally {
      setIsAutoSaving(false);
    }
  }, [data, hasChanges, isAutoSaving, saveFunction, onSaveStart, onSaveSuccess, onSaveError]);

  // Limpiar timers al desmontar
  useEffect(() => {
    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const forceAutoSave = useCallback(() => {
    if (hasChanges) {
      performAutoSave();
    }
  }, [hasChanges, performAutoSave]);

  const resetChanges = useCallback(() => {
    setHasChanges(false);
    lastDataRef.current = JSON.stringify(data);
  }, [data]);

  return {
    isAutoSaving,
    lastSaved,
    hasChanges,
    saveCount,
    forceAutoSave,
    resetChanges
  };
};

// Sistema de versionado local
export class VersionManager {
  constructor(key, maxVersions = 10) {
    this.key = key;
    this.maxVersions = maxVersions;
    this.versions = this.loadVersions();
  }

  loadVersions() {
    try {
      const stored = localStorage.getItem(`${this.key}_versions`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading versions:', error);
      return [];
    }
  }

  saveVersions() {
    try {
      localStorage.setItem(`${this.key}_versions`, JSON.stringify(this.versions));
    } catch (error) {
      console.error('Error saving versions:', error);
    }
  }

  createVersion(data, description = 'Auto-save') {
    const version = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      description,
      data: JSON.parse(JSON.stringify(data)), // Deep clone
      size: JSON.stringify(data).length
    };

    this.versions.unshift(version);

    // Mantener solo las versiones más recientes
    if (this.versions.length > this.maxVersions) {
      this.versions = this.versions.slice(0, this.maxVersions);
    }

    this.saveVersions();
    return version;
  }

  getVersions() {
    return this.versions;
  }

  getVersion(id) {
    return this.versions.find(v => v.id === id);
  }

  deleteVersion(id) {
    this.versions = this.versions.filter(v => v.id !== id);
    this.saveVersions();
  }

  clear() {
    this.versions = [];
    this.saveVersions();
    localStorage.removeItem(`${this.key}_backup`);
  }

  // Backup de emergencia
  createBackup(data) {
    try {
      const backup = {
        timestamp: new Date().toISOString(),
        data: JSON.parse(JSON.stringify(data))
      };
      localStorage.setItem(`${this.key}_backup`, JSON.stringify(backup));
    } catch (error) {
      console.error('Error creating backup:', error);
    }
  }

  getBackup() {
    try {
      const backup = localStorage.getItem(`${this.key}_backup`);
      return backup ? JSON.parse(backup) : null;
    } catch (error) {
      console.error('Error loading backup:', error);
      return null;
    }
  }
}

// Hook para gestión de versiones
export const useVersionManager = (key, data, maxVersions = 10) => {
  const [versionManager] = useState(() => new VersionManager(key, maxVersions));
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    setVersions(versionManager.getVersions());
  }, [versionManager]);

  const createVersion = useCallback((description) => {
    const version = versionManager.createVersion(data, description);
    setVersions(versionManager.getVersions());
    return version;
  }, [versionManager, data]);

  const restoreVersion = useCallback((versionId) => {
    const version = versionManager.getVersion(versionId);
    return version ? version.data : null;
  }, [versionManager]);

  const deleteVersion = useCallback((versionId) => {
    versionManager.deleteVersion(versionId);
    setVersions(versionManager.getVersions());
  }, [versionManager]);

  const createBackup = useCallback(() => {
    versionManager.createBackup(data);
  }, [versionManager, data]);

  const getBackup = useCallback(() => {
    return versionManager.getBackup();
  }, [versionManager]);

  const clearVersions = useCallback(() => {
    versionManager.clear();
    setVersions([]);
  }, [versionManager]);

  return {
    versions,
    createVersion,
    restoreVersion,
    deleteVersion,
    createBackup,
    getBackup,
    clearVersions
  };
};

// Función para detectar si hay cambios no guardados al salir
export const useUnsavedChangesWarning = (hasChanges, message = '¿Estás seguro de que quieres salir? Los cambios no guardados se perderán.') => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasChanges, message]);
};