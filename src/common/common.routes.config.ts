import type { Application } from "express";
import type { Server } from "socket.io";

export abstract class CommonRoutesConfig {

    private routeName: string;
    private version: string;
    protected io: Server | null;
    protected app: Application;

    public static statusMessage = {
        FAILED: "Failed",
        SUCCESS: "Success",
    };

    protected static routeType = {
        PUT: "PutRoutes",
        GET: "GetRoutes",
        POST: "PostRoutes",
        PATCH: "PatchRoutes",
        DELETE: "DeleteRoutes",
        SOCKET: "SocketRoutes",
        NOT_VALID: "NotValidRoutes",
    };

    constructor(
        app: Application, 
        routeName: string, 
        version: string,
        server?: Server
    ) {
        this.routeName = routeName;
        this.app = app;
        this.version = version;
        this.io = server ?? null;

        this.configureRoute();
    }

    public getName(): string {
        return this.routeName;
    }

    public getVersion(): string {
        return this.version;
    }

    public getApp(): Application {
        return this.app;
    }

    abstract configureRoute(): Application;
}