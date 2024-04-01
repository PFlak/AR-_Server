import { NextFunction, Request, Response } from "express";
import { yachtCategorieSchema } from "../utils/schemas/yachtCategorie.schema";
import { FirebaseHelper } from "../utils/helpers/firebaseHelper";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { ZodError } from "zod";
import { validationErrorResponse } from "../utils/responses/validationErrorResponse.error";
import { ErrorWithCode } from "../common/common.error.config";
import { internalServerErrorResponse } from "../utils/responses/internalServerError.error";
import YachtManager from "../managers/yachtManager";

export const addNewYachtController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let validatedData = await yachtCategorieSchema.parseAsync(req.body);

    const currDate = await FirebaseHelper.getServerTimeStamp();

    validatedData.created_at = currDate;

    validatedData.updated_at = currDate;

    await YachtManager.addNewYacht(validatedData);

    res.status(200).json({
      status: CommonRoutesConfig.statusMessage.SUCCESS,
      message: "Successfully added new yacht",
      result: {},
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return validationErrorResponse(res, error);
    }

    if (error instanceof ErrorWithCode) {
      return res.status(error.status).json(error.toJSON());
    }

    return internalServerErrorResponse(res);
  }
};
