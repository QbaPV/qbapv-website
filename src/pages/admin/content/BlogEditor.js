import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Image as ImageIcon, 
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Link,
  Code,
  Type,
  Plus,
  Trash2,
  RefreshCw,
  Clock,
  Calendar,
  Tag,
  Users,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  RotateCcw,
  Settings,
  Hash
} from 'lucide-react';
import MediaManager from './MediaManager';

const BlogEditor = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    id: null,
    title: { es: '', en: '', pt: '', fr: '', de: '', it: '' },
    excerpt: { es: '', en: '', pt: '', fr: '', de: '', it: '' },
    content: { es: '', en: '', pt: '', fr: '', de: '', it: '' },
    category: '',
    tags: [],
    author: 'QbaPV Team',
    publishedAt: null,
    status: 'draft',
    featured: false,
    image: '',
    readTime: 0,
    views: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [editorMode, setEditorMode] = useState('wysiwyg');
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [showMediaManager, setShowMediaManager] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const contentEditor = useRef(null);
  const autoSaveTimer = useRef(null);
  const originalPost = useRef(null);

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
    'Tecnología',
    'Inteligencia Artificial',
    'Blockchain',
    'Finanzas',
    'Tutoriales',
    'Noticias'
  ];

  const statusOptions = [
    { value: 'draft', label: 'Borrador', color: 'gray' },
    { value: 'review', label: 'En Revisión', color: 'yellow' },
    { value: 'scheduled', label: 'Programado', color: 'blue' },
    { value: 'published', label: 'Publicado', color: 'green' }
  ];

  useEffect(() => {
    if (postId) {
      loadPost(postId);
    } else {
      setPost(prev => ({
        ...prev,
        id: 'new-' + Date.now()
      }));
    }
  }, [postId]);

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
  }, [hasChanges, post]);

  useEffect(() => {
    const content = post.content[currentLanguage] || '';
    const plainText = content.replace(/<[^>]*>/g, '');
    const words = plainText.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    
    const readTime = Math.max(1, Math.ceil(words.length / 200));
    if (readTime !== post.readTime) {
      handleInputChange('readTime', readTime);
    }
  }, [post.content, currentLanguage]);

  const loadPost = async (id) => {
    try {
      const mockPost = {
        id: id,
        title: {
          es: 'Estrategias de Trading Avanzadas para 2025',
          en: 'Advanced Trading Strategies for 2025',
          pt: 'Estratégias de Trading Avançadas para 2025',
          fr: 'Stratégies de Trading Avancées pour 2025',
          de: 'Erweiterte Trading-Strategien für 2025',
          it: 'Strategie di Trading Avanzate per il 2025'
        },
        excerpt: {
          es: 'Descubre las técnicas más efectivas para maximizar tus ganancias en los mercados financieros.',
          en: 'Discover the most effective techniques to maximize your profits in financial markets.',
          pt: 'Descubra as técnicas mais eficazes para maximizar seus lucros nos mercados financeiros.',
          fr: 'Découvrez les techniques les plus efficaces pour maximiser vos profits sur les marchés financiers.',
          de: 'Entdecken Sie die effektivsten Techniken, um Ihre Gewinne an den Finanzmärkten zu maximieren.',
          it: 'Scopri le tecniche più efficaci per massimizzare i tuoi profitti nei mercati finanziari.'
        },
        content: {
          es: '<h2>Introducción al Trading Moderno</h2><p>El mundo del trading ha evolucionado significativamente en los últimos años...</p>',
          en: '<h2>Introduction to Modern Trading</h2><p>The trading world has evolved significantly in recent years...</p>',
          pt: '<h2>Introdução ao Trading Moderno</h2><p>O mundo do trading evoluiu significativamente nos últimos anos...</p>',
          fr: '<h2>Introduction au Trading Moderne</h2><p>Le monde du trading a considérablement évolué ces dernières années...</p>',
          de: '<h2>Einführung in das moderne Trading</h2><p>Die Trading-Welt hat sich in den letzten Jahren erheblich weiterentwickelt...</p>',
          it: '<h2>Introduzione al Trading Moderno</h2><p>Il mondo del trading si è evoluto significativamente negli ultimi anni...</p>'
        },
        category: 'Trading & Análisis',
        tags: ['trading', 'estrategias', 'finanzas', 'inversión'],
        author: 'QbaPV Team',
        publishedAt: '2025-07-01T10:00:00Z',
        status: 'published',
        featured: true,
        image: '/images/blog/trading-strategies.jpg',
        readTime: 8,
        views: 1250,
        createdAt: '2025-06-28T15:30:00Z',
        updatedAt: '2025-07-01T10:00:00Z'
      };

      setPost(mockPost);
      originalPost.current = JSON.parse(JSON.stringify(mockPost));
    } catch (error) {
      console.error('Error loading post:', error);
    }
  };

  const handleInputChange = (field, value, language = null) => {
    setPost(prev => {
      const newPost = { ...prev };
      
      if (language) {
        newPost[field] = { ...newPost[field], [language]: value };
      } else {
        newPost[field] = value;
      }
      
      newPost.updatedAt = new Date().toISOString();
      return newPost;
    });

    setHasChanges(true);
  };

  const handleTagAdd = (tag) => {
    if (tag && !post.tags.includes(tag)) {
      handleInputChange('tags', [...post.tags, tag]);
    }
  };

  const handleTagRemove = (tagToRemove) => {
    handleInputChange('tags', post.tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSaved(new Date());
      setHasChanges(false);
      originalPost.current = JSON.parse(JSON.stringify(post));
      alert('Artículo guardado exitosamente');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error al guardar el artículo');
    } finally {
      setSaving(false);
    }
  };

  const handleAutoSave = async () => {
    if (!hasChanges) return;
    setAutoSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLastSaved(new Date());
      setHasChanges(false);
    } catch (error) {
      console.error('Error in auto-save:', error);
    } finally {
      setAutoSaving(false);
    }
  };

  const handlePublish = async () => {
    if (window.confirm('¿Publicar este artículo ahora?')) {
      handleInputChange('status', 'published');
      handleInputChange('publishedAt', new Date().toISOString());
      await handleSave();
    }
  };

  const handleMediaSelect = (file) => {
    if (editorMode === 'wysiwyg' && contentEditor.current) {
      const imageHtml = `<img src="${file.url}" alt="${file.name}" class="w-full rounded-lg my-4" />`;
      document.execCommand('insertHTML', false, imageHtml);
      handleInputChange('content', contentEditor.current.innerHTML, currentLanguage);
    }
    setShowMediaManager(false);
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    if (contentEditor.current) {
      handleInputChange('content', contentEditor.current.innerHTML, currentLanguage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                  {postId ? 'Editar Artículo' : 'Nuevo Artículo'}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {lastSaved && (
                    <span>Guardado: {lastSaved.toLocaleTimeString()}</span>
                  )}
                  <span>{wordCount} palabras</span>
                  <span>{post.readTime} min lectura</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {autoSaving && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Guardando...</span>
                </div>
              )}

              {hasChanges && !autoSaving && (
                <div className="flex items-center space-x-2 text-amber-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Sin guardar</span>
                </div>
              )}

              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setEditorMode('wysiwyg')}
                  className={`px-3 py-1 rounded text-sm ${editorMode === 'wysiwyg' ? 'bg-white shadow' : ''}`}
                >
                  Editor
                </button>
                <button
                  onClick={() => setEditorMode('preview')}
                  className={`px-3 py-1 rounded text-sm ${editorMode === 'preview' ? 'bg-white shadow' : ''}`}
                >
                  Preview
                </button>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>Guardar</span>
              </button>

              {post.status !== 'published' && (
                <button
                  onClick={handlePublish}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>Publicar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
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

            <div className="bg-white rounded-lg shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título ({languages.find(l => l.code === currentLanguage)?.name})
              </label>
              <input
                type="text"
                value={post.title[currentLanguage] || ''}
                onChange={(e) => handleInputChange('title', e.target.value, currentLanguage)}
                className="w-full px-0 py-2 text-3xl font-bold border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 placeholder-gray-400"
                placeholder="Título de tu artículo..."
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resumen ({languages.find(l => l.code === currentLanguage)?.name})
              </label>
              <textarea
                value={post.excerpt[currentLanguage] || ''}
                onChange={(e) => handleInputChange('excerpt', e.target.value, currentLanguage)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Breve descripción del artículo..."
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-2 mb-4 flex-wrap gap-2">
                <button
                  onClick={() => formatText('bold')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Negrita"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  onClick={() => formatText('italic')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Cursiva"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  onClick={() => formatText('underline')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Subrayado"
                >
                  <Underline className="h-4 w-4" />
                </button>
                
                <div className="w-px h-6 bg-gray-300" />
                
                <button
                  onClick={() => formatText('formatBlock', 'h2')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Título 2"
                >
                  <Type className="h-4 w-4" />
                </button>
                <button
                  onClick={() => formatText('insertUnorderedList')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Lista"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => formatText('insertOrderedList')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Lista numerada"
                >
                  <ListOrdered className="h-4 w-4" />
                </button>
                <button
                  onClick={() => formatText('formatBlock', 'blockquote')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Cita"
                >
                  <Quote className="h-4 w-4" />
                </button>
                
                <div className="w-px h-6 bg-gray-300" />
                
                <button
                  onClick={() => setShowMediaManager(true)}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Insertar imagen"
                >
                  <ImageIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => formatText('formatBlock', 'pre')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Código"
                >
                  <Code className="h-4 w-4" />
                </button>
              </div>

              <div
                ref={contentEditor}
                contentEditable
                className="min-h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent prose prose-lg max-w-none"
                style={{ outline: 'none' }}
                dangerouslySetInnerHTML={{ __html: post.content[currentLanguage] || '' }}
                onInput={(e) => handleInputChange('content', e.target.innerHTML, currentLanguage)}
                placeholder="Comienza a escribir tu artículo..."
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Publicación</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    value={post.status}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Autor</label>
                  <input
                    type="text"
                    value={post.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={post.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                    Artículo destacado
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Imagen destacada</h3>
              
              {post.image ? (
                <div className="relative">
                  <img
                    src={post.image}
                    alt="Imagen destacada"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleInputChange('image', '')}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Sin imagen</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowMediaManager(true)}
                className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Seleccionar imagen
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Categoría</h3>
              
              <select
                value={post.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Etiquetas</h3>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                    <button
                      onClick={() => handleTagRemove(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              
              <input
                type="text"
                placeholder="Agregar etiqueta..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleTagAdd(e.target.value.trim());
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

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

export default BlogEditor;