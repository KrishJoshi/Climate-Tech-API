import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { errorHandler } from './errorHandler';

describe('Error Handler Middleware', () => {
    let app: express.Application;
    let consoleErrorMock: jest.SpyInstance;

    beforeAll(() => {
        app = express();

        app.get('/test-error', (req: Request, res: Response, next: NextFunction) => {
            const error = new Error('Test error message');
            next(error);
        });


        app.get('/test-error-status', (req: Request, res: Response, next: NextFunction) => {
            const error = new Error('Custom status error');
            (error as any).statusCode = 400;
            next(error);
        });

        app.use(errorHandler);

        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {
            // Intentionally empty to suppress error logs during testing
        });
    });

    afterAll(() => {
        consoleErrorMock.mockRestore();
    });

    afterEach(() => {
        consoleErrorMock.mockClear();
    });

    it('should return 500 and a default error message when an error is thrown', async () => {
        const res = await request(app).get('/test-error');

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Test error message' });
        expect(consoleErrorMock).toHaveBeenCalled();
    });

    it('should return the custom status code and message when provided', async () => {
        const res = await request(app).get('/test-error-status');

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Custom status error' });
        expect(consoleErrorMock).toHaveBeenCalled();
    });
});
