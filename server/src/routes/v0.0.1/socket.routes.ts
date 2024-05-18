import type { Application } from "express";
import express from "express";
import { Namespace, Server, Socket } from "socket.io";
import { CommonRoutesConfig } from "../../common/common.routes.config";
import { APPLICATION_CONFIG } from "../../utils/configs/applicationConfig";
import { authSocketMiddleware, parseSocketConnectionMiddleware } from "../../middlewares/socket.middleware";
import { NextSocketFunction } from "../../models/common.models";

export class SocketRoutes extends CommonRoutesConfig {

    private competitionNamespace!: Namespace<any, any, any, any>;

    constructor(app: Application, server: Server) {
        super(app, "Socket Routes", "0.0.1", server);
    }

    private configureNameSpaces(): void {

        if (this.io !== undefined && this.io !== null) {

            this.competitionNamespace = this.io.of('/competition');
        }
    };

    configureRoute(): Application {

        this.configureNameSpaces();

        this.configureSocket();

        return this.getApp();
    }

    private configureSocket(): void {

        if (APPLICATION_CONFIG.IS_MIDDLEWARE_ENABLE)
            this.setupSocketMiddleware();

        // this.competitionNamespace.on("connection", setupCompetitionSocketConncetion);
    }

    private setupSocketMiddleware(): void {

        // this.competitionNamespace.use(authSocketMiddleware);

        this.competitionNamespace.use(parseSocketConnectionMiddleware);
    }

    checkRequiredParameters = (next: NextSocketFunction, roomID: string, userID: string, socketID: string) => {

    }

    rejectConnection = (next: NextSocketFunction, message: string) => {
        next(new Error(message));
    }
}