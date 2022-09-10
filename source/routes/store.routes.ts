import express from 'express';
import controller from '../controllers/store.controller';
const router = express.Router();

router.get('/general/stores', controller.getStores);
router.get('/general/store/:id', controller.getStore);
router.get('/general/store/update/:id/', controller.getUpdateStore);

router.get('/general/products', controller.getProducts);
router.get('/general/product/:id', controller.getProduct);

export default { router }