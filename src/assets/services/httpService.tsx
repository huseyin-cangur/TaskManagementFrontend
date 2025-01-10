// src/services/httpService.js
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:5064/api/'; // Burada API URL'nizi belirtin

const httpService = {
  get: async (endpoint:String, params = {}) => {
    try {
      const response = await axios.get(`${API_URL}${endpoint}`, { params });
      return response.data;
    } catch (error) {
      console.error("GET request failed:", error);
      throw error;
    }
  },

  post: async (endpoint:String, data:any) => {
    try {
      const response = await axios.post(`${API_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error("POST request failed:", error);
      throw error;
    }
  },

  put: async (endpoint:String, data:any) => {
    try {
      const response = await axios.put(`${API_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error("PUT request failed:", error);
      throw error;
    }
  },

  delete: async (endpoint:String) => {
    try {
      const response = await axios.delete(`${API_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error("DELETE request failed:", error);
      throw error;
    }
  }
};

export default httpService;
