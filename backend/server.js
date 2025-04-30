import express from 'express';
import cors from 'cors';
import transactionRouter from './routes/transactionRoutes.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/transactions', transactionRouter);

const port = process.env.PORT || 3000;

