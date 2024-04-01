import { Application } from "express";
import { CommonRoutesConfig } from "../../common/common.routes.config";
import express from "express";
import { addNewYachtController } from "../../controllers/yachtRouter.controlers";

export class YachtRoutes extends CommonRoutesConfig {

  constructor(app: Application) {
    super(app, "Yacht Routes", "0.0.1");
  }

  configureRoute(): Application {
    const yachtRouter = express.Router();

    yachtRouter.post("/add", addNewYachtController);

    this.app.use("/yacht", yachtRouter);

    return this.getApp();
  }
}