import express from 'express';
import * as noteController from '../controllers/note.controller.js';
import validateToken from '../middlewares/validateToken.middleware.js';

const router = express.Router();

router.use(validateToken);

router.post('/create', noteController.createNote);
router.get('/all', noteController.getNotes);
router.get('/filter/:label', noteController.filterNotesByLabel);
router.get('/search/:query', noteController.searchNotes);
router.put('/edit/:id', noteController.editNote);
router.delete('/delete/:id', noteController.deleteNote);

export { router };
