import axios from 'axios';

// Update with correct backend URL if different
const API_URL = 'http://localhost:3000/api/todos';

export const api = axios.create({
    baseURL: API_URL,
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
