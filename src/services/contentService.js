// Servicio para gestión de contenido CRUD
export class ContentService {
  constructor() {
    this.baseUrl = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5001/api';
  }

  // Proyectos
  async getProjects() {
    try {
      const response = await fetch(`${this.baseUrl}/projects`);
      if (!response.ok) {
        // Fallback a archivo JSON local si API no disponible
        const jsonResponse = await fetch('/data/projects.json');
        return await jsonResponse.json();
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting projects:', error);
      // Fallback a archivo JSON local
      try {
        const jsonResponse = await fetch('/data/projects.json');
        return await jsonResponse.json();
      } catch (fallbackError) {
        console.error('Error with JSON fallback:', fallbackError);
        return [];
      }
    }
  }

  async saveProject(project) {
    try {
      const method = project.id && !project.id.startsWith('new-') ? 'PUT' : 'POST';
      const url = method === 'PUT' ? `${this.baseUrl}/projects/${project.id}` : `${this.baseUrl}/projects`;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error saving project:', error);
      // Para desarrollo, simular guardado exitoso
      if (process.env.NODE_ENV === 'development') {
        console.log('Simulating project save in development mode');
        return { success: true, id: project.id || Date.now().toString() };
      }
      throw error;
    }
  }

  async deleteProject(id) {
    try {
      const response = await fetch(`${this.baseUrl}/projects/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  // Blog posts
  async getBlogPosts() {
    try {
      const response = await fetch(`${this.baseUrl}/blog`);
      if (!response.ok) {
        // Fallback a archivo JSON local si API no disponible
        const jsonResponse = await fetch('/data/blog-posts.json');
        return await jsonResponse.json();
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting blog posts:', error);
      // Fallback a archivo JSON local
      try {
        const jsonResponse = await fetch('/data/blog-posts.json');
        return await jsonResponse.json();
      } catch (fallbackError) {
        console.error('Error with JSON fallback:', fallbackError);
        return [];
      }
    }
  }

  async saveBlogPost(post) {
    try {
      const method = post.id && !post.id.startsWith('new-') ? 'PUT' : 'POST';
      const url = method === 'PUT' ? `${this.baseUrl}/blog/${post.id}` : `${this.baseUrl}/blog`;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error saving blog post:', error);
      // Para desarrollo, simular guardado exitoso
      if (process.env.NODE_ENV === 'development') {
        console.log('Simulating blog post save in development mode');
        return { success: true, id: post.id || Date.now().toString() };
      }
      throw error;
    }
  }

  async deleteBlogPost(id) {
    try {
      const response = await fetch(`${this.baseUrl}/blog/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  }

  // Media
  async uploadMedia(file, folder = 'general') {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      
      const response = await fetch(`${this.baseUrl}/media/upload`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error uploading media:', error);
      // Para desarrollo, simular upload exitoso
      if (process.env.NODE_ENV === 'development') {
        console.log('Simulating media upload in development mode');
        const fileName = file.name;
        const fileUrl = URL.createObjectURL(file);
        return { 
          success: true, 
          fileName, 
          url: fileUrl,
          path: `/uploads/${folder}/${fileName}`
        };
      }
      throw error;
    }
  }

  async getMediaFiles(folder = 'general') {
    try {
      const response = await fetch(`${this.baseUrl}/media?folder=${folder}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting media files:', error);
      // Para desarrollo, retornar array vacío
      return [];
    }
  }

  async deleteMedia(id) {
    try {
      const response = await fetch(`${this.baseUrl}/media/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting media:', error);
      throw error;
    }
  }
}

export default new ContentService();
