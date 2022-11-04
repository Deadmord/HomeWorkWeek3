import express from 'express';
import controller from '../controllers/store.controller';
import { Role } from '../enums';
import middleware from '../middleware/auth.middleware';
const router = express.Router();

router.get('/stores',           middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getStores);
router.get('/store/:id',        middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getStoreById);
router.get('/store/:title',     middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getStoreByTitle);

router.put('/store/:id',        middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.updateStoreById);

router.post('/store',           middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.addStore);
router.post('/store-sp',        middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.addStoreByStoredProcedure);
router.post('/store-sp-output', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.addStoreByStoredProcedureOutput);

router.delete('/store/:id',     middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.deleteStoreById);
//Products
router.get('/products',         middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getProducts);
router.get('/product/:id',      middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getProduct);

export default { router }