import type { Application } from "express";
import { CommonRoutesConfig } from "../../common/common.routes.config";
import express from "express";
import { addNewTeamController } from "../../controllers/teamsRouter.controllers";

export class TeamsRoute extends CommonRoutesConfig {

    constructor(app: Application){
        super(app, "Teams Route", "0.0.1");
    }

    configureRoute(): Application {
        
        const teamsRouter = express.Router();

        teamsRouter.post('/add', addNewTeamController);

        this.app.use('/teams', teamsRouter);

        return this.getApp();
    }
}