import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Wand2,
  Settings,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  RotateCcw
} from 'lucide-react';
import MediaManager from './MediaManager';

const ProjectsEditor = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    id: null,
    title: { es: '', en: '', pt: '', fr: '', de: '', it: '' },
    description: { es: '', en: '', pt: '', fr: '', de: '', it: '' },
    category: '',
    image: '',
    technologies: [],
    demoUrl: '',
    githubUrl: '',
    status: 'completed',
    featured: false,
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showMediaManager, setShowMediaManager] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [autoSaving, setAutoSaving] = useState(false);

  // Referencias para auto-save
  const autoSaveTimer = useRef(null);
  const originalProject = useRef(null);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ];

  const categories = [
    'Trading & Análisis',
    'Criptomonedas',
    'Desarrollo Web',
    'Aplicaciones Móviles',
    'Inteligencia Artificial',
    'Blockchain',
    'E-commerce',
    'Consultoría'
  ];

  const technologies = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'JavaScript',
    'TypeScript', 'PHP', 'Laravel', 'Django', 'Express', 'MongoDB',
    'MySQL', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Redis',
    'GraphQL', 'REST API', 'WebSocket', 'Blockchain', 'Solidity'
  ];

  const statusOptions = [
    { value: 'planning', label: 'En Planificación', color: 'gray' },
    { value: 'development', label: 'En Desarrollo', color: 'blue' },
    { value: 'testing', label: 'En Pruebas', color: 'yellow' },
    { value: 'completed', label: 'Completado', color: 'green' },
    { value: 'maintenance', label: 'Mantenimiento', color: 'purple' }
  ];

  // Cargar proyecto existente o inicializar nuevo
  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    } else {
      // Nuevo proyecto
      setProject(prev => ({
        ...prev,
        id: 'new-' + Date.now(),
        order: Math.floor(Math.random() * 100)
      }));
    }
  }, [projectId]);

  // Auto-save cada 30 segundos
  useEffect(() => {
    if (hasChanges && !autoSaving) {
      autoSaveTimer.current = setTimeout(() => {
        handleAutoSave();
      }, 30000);
    }

    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
    };
  }, [hasChanges, project]);

  const loadProject = async (id) => {
    try {
      // Simular carga de proyecto desde API
      const mockProject = {
        id: id,
        title: {
          es: 'Sistema de Trading Avanzado',
          en: 'Advanced Trading System',
          pt: 'Sistema de Trading Avançado',
          fr: 'Système de Trading Avancé',
          de: 'Erweiteres Trading-System',
          it: 'Sistema di Trading Avanzato'
        },
        description: {
          es: 'Plataforma completa de análisis técnico con algoritmos de IA para predicción de mercados financieros.',
          en: 'Complete technical analysis platform with AI algorithms for financial market prediction.',
          pt: 'Plataforma completa de análise técnica com algoritmos de IA para previsão de mercados financeiros.',
          fr: 'Plateforme complète d\'analyse technique avec algorithmes IA pour la prédiction des marchés financiers.',
          de: 'Vollständige technische Analyseplattform mit KI-Algorithmen zur Vorhersage von Finanzmärkten.',
          it: 'Piattaforma completa di analisi tecnica con algoritmi AI per la previsione dei mercati finanziari.'
        },
        category: 'Trading & Análisis',
        image: '/images/projects/trading-analysis.jpg',
        technologies: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS'],
        demoUrl: 'https://demo.qbapv.com/trading',
        githubUrl: 'https://github.com/QbaPV/trading-system',
        status: 'completed',
        featured: true,
        order: 1,
        createdAt: '2025-06-15T10:00:00Z',
        updatedAt: '2025-07-01T15:30:00Z'
      };

      setProject(mockProject);
      originalProject.current = JSON.parse(JSON.stringify(mockProject));
    } catch (error) {
      console.error('Error loading project:', error);
    }
  };

  const handleInputChange = (field, value, language = null) => {
    setProject(prev => {
      const newProject = { ...prev };
      
      if (language) {
        newProject[field] = { ...newProject[field], [language]: value };
      } else {
        newProject[field] = value;
      }
      
      newProject.updatedAt = new Date().toISOString();
      return newProject;
    });

    setHasChanges(true);
    setValidationErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleTechnologyToggle = (tech) => {
    const newTechnologies = project.technologies.includes(tech)
      ? project.technologies.filter(t => t !== tech)
      : [...project.technologies, tech];
    
    handleInputChange('technologies', newTechnologies);
  };

  const validateProject = () => {
    const errors = {};

    // Validar título en idioma principal
    if (!project.title.es.trim()) {
      errors.title = 'El título en español es requerido';
    }

    // Validar descripción en idioma principal
    if (!project.description.es.trim()) {
      errors.description = 'La descripción en español es requerida';
    }

    // Validar categoría
    if (!project.category) {
      errors.category = 'La categoría es requerida';
    }

    // Validar imagen
    if (!project.image) {
      errors.image = 'La imagen es requerida';
    }

    // Validar al menos una tecnología
    if (project.technologies.length === 0) {
      errors.technologies = 'Selecciona al menos una tecnología';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateProject()) {
      return;
    }

    setSaving(true);
    try {
      // Simular guardado en API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLastSaved(new Date());
      setHasChanges(false);
      originalProject.current = JSON.parse(JSON.stringify(project));
      
      // Mostrar notificación de éxito
      alert('Proyecto guardado exitosamente');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error al guardar el proyecto');
    } finally {
      setSaving(false);
    }
  };

  const handleAutoSave = async () => {
    if (!hasChanges) return;

    setAutoSaving(true);
    try {
      // Simular auto-save en API
      await new Promise(resolve => setTimeout(resolve, 500));
      setLastSaved(new Date());
      setHasChanges(false);
    } catch (error) {
      console.error('Error in auto-save:', error);
    } finally {
      setAutoSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Descartar todos los cambios?')) {
      setProject(JSON.parse(JSON.stringify(originalProject.current)));
      setHasChanges(false);
      setValidationErrors({});
    }
  };

  const handleMediaSelect = (file) => {
    handleInputChange('image', file.url);
    setShowMediaManager(false);
  };

  // Preview del proyecto
  const ProjectPreview = () => {
    const getStatusColor = (status) => {
      const statusOption = statusOptions.find(s => s.value === status);
      return statusOption ? statusOption.color : 'gray';
    };

    const previewClasses = {
      desktop: 'w-full max-w-4xl',
      tablet: 'w-full max-w-2xl',
      mobile: 'w-full max-w-sm'
    };

    return (
      <div className={`mx-auto ${previewClasses[previewMode]} transition-all duration-300`}>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Imagen del proyecto */}
          <div className="relative h-48 sm:h-64 bg-gradient-to-br from-blue-500 to-purple-600">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title[currentLanguage] || project.title.es}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-white/50" />
              </div>
            )}
            
            {/* Badge de estado */}
            <div className="absolute top-4 right-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(project.status)}-100 text-${getStatusColor(project.status)}-800`}>
                {statusOptions.find(s => s.value === project.status)?.label || project.status}
              </span>
            </div>

            {/* Badge featured */}
            {project.featured && (
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  ⭐ Destacado
                </span>
              </div>
            )}
          </div>

          <div className="p-6">
            {/* Título y categoría */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {project.title[currentLanguage] || project.title.es || 'Título del proyecto'}
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {project.category || 'Sin categoría'}
              </span>
            </div>

            {/* Descripción */}
            <p className="text-gray-600 mb-4 leading-relaxed">
              {project.description[currentLanguage] || project.description.es || 'Descripción del proyecto...'}
            </p>

            {/* Tecnologías */}
            {project.technologies.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Tecnologías:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Enlaces */}
            <div className="flex space-x-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/content')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {projectId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                </h1>
                {lastSaved && (
                  <p className="text-sm text-gray-500">
                    Último guardado: {lastSaved.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Indicador de auto-save */}
              {autoSaving && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Guardando...</span>
                </div>
              )}

              {/* Indicador de cambios */}
              {hasChanges && !autoSaving && (
                <div className="flex items-center space-x-2 text-amber-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Cambios sin guardar</span>
                </div>
              )}

              {/* Controles de preview */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-white shadow' : ''}`}
                  title="Vista Desktop"
                >
                  <Monitor className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('tablet')}
                  className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-white shadow' : ''}`}
                  title="Vista Tablet"
                >
                  <Tablet className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-white shadow' : ''}`}
                  title="Vista Mobile"
                >
                  <Smartphone className="h-4 w-4" />
                </button>
              </div>

              {/* Acciones */}
              <button
                onClick={handleReset}
                disabled={!hasChanges}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Descartar</span>
              </button>

              <button
                onClick={handleSave}
                disabled={saving || Object.keys(validationErrors).length > 0}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{saving ? 'Guardando...' : 'Guardar'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panel de edición */}
          <div className="space-y-6">
            {/* Selector de idioma */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Idioma de edición</h3>
              <div className="grid grid-cols-3 gap-2">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang.code)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                      currentLanguage === lang.code
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Información básica */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Información básica</h3>
              
              {/* Título */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título ({languages.find(l => l.code === currentLanguage)?.name})
                </label>
                <input
                  type="text"
                  value={project.title[currentLanguage] || ''}
                  onChange={(e) => handleInputChange('title', e.target.value, currentLanguage)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    validationErrors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ingresa el título del proyecto"
                />
                {validationErrors.title && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
                )}
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción ({languages.find(l => l.code === currentLanguage)?.name})
                </label>
                <textarea
                  value={project.description[currentLanguage] || ''}
                  onChange={(e) => handleInputChange('description', e.target.value, currentLanguage)}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    validationErrors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe el proyecto"
                />
                {validationErrors.description && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
                )}
              </div>

              {/* Categoría */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                <select
                  value={project.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    validationErrors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {validationErrors.category && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.category}</p>
                )}
              </div>

              {/* Estado */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <select
                  value={project.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destacado */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={project.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                  Proyecto destacado
                </label>
              </div>
            </div>

            {/* Imagen */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Imagen del proyecto</h3>
              
              <div className="mb-4">
                {project.image ? (
                  <div className="relative">
                    <img
                      src={project.image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleInputChange('image', '')}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No hay imagen seleccionada</p>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowMediaManager(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ImageIcon className="h-4 w-4" />
                <span>Seleccionar imagen</span>
              </button>

              {validationErrors.image && (
                <p className="mt-2 text-sm text-red-600">{validationErrors.image}</p>
              )}
            </div>

            {/* Tecnologías */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tecnologías</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {technologies.map(tech => (
                  <button
                    key={tech}
                    onClick={() => handleTechnologyToggle(tech)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                      project.technologies.includes(tech)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>

              {validationErrors.technologies && (
                <p className="text-sm text-red-600">{validationErrors.technologies}</p>
              )}
            </div>

            {/* URLs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Enlaces</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL Demo</label>
                  <input
                    type="url"
                    value={project.demoUrl}
                    onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://demo.ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL GitHub</label>
                  <input
                    type="url"
                    value={project.githubUrl}
                    onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/usuario/repo"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Panel de preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Preview</h3>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <select
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <ProjectPreview />
            </div>
          </div>
        </div>
      </div>

      {/* Media Manager Modal */}
      {showMediaManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl h-5/6">
            <MediaManager
              isModal={true}
              onSelectMedia={handleMediaSelect}
              onClose={() => setShowMediaManager(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsEditor;