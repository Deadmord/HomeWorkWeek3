import express, { Express, Application, Request, Response } from "express";
import * as http from "http";
import cors from "cors";
import { RouteConfig } from "./framework/route.config";
import { UserRoutes } from "./modules/user/user.route";
import { StoreRoutes } from "./modules/store/store.route";
import { AuthenticationRoutes } from "./core/authentication/authentication.route";
import LoggerService from "./core/logger.service";
import morgan from 'morgan';
import { StaticEnvironment } from "./core/environment.static";
import EnvironmentService from "./core/environment.service"

const routes: Array<RouteConfig> = [];
const app: Express = express();
app.use(express.json());
app.use(cors());

/** Logging */
//EnvironmentService.initialize();
LoggerService.initialize();
app.use(morgan('dev'));

// if (process.env.DEBUG) {
//   process.on("unhandledRejection", function(reason) {
//     process.exit(1);
//   });
// } 

routes.push(new AuthenticationRoutes(app));
routes.push(new UserRoutes(app));
routes.push(new StoreRoutes(app));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome world!!!");
});

const server: http.Server = http.createServer(app);

server.listen(StaticEnvironment.serverPort, () => {
  LoggerService.info(`Server is running on ${StaticEnvironment.serverPort}`);
  routes.forEach((route: RouteConfig) => {
    LoggerService.info(`Routes configured for ${route.getName()}`);
  });
});