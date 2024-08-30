const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

// courseController.index

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id/delete', courseController.forceDelete);
router.post('/handle-form-actions', courseController.handleFormActions);
router.post('/handle-trash-actions', courseController.handleTrashActions);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.destroy);
router.get('/:slug', courseController.show);

module.exports = router;
