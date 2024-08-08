import axiosInstance from './axiosConfig';

// Функція для отримання даних
export const getData = async endpoint => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Функція для створення нового запису
export const createData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error creating data:', error);
    throw error;
  }
};

// Функція для оновлення запису
export const updateData = async (endpoint, id, data) => {
  try {
    const response = await axiosInstance.put(`${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// Функція для видалення запису
export const deleteData = async (endpoint, id) => {
  try {
    const response = await axiosInstance.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
