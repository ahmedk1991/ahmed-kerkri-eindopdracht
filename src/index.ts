import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoutes';
import quizRoutes from './routes/quizRoutes';


dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
