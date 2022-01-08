import express from 'express';
import { getTodos, addTodo } from '../controllers/todos.js';

const router= express.Router();

router.get('/', getTodos);
router.post('/', addTodo);


export default router;