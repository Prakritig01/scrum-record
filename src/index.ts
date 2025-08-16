import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/connDB';
import userRouter from './router/user.router';
import { authMiddleware } from './middleware/authMiddleware';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from TypeScript + Express 🚀');
});

app.use('/api/users' , userRouter);
app.use(authMiddleware);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  connectDB();
});
