import {prisma} from "../../common/prismaClient";
import {v4 as uuidv4} from "uuid";

export const getAllProjects = async () => {
    return prisma.project.findMany();
};

export const getProjectById = async (id: string) => {
    return prisma.project.findUnique({
        where: { id },
    });
};

export const createProject = async (data: { url: string; status: string; country: string }) => {
    return prisma.project.create({
        data: {
            id: uuidv4(),
            ...data,
        },
    });
};

export const updateProject = async (id: string, data: { url?: string; status?: string; country?: string }) => {
    return prisma.project.update({
        where: { id },
        data,
    });
};

export const deleteProject = async (id: string) => {
    return prisma.project.delete({
        where: { id },
    });
};
