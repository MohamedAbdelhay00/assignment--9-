import express, { Router } from 'express';
import { addMessage, getMessages, deleteMessage } from './message.controller.js';
import authMiddleware from '../middlerware/authMiddleware.js';

const messageRouter = Router();

messageRouter.post('/add', authMiddleware, addMessage);

messageRouter.get('/', authMiddleware, getMessages);

messageRouter.delete('/:id', authMiddleware, deleteMessage);

export default messageRouter;
