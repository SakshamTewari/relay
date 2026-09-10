export const AssistantSchema = {
    body: {
        type: "object",
        required: ["content"],
        properties: {
            content: {
                type: "string",
                minLength: 1,
            },
        },
        additionalProperties: false,
    },

    params: {
        type: "object",
        required: ["workspaceId"],
        properties: {
            workspaceId: {
                type: "string",
                minLength: 1,
            },
        },
        additionalProperties: false,
    },
};