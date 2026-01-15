import express from 'express';
import cors from 'cors';
import teaRouter from './routes/teaRoutes.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'Welcome to Devops Course!', serverId: process.env.SERVER_ID });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/v1/teas', teaRouter);

app.use((err, req, res, _next) => {
  console.log(err);
  res.status(400).json({
    status: 'error',
    message: err.message || 'internal server error',
  });
});

export default app;
