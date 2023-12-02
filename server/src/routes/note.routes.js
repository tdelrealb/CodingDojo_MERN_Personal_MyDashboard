import express from 'express';
import * as noteController from '../controllers/note.controller.js';
import validateToken from '../middlewares/validateToken.middleware.js';

const router = express.Router();

router.use(validateToken);

router.post('/create', noteController.createNote);
router.get('/area/:area', noteController.getNotesByArea);
router.get('/label/:label', noteController.getNotesByLabel);
router.get('/search/:query', noteController.searchNotes);
router.put('/update/:id', noteController.updateNote);
router.delete('/delete/:id', noteController.deleteNote);

export { router };
