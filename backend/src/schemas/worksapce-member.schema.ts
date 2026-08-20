export const AddWorkspaceMemberSchema = {
    body: {
        type: "object",
        required: ["userId", "role"],
        properties: {
            userId: {
                type: "string",
                minLength: 1,
            },
            role: {
                type: "string",
                enum: ["owner", "admin", "member"],
            },
        },
        additionalProperites: false,
    },
};

export const UpdateWorkspaceMemberSchema = {
    body: {
        type: "object",
        required: ["role"],
        properties: {
            role: {
                type: "string",
                enum: ["owner", "admin", "member"],
            },
        },
        additionalProperties: false,
    },
};