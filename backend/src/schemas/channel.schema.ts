export const CreateChannelSchema = {
    body: {
        type: "object",
        required: ["name"],
        properties: {
            name: { 
                type: "string",
                minLength: 3,
                maxLength: 20,
            },
        },
    },
};

export const UpdateChannelSchema = {
    body: {
        type: "object",
        required: ["name"],
        properties: {
            name: { 
                type: "string",
                minLength: 3,
                maxLength: 20,
            },
        },
    },
};