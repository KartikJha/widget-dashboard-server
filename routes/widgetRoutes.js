import express from 'express';
import { createWidget, getWidgets, updateWidget, deleteWidget } from "../services/widgetService.js"

const router = express.Router();

router.post('/', createWidget);
router.get('/', getWidgets);
router.put('/:id', updateWidget);
router.delete('/:id', deleteWidget);

export default router;
