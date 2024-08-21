import request from 'supertest';
import express from 'express';
import projectRouter from './project.controller';
import * as projectService from './project.service';

jest.mock('../projects/project.service');

const app = express();
app.use(express.json());
app.use('/projects', projectRouter);

describe('Project Router', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a list of projects on GET /projects', async () => {
        const mockProjects = [
            { id: '1', url: 'https://example.com', status: 'active', country: 'US' },
            { id: '2', url: 'https://example2.com', status: 'inactive', country: 'UK' },
        ];
        (projectService.getAllProjects as jest.Mock).mockResolvedValue(mockProjects);

        const res = await request(app).get('/projects');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockProjects);
        expect(projectService.getAllProjects).toHaveBeenCalledTimes(1);
    });

    it('should return a single project on GET /projects/:id', async () => {
        const mockProject = { id: '1', url: 'https://example.com', status: 'active', country: 'US' };
        (projectService.getProjectById as jest.Mock).mockResolvedValue(mockProject);

        const res = await request(app).get('/projects/1');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockProject);
        expect(projectService.getProjectById).toHaveBeenCalledWith('1');
    });

    it('should return 404 if project is not found on GET /projects/:id', async () => {
        (projectService.getProjectById as jest.Mock).mockResolvedValue(null);

        const res = await request(app).get('/projects/1');

        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'Project not found' });
        expect(projectService.getProjectById).toHaveBeenCalledWith('1');
    });

    it('should create a new project on POST /projects', async () => {
        const newProject = { url: 'https://example.com', status: 'active', country: 'US' };
        const createdProject = { id: '1', ...newProject };
        (projectService.createProject as jest.Mock).mockResolvedValue(createdProject);

        const res = await request(app).post('/projects').send(newProject);

        expect(res.status).toBe(201);
        expect(res.body).toEqual(createdProject);
        expect(projectService.createProject).toHaveBeenCalledWith(newProject);
    });

    it('should update a project on PUT /projects/:id', async () => {
        const updatedProject = { url: 'https://example.com', status: 'active', country: 'US' };
        const updatedProjectWithId = { id: '1', ...updatedProject };
        (projectService.updateProject as jest.Mock).mockResolvedValue(updatedProjectWithId);

        const res = await request(app).put('/projects/1').send(updatedProject);

        expect(res.status).toBe(200);
        expect(res.body).toEqual(updatedProjectWithId);
        expect(projectService.updateProject).toHaveBeenCalledWith('1', updatedProject);
    });

    it('should delete a project on DELETE /projects/:id', async () => {
        (projectService.deleteProject as jest.Mock).mockResolvedValue({});

        const res = await request(app).delete('/projects/1');

        expect(res.status).toBe(204);
        expect(projectService.deleteProject).toHaveBeenCalledWith('1');
    });
});
