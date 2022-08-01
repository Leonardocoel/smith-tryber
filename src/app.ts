import express from 'express';
import ProductRouter from './routes/product.routes';
import UserRouter from './routes/user.routes';

const app = express();

app.use(express.json());

app.use('/products', ProductRouter);
app.use('/users', UserRouter);

export default app;
