import { Router } from 'express';
import projectRouter from './projects/project.controller';

const appRouter = Router();
appRouter.use('/projects', projectRouter);

export default appRouter;
