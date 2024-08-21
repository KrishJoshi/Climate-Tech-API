import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // tslint:disable-next-line:no-console
    console.error('Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong.';

    res.status(statusCode).json({ error: message });
};
