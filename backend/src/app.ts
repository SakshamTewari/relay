import Fastify from "fastify";
import jwtPlugin from "./plugins/jwt.plugin";
import buildAuth from "./composition/auth";
import buildWorkspace from "./composition/workspace";
import buildChannel from "./composition/channel";
import { authRoutes } from "./routes/auth.route";
import { workspaceRoutes } from "./routes/workspace.route";
import { channelRoutes } from "./routes/channel.route";


const app = Fastify();

const { authController } = buildAuth(app);
const { workspaceController } = buildWorkspace();
const { channelController } = buildChannel();

// JWT Plugin
app.register(jwtPlugin);
//Auth Routes
app.register(authRoutes, {prefix: "/api/auth", authController});
//Workspace Routes
app.register(workspaceRoutes, {prefix: "api/workspaces", workspaceController});
//Channel Routes
app.register(channelRoutes, {prefix: "api", channelController});

export default app;