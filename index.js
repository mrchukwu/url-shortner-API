import express from 'express';
import userRouter from './routes/user.routes.js';


const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({status: "Server is up and running!"});
});

app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});