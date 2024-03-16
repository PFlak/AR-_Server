import { loginController, registerController } from "../../controllers/authRouter.controllers";
import { CommonRoutesConfig } from "../../common/common.routes.config";
import type { Application } from "express";
import express from "express";

export class ExampleRoute extends CommonRoutesConfig {

    constructor(app: Application){
        super(app, "Auth Route", "0.0.1");
    }

    configureRoute(): Application {
        
        const exampleRouter = express.Router();

        exampleRouter.post('/login', loginController);
        exampleRouter.post('/register', registerController);

        this.app.use('/auth', exampleRouter);

        return this.getApp();
    }
}