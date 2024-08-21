import express from 'express';
import appRouter from './api/appRouter';
import dotenv from 'dotenv';
import {errorHandler} from "./middleware/errorHandler";

const env = process.env.NODE_ENV || 'development';
dotenv.config({path: env === 'production' ? '.env.production' : '.env'});

const app = express();
const port = 3000;

app.use(express.json());

// Use the appRouter for all API routes
app.use('/api', appRouter);
app.use(errorHandler);

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server running on port ${port}`);
});
