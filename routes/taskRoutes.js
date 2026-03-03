const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/', taskController.createTodo);
router.get('/', taskController.getTodos);
router.put('/:id', taskController.updateTodo);
router.delete('/:id', taskController.deleteTodo);

module.exports = router;