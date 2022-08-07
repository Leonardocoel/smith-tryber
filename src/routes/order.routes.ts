import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import OrderController from '../controllers/order.controller';

const router = Router();

const orderController = new OrderController();
const loginController = new LoginController();

router.get('/', orderController.getAll);
router.use(loginController.validateToken);
router.post('/', orderController.create);

export default router;