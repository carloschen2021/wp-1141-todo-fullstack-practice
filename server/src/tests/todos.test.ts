import request from 'supertest';
import { app, prisma } from '../index';

describe('Todo API', () => {
    beforeAll(async () => {
        // Clean up database before tests
        // await prisma.todo.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    /*
     * Note: These tests require a running database connection.
     * If DB connection fails, these tests will fail.
     */

    let createdTodoId: number;

    it('should create a new todo', async () => {
        const res = await request(app)
            .post('/api/todos')
            .send({
                title: 'Test Todo',
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toEqual('Test Todo');
        expect(res.body.completed).toEqual(false);

        createdTodoId = res.body.id;
    });

    it('should fetch all todos', async () => {
        const res = await request(app).get('/api/todos');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should update a todo', async () => {
        const res = await request(app)
            .put(`/api/todos/${createdTodoId}`)
            .send({
                completed: true,
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.completed).toEqual(true);
    });

    it('should delete a todo', async () => {
        const res = await request(app).delete(`/api/todos/${createdTodoId}`);
        expect(res.statusCode).toEqual(204);
    });
});
