import { APPLICATION_CONFIG } from "./utils/configs/applicationConfig";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { NotValidRoutes } from "./routes/v0.0.1/notValid.routes";
import { ExampleRoute } from "./routes/v0.0.1/example.routes";
import { CompetitionRoutes } from "./routes/v0.0.1/competition.routes";
import { Logger } from "./models/common.models";
import express, { Application } from "express";
import { Debugger } from "./utils/debugger";
import LoggerHelper from "./utils/logger";
import * as http from "http";
import cors from "cors";
import { initalizeFirebase } from "./firebase";
import { AuthRoutes } from "./routes/v0.0.1/auth.routes";
import { SocketRoutes } from "./routes/v0.0.1/socket.routes";
import { Server } from "socket.io";
import DatabaseManager from "./managers/databaseManager" // For tests
import CompetitionManager from "./managers/competitionManager";

export class MainApp {

    private config!: typeof APPLICATION_CONFIG;
    private application!: Application;
    private routes!: CommonRoutesConfig[];
    private server!: http.Server;
    private serverIO!: Server;
    private logger!: Logger;

    constructor() {
        this.init();
    }

    private init(): void {

        this.initLogger();
        this.initApplcationConfig();
        // this.initFirebase();
        this.initApplicationAndServer();
        this.initBasicDebug();
        this.initRoutes();
        this.startCompetitions();

        this.startServer();
    }

    private initLogger(): void {
        this.logger = LoggerHelper.getLogger("MainApp");
    }

    private initApplcationConfig(): void {

        this.config = APPLICATION_CONFIG;
    }        

    //! Sometimes there can be error
    // private initFirebase(): void {
    //     initalizeFirebase();
    // }

    private initApplicationAndServer(): void {

        this.application = express();
        this.application.use(cors());
        this.application.use(express.json());

        this.server = http.createServer(this.application);
        this.serverIO = new Server(this.server, { cors: { origin: "*" } });
    }

    private initBasicDebug(): void {
        if (APPLICATION_CONFIG.DEBUG_REQUEST === true) {
            Debugger.debugRequest(this.application);
        }
    }

    //* in this function we declare add another routes.
    //* Decalre of notValidRoutes should be at the end.
    private initRoutes(): void {

        const application = this.application;

        this.routes = [];

        this.routes.push(new AuthRoutes(application));
        this.routes.push(new CompetitionRoutes(application));
        this.routes.push(new ExampleRoute(application));
        this.routes.push(new SocketRoutes(application, this.serverIO));
        this.routes.push(new NotValidRoutes(application));
    }

    private startCompetitions(): void {
      CompetitionManager.startCompetition("TFOxaFOwaq6rzSJo2GEr")
    }

    private startServer(): void {

        const port = this.config.APPLICATION_PORT;

        const runningMessage = `Server running at http://localhost:${port}`;

        this.server.listen(port, () => {
            this.routes.forEach((route) => {
                this.logger.info(
                    `Routes configured for ${route.getVersion()} - ${route.getName()}`
                );
            });

            this.logger.info(runningMessage);
        });
    }
}