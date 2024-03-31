import { registerController } from "../../controllers/authRouter.controllers";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { CommonRoutesConfig } from "../../common/common.routes.config";
import type { Application } from "express";
import express from "express";

export class AuthRoutes extends CommonRoutesConfig {

    constructor(app: Application){
        super(app, "Auth Route", "0.0.1");
    }

    configureRoute(): Application {
        
        const authRouter = express.Router();
        
        authRouter.post('/register', AuthMiddleware.verifyUserMiddleware, registerController);

        this.app.use('/auth', authRouter);

        return this.getApp();
    }
}