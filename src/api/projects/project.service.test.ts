import { prisma } from '../../common/prismaClient';
import * as projectService from './project.service';
import { v4 as uuidv4 } from 'uuid';

jest.mock('../../common/prismaClient', () => ({
    prisma: {
        project: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}));

jest.mock('uuid', () => ({
    v4: jest.fn(),
}));

describe('Project Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all projects', async () => {
        const mockProjects = [
            { id: '1', url: 'https://example.com', status: 'active', country: 'US' },
            { id: '2', url: 'https://example2.com', status: 'inactive', country: 'UK' },
        ];
        (prisma.project.findMany as jest.Mock).mockResolvedValue(mockProjects);

        const projects = await projectService.getAllProjects();

        expect(prisma.project.findMany).toHaveBeenCalledTimes(1);
        expect(projects).toEqual(mockProjects);
    });

    it('should return a project by ID', async () => {
        const mockProject = { id: '1', url: 'https://example.com', status: 'active', country: 'US' };
        (prisma.project.findUnique as jest.Mock).mockResolvedValue(mockProject);

        const project = await projectService.getProjectById('1');

        expect(prisma.project.findUnique).toHaveBeenCalledWith({
            where: { id: '1' },
        });
        expect(project).toEqual(mockProject);
    });

    it('should create a new project', async () => {
        const newProject = { url: 'https://example.com', status: 'active', country: 'US' };
        const createdProject = { id: '1', ...newProject };
        (uuidv4 as jest.Mock).mockReturnValue('1');
        (prisma.project.create as jest.Mock).mockResolvedValue(createdProject);

        const project = await projectService.createProject(newProject);

        expect(uuidv4).toHaveBeenCalledTimes(1);
        expect(prisma.project.create).toHaveBeenCalledWith({
            data: {
                id: '1',
                ...newProject,
            },
        });
        expect(project).toEqual(createdProject);
    });

    it('should update a project', async () => {
        const updatedProject = { id: '1', url: 'https://example.com', status: 'active', country: 'US' };
        (prisma.project.update as jest.Mock).mockResolvedValue(updatedProject);

        const project = await projectService.updateProject('1', {
            url: 'https://example.com',
            status: 'active',
            country: 'US',
        });

        expect(prisma.project.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: {
                url: 'https://example.com',
                status: 'active',
                country: 'US',
            },
        });
        expect(project).toEqual(updatedProject);
    });

    it('should delete a project', async () => {
        (prisma.project.delete as jest.Mock).mockResolvedValue({});

        const result = await projectService.deleteProject('1');

        expect(prisma.project.delete).toHaveBeenCalledWith({
            where: { id: '1' },
        });
        expect(result).toEqual({});
    });
});
