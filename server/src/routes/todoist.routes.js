import express from 'express';
import validateToken from '../middlewares/validateToken.middleware.js';
import { auth, recieveCode } from '../controllers/todoistAuth.controller.js';
import { handleWebHook } from '../controllers/todoistWebHook.controller.js';





const router = express.Router();
// router.use(validateToken);

router.get('/auth', auth);
router.get('/recieve_code', recieveCode);
// router.post('/todoist-webhook', handleWebHook);




export { router };
