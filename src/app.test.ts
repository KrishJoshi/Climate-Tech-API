import request from 'supertest';
import express from 'express';
import appRouter from '../src/api/appRouter';

const app = express();
app.use('/api', appRouter);

describe('App Router', () => {
    it('should return 404 for the base /api route if not specifically defined', async () => {
        const res = await request(app).get('/api');
        expect(res.status).toEqual(404);
    });

    it('should return 404 for undefined routes under /api', async () => {
        const res = await request(app).get('/api/undefined-route');
        expect(res.status).toEqual(404);
    });
});
