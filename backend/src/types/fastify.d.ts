import "fastify";
import "@fastify/jwt";

import { FastifyReply, FastifyRequest } from "fastify";
import { AccessTokenPayload } from "./jwt";

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: AccessTokenPayload;
        user: AccessTokenPayload;
    }
}

declare module "fastify" {
    interface FastifyInstance {
        authenticate(
            request: FastifyRequest,
            reply: FastifyReply,
        ): Promise<void>;
    }
}