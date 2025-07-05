import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Calendar,
  Tag,
  Image as ImageIcon,
  FileText,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import contentService from '../../../services/contentService';

const ContentManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projectsData, blogData] = await Promise.all([
        contentService.getProjects(),
        contentService.getBlogPosts()
      ]);
      setProjects(projectsData || []);
      setBlogPosts(blogData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      try {
        await contentService.deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error al eliminar el proyecto');
      }
    }
  };

  const handleDeleteBlogPost = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
      try {
        await contentService.deleteBlogPost(id);
        setBlogPosts(blogPosts.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert('Error al eliminar el artículo');
      }
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const ProjectCard = ({ project }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Tag size={14} />
                {project.category || 'Sin categoría'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(project.date || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
          {project.image && (
            <img 
              src={project.image} 
              alt={project.title}
              className="w-20 h-20 object-cover rounded-lg ml-4"
            />
          )}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            project.status === 'published' ? 'bg-green-100 text-green-800' :
            project.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {project.status === 'published' ? 'Publicado' :
             project.status === 'draft' ? 'Borrador' : 'Estado desconocido'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/admin/content/projects/edit/${project.id}`)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Editar"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => window.open(`/projects/${project.slug || project.id}`, '_blank')}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Ver"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => handleDeleteProject(project.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Eliminar"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const BlogPostCard = ({ post }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Tag size={14} />
                {post.category || 'Sin categoría'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(post.date || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title}
              className="w-20 h-20 object-cover rounded-lg ml-4"
            />
          )}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            post.status === 'published' ? 'bg-green-100 text-green-800' :
            post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {post.status === 'published' ? 'Publicado' :
             post.status === 'draft' ? 'Borrador' : 'Estado desconocido'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/admin/content/blog/edit/${post.id}`)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Editar"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => window.open(`/blog/${post.slug || post.id}`, '_blank')}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Ver"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => handleDeleteBlogPost(post.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Eliminar"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const StatsCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando contenido...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Contenido</h1>
        <p className="text-gray-600">Administra proyectos, artículos de blog y archivos multimedia</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Proyectos" 
          value={projects.length} 
          icon={FileText} 
          color="bg-blue-500"
        />
        <StatsCard 
          title="Artículos Blog" 
          value={blogPosts.length} 
          icon={Edit3} 
          color="bg-green-500"
        />
        <StatsCard 
          title="Publicados" 
          value={[...projects, ...blogPosts].filter(item => item.status === 'published').length} 
          icon={Eye} 
          color="bg-purple-500"
        />
        <StatsCard 
          title="Borradores" 
          value={[...projects, ...blogPosts].filter(item => item.status === 'draft').length} 
          icon={Settings} 
          color="bg-orange-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/admin/content/projects/edit/new')}
            className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Plus className="text-blue-600" size={20} />
            <span className="text-blue-900 font-medium">Nuevo Proyecto</span>
          </button>
          <button
            onClick={() => navigate('/admin/content/blog/edit/new')}
            className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Plus className="text-green-600" size={20} />
            <span className="text-green-900 font-medium">Nuevo Artículo</span>
          </button>
          <button
            onClick={() => navigate('/admin/content/media')}
            className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <ImageIcon className="text-purple-600" size={20} />
            <span className="text-purple-900 font-medium">Gestionar Archivos</span>
          </button>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between p-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'projects'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Proyectos ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab('blog')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'blog'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Blog ({blogPosts.length})
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos</option>
                <option value="published">Publicados</option>
                <option value="draft">Borradores</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-6">
          {activeTab === 'projects' && (
            <div>
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchTerm || filterStatus !== 'all' ? 'No se encontraron proyectos' : 'No hay proyectos'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || filterStatus !== 'all' 
                      ? 'Intenta cambiar los filtros de búsqueda'
                      : 'Comienza creando tu primer proyecto'
                    }
                  </p>
                  {!searchTerm && filterStatus === 'all' && (
                    <button
                      onClick={() => navigate('/admin/content/projects/edit/new')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Crear Primer Proyecto
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'blog' && (
            <div>
              {filteredBlogPosts.length === 0 ? (
                <div className="text-center py-12">
                  <Edit3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchTerm || filterStatus !== 'all' ? 'No se encontraron artículos' : 'No hay artículos'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || filterStatus !== 'all'
                      ? 'Intenta cambiar los filtros de búsqueda'
                      : 'Comienza escribiendo tu primer artículo'
                    }
                  </p>
                  {!searchTerm && filterStatus === 'all' && (
                    <button
                      onClick={() => navigate('/admin/content/blog/edit/new')}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Escribir Primer Artículo
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBlogPosts.map(post => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;