import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    // Unwrap data here
    return response.data.data || response.data; // support both structures
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    return error.response?.data || { success: false, error: 'Login failed' };
  }
};



export const uploadResume = async (file) => {
  try {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_BASE_URL}/resumes/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // { success, data, error }
  } catch (error) {
    console.error('Upload error:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.error || 'Upload failed' };
  }
};