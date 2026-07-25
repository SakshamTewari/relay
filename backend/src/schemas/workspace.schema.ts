export const CreateWorkspaceSchema = {
    body: {
        type: "object",
        required: ["name"],
        properties: {
            name: {
                type: "string",
                minLength: 3,
                maxLength: 100,
            },
        },
    },
};

export const UpdateWorkspaceSchema = {
    body: {
        type: "object",
        required: ["name"],
        properties: {
            name: {
                type: "string",
                minLength: 3,
                maxLength: 100,
            },
        },
    },
};

export const WorkspaceParamsSchema = {
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: {
                type: "string",
            },
        },
    },
};