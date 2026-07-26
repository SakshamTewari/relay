import Fastify from "fastify";
import buildAuth from "./composition/auth";
import { authRoutes } from "./routes/auth.route";
import jwtPlugin from "./plugins/jwt.plugin";
import { workspaceRoutes } from "./routes/workspace.route";
import buildWorkspace from "./composition/workspace";

const app = Fastify();

const { authController } = buildAuth(app);
const { workspaceController } = buildWorkspace();

// JWT Plugin
app.register(jwtPlugin);
//Auth Routes
app.register(authRoutes, {prefix: "/api/auth", authController});
//Workspace Routes
app.register(workspaceRoutes, {prefix: "api/workspaces", workspaceController});


export default app;