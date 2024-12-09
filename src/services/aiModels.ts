// src/services/aiModels.ts
import api from './api';

export const fetchAIModes = async () => {
    try {
        const response = await api.get('models/');
        return response.data;
    } catch (error: any) {
        console.error('Error al obtener los modelos de IA:', error.response?.data || error.message);
        throw error;
    }
};
