import axios from 'axios';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired, etc.)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service methods
const api = {
  // Auth endpoints
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  register: async (userData) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock user with the provided data
      const user = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        ...userData,
        createdAt: new Date().toISOString()
      };
      
      // Generate a fake token
      const token = 'fake_token_' + Math.random().toString(36).substr(2, 16);
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Store user data in localStorage (for demo purposes)
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  resetPassword: async (token, password) => {
    try {
      const response = await apiClient.post('/auth/reset-password', { token, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getUserProfile: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/auth/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Waste endpoints
  getWasteItems: async (filters = {}) => {
    try {
      const response = await apiClient.get('/waste', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getWasteItemById: async (id) => {
    try {
      const response = await apiClient.get(`/waste/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createWasteItem: async (wasteData) => {
    try {
      const response = await apiClient.post('/waste', wasteData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateWasteItem: async (id, wasteData) => {
    try {
      const response = await apiClient.put(`/waste/${id}`, wasteData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteWasteItem: async (id) => {
    try {
      const response = await apiClient.delete(`/waste/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Order endpoints
  getOrders: async (filters = {}) => {
    try {
      const response = await apiClient.get('/orders', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await apiClient.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(`/orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // User endpoints (admin only)
  getUsers: async (filters = {}) => {
    try {
      const response = await apiClient.get('/users', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getUserById: async (id) => {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await apiClient.post('/users', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await apiClient.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Prediction endpoints
  predictWaste: async (predictionData) => {
    try {
      const response = await apiClient.post('/predictions', predictionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Chat endpoints
  getConversations: async () => {
    try {
      const response = await apiClient.get('/chat/conversations');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getMessages: async (conversationId) => {
    try {
      const response = await apiClient.get(`/chat/conversations/${conversationId}/messages`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  sendMessage: async (conversationId, content) => {
    try {
      const response = await apiClient.post(`/chat/conversations/${conversationId}/messages`, { content });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createConversation: async (recipientId) => {
    try {
      const response = await apiClient.post('/chat/conversations', { recipientId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Also add this function to get the current user
  getCurrentUser: async () => {
    try {
      // In a real app, this would make an API call with the token
      // For demo, just get from localStorage
      const userData = localStorage.getItem('user');
      if (!userData) {
        throw new Error('No user found');
      }
      return JSON.parse(userData);
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default api; 