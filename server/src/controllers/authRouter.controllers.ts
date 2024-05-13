import type { Response, NextFunction } from "express";
import { internalServerErrorResponse } from "../utils/responses/internalServerError.error";
import { AuthorizedRequest } from "../models/request.models";
import usersManager from "../managers/usersManager"
import { CommonRoutesConfig } from "../common/common.routes.config";
import { ErrorWithCode } from "../common/common.error.config";
import { ObjectHelper } from "../utils/helpers/objectHelper";
import { additionalInformationUserSchema } from "../utils/schemas/user.schema";
import { ZodError } from "zod";
import { validationErrorResponse } from "../utils/responses/validationErrorResponse.error";

export async function registerController(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) {
    try {

        const user = await usersManager.getUserFromUnAuthorizatedCollection(req.userDetails!.uid);

        const newRecord = ObjectHelper.concatObject(user!, req.body);

        const userRecord = await additionalInformationUserSchema.parseAsync(newRecord);

        // BC type of userRecord is not specified at all
        //@ts-ignore
        await usersManager.authorizateUser(userRecord);

        res.status(200).json({
            status: CommonRoutesConfig.statusMessage.SUCCESS,
            message: "Successfully added aditional infomations",
            result: {}
        });

    } catch (error) {

        if(error instanceof ZodError){
            return validationErrorResponse(res, error);
        }

        if(error instanceof ErrorWithCode){
            return res.status(error.status).json(error.toJSON());
        }

        internalServerErrorResponse(res);
    }
}