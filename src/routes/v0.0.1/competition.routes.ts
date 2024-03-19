import type { Application } from "express";
import { CommonRoutesConfig } from "../../common/common.routes.config";
import { getSpecificCompetitionHandler } from "../../controllers/competitionRouter.controller";
import express from "express";

export class CompetitionRoutes extends CommonRoutesConfig {
    
    constructor(app: Application) {
        super(app, "Competition Routes", "0.0.1");
    }

    configureRoute(): Application {

        const competitionRouter = express.Router();

        competitionRouter.get('/getSpecificCompetition/:id', getSpecificCompetitionHandler);

        this.app.use('/competition', competitionRouter);

        return this.getApp();
    }
}