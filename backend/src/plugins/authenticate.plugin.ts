import fp from "fastify-plugin";
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";

const authenticatePlugin: FastifyPluginAsync = async (app) => {
    app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {        //app.authenticate available now
        try {
            await request.jwtVerify();
        } catch {
            return reply.code(401).send({
                message: "Unauthorized",
            });
        }
    });
};

export default fp(authenticatePlugin);