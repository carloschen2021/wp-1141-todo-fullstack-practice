import { Request, Response } from 'express';
import { prisma } from '../index';
import { z } from 'zod';

const todoSchema = z.object({
    title: z.string().min(1),
    completed: z.boolean().optional(),
});

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(todos);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        const data = todoSchema.parse(req.body);
        const todo = await prisma.todo.create({
            data,
        });
        res.json(todo);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.issues });
        } else {
            return res.status(500).json({ error: 'Failed to create todo' });
        }
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = todoSchema.partial().parse(req.body);
        const todo = await prisma.todo.update({
            where: { id: Number(id) },
            data,
        });
        res.json(todo);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.issues });
        } else {
            return res.status(500).json({ error: 'Failed to update todo' });
        }
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.todo.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete todo' });
    }
};
