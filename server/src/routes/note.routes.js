import express from 'express';
import * as noteController from '../controllers/note.controller.js';
import validateToken from '../middlewares/validateToken.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = express.Router();

router.use(validateToken);

router.post('/create', upload.single('image'), noteController.createNote);
router.get('/all', noteController.getNotes);
router.get('/area/:area', noteController.getNotesByArea);
router.get('/search/:query', noteController.searchNotes);
router.put('/update/:id', upload.single('image'), noteController.updateNote);
router.delete('/delete/:id', noteController.deleteNote);

export { router };
