import { Request, Response, Router } from 'express';
import * as projectService from './project.service';

const projectRouter = Router();

projectRouter.get('/', async (req: Request, res: Response, next) => {
    try {
        const projects = await projectService.getAllProjects();
        res.json(projects);
    } catch (error) {
        next(error);
    }
});

projectRouter.get('/:id', async (req: Request, res: Response, next) => {
    const { id } = req.params;
    try {
        const project = await projectService.getProjectById(id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        next(error);
    }
});

projectRouter.post('/', async (req: Request, res: Response, next) => {
    const { url, status, country } = req.body;
    try {
        const newProject = await projectService.createProject({ url, status, country });
        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
});

projectRouter.put('/:id', async (req: Request, res: Response, next) => {
    const { id } = req.params;
    const { url, status, country } = req.body;
    try {
        const updatedProject = await projectService.updateProject(id, { url, status, country });
        res.json(updatedProject);
    } catch (error) {
        next(error);
    }
});

projectRouter.delete('/:id', async (req: Request, res: Response, next) => {
    const { id } = req.params;
    try {
        await projectService.deleteProject(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default projectRouter;
