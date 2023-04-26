import axios from 'axios';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });

  export const login = (username, password) => {
    return axios.post(`${API_URL}/api/login/`, { username, password });
  };
  
  export const register = (username, email, password) => {
    return axios.post(`${API_URL}/api/register/`, 
    { username, email, password1: password, password2: password });
  };
  
  export const getContacts = () => {
    return axiosInstance.get('/contacts/',{ params: {
        username: localStorage.getItem('username')
    }});
  };
  
  export const addContact = (first_name, last_name, phone_number, email, address) => {
    return axiosInstance.post('/contacts/', 
    {first_name: first_name, last_name: last_name, phone_number, email, username: localStorage.getItem('username'), address});
  };
  
  export const deleteContact = (id) => {
    return axiosInstance.delete(`/contacts/${id}/`);
  };

  export const editContact = (id, data) => {
    return axiosInstance.put(`/contacts/${id}/`, data);
  };

  export const getContact = (id) => {
    return axiosInstance.get(`/contacts/${id}/`);
  };