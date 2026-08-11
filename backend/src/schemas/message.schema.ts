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