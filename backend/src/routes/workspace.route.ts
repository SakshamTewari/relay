import { FastifyInstance } from "fastify";
import { CreateWorkspaceRequest, UpdateWorkspaceRequest, WorkspaceParams } from "../types/workspace";
import { CreateWorkspaceSchema, UpdateWorkspaceSchema, WorkspaceParamsSchema } from "../schemas/workspace.schema";
import { WorkspaceController } from "../controllers/workspace.controller";

export async function workspaceRoutes(app: FastifyInstance, { workspaceController} : { workspaceController: WorkspaceController}){

    // Create Workspace
    app.post<{Body: CreateWorkspaceRequest}>("/", {schema: CreateWorkspaceSchema}, async (request, reply) => {
        return workspaceController.createWorkspace(request, reply);
    });

    // Update workspace
    app.patch<{Params: WorkspaceParams; Body: UpdateWorkspaceRequest}>("/:id", {schema: {...WorkspaceParamsSchema, ...UpdateWorkspaceSchema}}, async (request, reply) => {
        return workspaceController.updateWorkspace(request, reply);
    })

    // Get all Workspaces
    app.get("/", async (request, reply) => {
        return workspaceController.getAllWorkspaces(request, reply);
    });

    // Get Workspace by ID
    app.get<{Params: WorkspaceParams}>("/:id", {schema: WorkspaceParamsSchema}, async (request, reply) => {
        return workspaceController.getWorkspaceById(request, reply);
    });

    // Delete Workspace
    app.delete<{Params: WorkspaceParams}>("/:id", {schema: WorkspaceParamsSchema}, async (request, reply) => {
        return workspaceController.deleteWorkspace(request, reply);
    });
}