import React, { useState, useEffect, useCallback } from 'react';
import { 
  Upload, 
  Image, 
  File, 
  Trash2, 
  Download, 
  Search, 
  Grid, 
  List, 
  Filter,
  FolderPlus,
  X,
  Check,
  AlertCircle,
  Loader
} from 'lucide-react';

const MediaManager = ({ onSelectMedia, isModal = false, onClose }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFolder, setCurrentFolder] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [dragOver, setDragOver] = useState(false);

  // Folders disponibles
  const folders = [
    { id: 'all', name: 'Todos los archivos', count: files.length },
    { id: 'projects', name: 'Proyectos', count: files.filter(f => f.folder === 'projects').length },
    { id: 'blog', name: 'Blog', count: files.filter(f => f.folder === 'blog').length },
    { id: 'general', name: 'General', count: files.filter(f => f.folder === 'general').length }
  ];

  // Cargar archivos existentes
  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setLoading(true);
    try {
      // Simular carga de archivos con imágenes que sí existen
      const mockFiles = [
        {
          id: '1',
          name: 'favicon-32x32.png',
          url: '/favicon-32x32.png',
          type: 'image/png',
          size: 2048,
          folder: 'general',
          uploadedAt: new Date(Date.now() - 86400000).toISOString(),
          dimensions: { width: 32, height: 32 }
        },
        {
          id: '2',
          name: 'apple-touch-icon.png',
          url: '/apple-touch-icon.png',
          type: 'image/png',
          size: 15360,
          folder: 'general',
          uploadedAt: new Date(Date.now() - 172800000).toISOString(),
          dimensions: { width: 180, height: 180 }
        },
        {
          id: '3',
          name: 'qbapv-og-image.svg',
          url: '/images/qbapv-og-image.svg',
          type: 'image/svg+xml',
          size: 8192,
          folder: 'projects',
          uploadedAt: new Date(Date.now() - 259200000).toISOString(),
          dimensions: { width: 1200, height: 630 }
        },
        {
          id: '4',
          name: 'placeholder-project.svg',
          url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="200" y="150" text-anchor="middle" dy=".3em" font-family="Arial" font-size="18" fill="%236b7280"%3EImagen de Proyecto%3C/text%3E%3C/svg%3E',
          type: 'image/svg+xml',
          size: 1024,
          folder: 'projects',
          uploadedAt: new Date().toISOString(),
          dimensions: { width: 400, height: 300 }
        },
        {
          id: '5',
          name: 'placeholder-blog.svg',
          url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"%3E%3Crect width="600" height="400" fill="%23e5e7eb"/%3E%3Ctext x="300" y="200" text-anchor="middle" dy=".3em" font-family="Arial" font-size="20" fill="%234b5563"%3EImagen de Blog%3C/text%3E%3C/svg%3E',
          type: 'image/svg+xml',
          size: 1536,
          folder: 'blog',
          uploadedAt: new Date().toISOString(),
          dimensions: { width: 600, height: 400 }
        }
      ];

      setFiles(mockFiles);
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar archivos
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = currentFolder === 'all' || file.folder === currentFolder;
    return matchesSearch && matchesFolder;
  });

  // Manejar drag & drop
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles);
    }
  }, []);

  // Subir archivos
  const handleFileUpload = async (fileList) => {
    setUploading(true);
    try {
      const uploadPromises = Array.from(fileList).map(async (file) => {
        // Simular subida de archivo
        return new Promise((resolve) => {
          setTimeout(() => {
            const newFile = {
              id: Date.now() + Math.random(),
              name: file.name,
              url: URL.createObjectURL(file),
              type: file.type,
              size: file.size,
              folder: currentFolder === 'all' ? 'general' : currentFolder,
              uploadedAt: new Date().toISOString(),
              dimensions: file.type.startsWith('image/') ? { width: 0, height: 0 } : null
            };
            resolve(newFile);
          }, 1000);
        });
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      setFiles(prev => [...prev, ...uploadedFiles]);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  // Eliminar archivo
  const handleDeleteFile = (fileId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este archivo?')) {
      setFiles(prev => prev.filter(f => f.id !== fileId));
      setSelectedFiles(prev => prev.filter(id => id !== fileId));
    }
  };

  // Seleccionar archivo
  const handleSelectFile = (file) => {
    if (isModal && onSelectMedia) {
      onSelectMedia(file);
      if (onClose) onClose();
    } else {
      setSelectedFiles(prev => 
        prev.includes(file.id) 
          ? prev.filter(id => id !== file.id)
          : [...prev, file.id]
      );
    }
  };

  // Formatear tamaño de archivo
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Componente FileCard
  const FileCard = ({ file }) => (
    <div 
      className={`relative bg-white rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
        selectedFiles.includes(file.id) ? 'border-blue-500' : 'border-gray-200'
      }`}
      onClick={() => handleSelectFile(file)}
    >
      {/* Preview de imagen */}
      <div className="aspect-square rounded-t-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        {file.type.startsWith('image/') ? (
          <img
            src={file.url}
            alt={file.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : (
          <File className="w-12 h-12 text-gray-400" />
        )}
        <div className="hidden w-full h-full items-center justify-center">
          <File className="w-12 h-12 text-gray-400" />
        </div>
      </div>

      {/* Información del archivo */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 truncate" title={file.name}>
          {file.name}
        </h3>
        <div className="mt-1 text-xs text-gray-500">
          <div>{formatFileSize(file.size)}</div>
          <div>{new Date(file.uploadedAt).toLocaleDateString()}</div>
        </div>
      </div>

      {/* Overlay de selección */}
      {selectedFiles.includes(file.id) && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
          <div className="bg-blue-500 text-white p-1 rounded-full">
            <Check className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Acciones */}
      <div className="absolute top-2 right-2 flex space-x-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(file.url, '_blank');
          }}
          className="p-1 bg-white bg-opacity-80 rounded hover:bg-opacity-100 transition-all"
          title="Ver/Descargar"
        >
          <Download className="w-3 h-3 text-gray-600" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteFile(file.id);
          }}
          className="p-1 bg-white bg-opacity-80 rounded hover:bg-opacity-100 transition-all"
          title="Eliminar"
        >
          <Trash2 className="w-3 h-3 text-red-600" />
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Cargando archivos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Archivos</h1>
          <p className="text-gray-600">Administra y organiza tus archivos multimedia</p>
        </div>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar archivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtro por carpeta */}
          <select
            value={currentFolder}
            onChange={(e) => setCurrentFolder(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {folders.map(folder => (
              <option key={folder.id} value={folder.id}>
                {folder.name} ({folder.count})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          {/* Modo de vista */}
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Upload */}
          <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Subir Archivos</span>
            <input
              type="file"
              multiple
              accept="image/*,video/*,application/pdf"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Área de archivos */}
      <div className="flex-1 p-6">
        {/* Drag & Drop Zone */}
        <div
          className={`min-h-96 border-2 border-dashed rounded-lg transition-colors ${
            dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">Subiendo archivos...</p>
              </div>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-center">
              <div>
                <Image className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No se encontraron archivos' : 'No hay archivos'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm 
                    ? 'Intenta cambiar los términos de búsqueda'
                    : 'Arrastra archivos aquí o haz clic en "Subir Archivos"'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4'
              : 'space-y-2 p-4'
            }>
              {filteredFiles.map(file => (
                <FileCard key={file.id} file={file} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {selectedFiles.length > 0 && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedFiles.length} archivo(s) seleccionado(s)
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedFiles([])}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Deseleccionar
              </button>
              <button
                onClick={() => {
                  selectedFiles.forEach(handleDeleteFile);
                  setSelectedFiles([]);
                }}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar Seleccionados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManager;