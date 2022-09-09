import express from 'express';
import controller from '../controllers/store.controller';
const router = express.Router();

router.get('/general/board-types', controller.getBoardTypes);
router.get('/general/board-type/:id', controller.getBoardType);

export default { router }