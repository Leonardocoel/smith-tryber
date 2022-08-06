import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan';
import ProductRouter from './routes/product.routes';
import UserRouter from './routes/user.routes';
import OrderRouter from './routes/order.routes';
import LoginRouter from './routes/login.routes';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/login', LoginRouter);
app.use('/products', ProductRouter);
app.use('/users', UserRouter);
app.use('/orders', OrderRouter);
app.use(errorMiddleware);

export default app;
