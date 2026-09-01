export const CreateMessageSchema = {
    body: {
        type: "object",
        required: ["content"],
        properties: {
            content: {
                type: "string",
                minLength: 1,
                maxLength: 4000,
            },
        },
        additionalProperties: false,
    },
};

export const UpdateMessageSchema = {
    body: {
        type: "object",
        required: ["content"],
        properties: {
            content: {
                type: "string",
                minLength: 1,
                maxLength: 4000.
            },
        },
        additionalProperties: false,
    },
};

export const MessageQuerySchema = {
    type: "object",
    properties: {
        limit: {
            type: "integer",
            minimum: 1,
            maximum: 100,
            default: 20,
        },
        cursor: {
            type: "string",
        },
    },
};