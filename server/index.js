import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';

const app = express();

app.use(bodyParser.json({limit: "30mb", extented : true}));
app.use(bodyParser.urlencoded({ limit: "30mb" , extended: true}));
app.use(cors());

connectDB();

app.use('/api/auth', authRoutes);

const PORT= process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
