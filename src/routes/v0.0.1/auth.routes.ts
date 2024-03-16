import { loginController, registerController } from "../../controllers/authRouter.controllers";
import { CommonRoutesConfig } from "../../common/common.routes.config";
import type { Application } from "express";
import express from "express";

export class ExampleRoute extends CommonRoutesConfig {

    constructor(app: Application){
        super(app, "Auth Route", "0.0.1");
    }

    configureRoute(): Application {
        
        const authRouter = express.Router();

        authRouter.post('/login', loginController);
        authRouter.post('/register', registerController);

        this.app.use('/auth', authRouter);

        return this.getApp();
    }
}