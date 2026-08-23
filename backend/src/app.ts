import Fastify from "fastify";
import jwtPlugin from "./plugins/jwt.plugin";
import buildAuth from "./composition/auth";
import buildWorkspace from "./composition/workspace";
import buildChannel from "./composition/channel";
import buildMessage from "./composition/message";
import buildWorkspaceMember from "./composition/workspace-member";
import { authRoutes } from "./routes/auth.route";
import { workspaceRoutes } from "./routes/workspace.route";
import { channelRoutes } from "./routes/channel.route";
import { messageRoutes } from "./routes/message.routes";
import { workspaceMemberRoutes } from "./routes/workspace-member.route";

const app = Fastify();

const { authController } = buildAuth(app);
const { workspaceController } = buildWorkspace();
const { channelController } = buildChannel();
const { messageController } = buildMessage();
const { workspaceMemberController } = buildWorkspaceMember();

// JWT Plugin
app.register(jwtPlugin);
//Auth Routes
app.register(authRoutes, {prefix: "/api/auth", authController});
//Workspace Routes
app.register(workspaceRoutes, {prefix: "/api/workspaces", workspaceController});
//Channel Routes
app.register(channelRoutes, {prefix: "/api", channelController});
//Message Routes
app.register(messageRoutes, {prefix: "/api", messageController});
// Workspace Member Routes
app.register(workspaceMemberRoutes, {prefix: "/api", workspaceMemberController});

export default app;