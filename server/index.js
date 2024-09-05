import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import authRoutes from './routes/authRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import styleRoutes from './routes/styleRoutes.js';
import formatRoutes from './routes/formatRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import categorieFormat from './routes/categorieFormatRoutes.js';
import interestRoutes from './routes/interestRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/style', styleRoutes);
app.use('/api/v1/format', formatRoutes);
app.use('/api/v1/categorieFormat', categorieFormat);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/interest', interestRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

const start = async () => {

    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
       });
    } catch (error) {
        console.log(error);
    }
}

start();
