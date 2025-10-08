// API Integration for Netflix Clone Frontend
// This file handles all API calls to the backend

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiClient {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = localStorage.getItem('token');
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    // Remove authentication token
    removeToken() {
        this.token = null;
        localStorage.removeItem('token');
    }

    // Make HTTP request
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        // Add authorization header if token exists
        if (this.token) {
            config.headers.Authorization = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Authentication API
    async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async login(credentials) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async logout() {
        const result = await this.request('/auth/logout', {
            method: 'POST',
        });
        this.removeToken();
        return result;
    }

    async getProfile() {
        return this.request('/auth/profile');
    }

    async updateProfile(userData) {
        return this.request('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    }

    async changePassword(passwordData) {
        return this.request('/auth/change-password', {
            method: 'PUT',
            body: JSON.stringify(passwordData),
        });
    }

    // Posts API
    async getPosts(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/posts${queryString ? `?${queryString}` : ''}`);
    }

    async getPost(id) {
        return this.request(`/posts/${id}`);
    }

    async createPost(postData) {
        return this.request('/posts', {
            method: 'POST',
            body: JSON.stringify(postData),
        });
    }

    async updatePost(id, postData) {
        return this.request(`/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(postData),
        });
    }

    async deletePost(id) {
        return this.request(`/posts/${id}`, {
            method: 'DELETE',
        });
    }

    async likePost(id) {
        return this.request(`/posts/${id}/like`, {
            method: 'POST',
        });
    }

    async addComment(id, content) {
        return this.request(`/posts/${id}/comments`, {
            method: 'POST',
            body: JSON.stringify({ content }),
        });
    }

    async searchPosts(query, params = {}) {
        const searchParams = { q: query, ...params };
        const queryString = new URLSearchParams(searchParams).toString();
        return this.request(`/posts/search?${queryString}`);
    }

    // Contact API
    async submitContact(contactData) {
        return this.request('/contact', {
            method: 'POST',
            body: JSON.stringify(contactData),
        });
    }

    // File Upload API
    async uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${this.baseURL}/upload/image`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Upload failed');
        }

        return data;
    }

    async uploadImages(files) {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('images', file);
        });

        const response = await fetch(`${this.baseURL}/upload/images`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Upload failed');
        }

        return data;
    }

    // Health check
    async healthCheck() {
        return this.request('/health');
    }
}

// Create and export API client instance
const apiClient = new ApiClient();

// Initialize token from localStorage
const savedToken = localStorage.getItem('token');
if (savedToken) {
    apiClient.setToken(savedToken);
}

export default apiClient;

// Export individual methods for convenience
export const {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    changePassword,
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
    searchPosts,
    submitContact,
    uploadImage,
    uploadImages,
    healthCheck,
    setToken,
    removeToken
} = apiClient;
