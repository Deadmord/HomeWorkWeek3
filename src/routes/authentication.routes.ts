import express from 'express';
import controller from '../controllers/authentication.controller';
const router = express.Router();

router.post('/login', controller.login);
router.get('/logtest', controller.loginTest);

export default { router };