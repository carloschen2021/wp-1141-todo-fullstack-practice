import axios from 'axios';

// Use environment variable for production, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
    baseURL: `${API_BASE_URL}/api/todos`,
});

export const getTodos = async () => {
    const response = await api.get('/');
    return response.data;
};

export const createTodo = async (todo: { title: string; completed?: boolean }) => {
    const response = await api.post('/', todo);
    return response.data;
};

export const updateTodo = async (id: number, todo: { title?: string; completed?: boolean }) => {
    const response = await api.put(`/${id}`, todo);
    return response.data;
};

export const deleteTodo = async (id: number) => {
    await api.delete(`/${id}`);
};
