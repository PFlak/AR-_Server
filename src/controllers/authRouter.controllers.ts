import type { Response, NextFunction } from "express";
import { internalServerErrorResponse } from "../utils/responses/internalServerError.error";
import { missingParametersResponse } from "../utils/responses/missingParametersResponse";
import { AuthorizedRequest } from "../models/request.models";
import { ValidationHelper } from "../utils/helpers/validationHelper";
import usersManager from "../managers/usersManager"
import { CommonRoutesConfig } from "../common/common.routes.config";
import { ErrorWithCode } from "../common/common.error.config";
import { AdditionalUserInformation } from "../models/user.model";
import { MissingParametersErros } from "../utils/errors/errors.error";

export async function registerController(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) {
    try {
        const missingProperties = await usersManager.getMissingFiledsInUnAuthorizatedUser(req.userDetails!.uid) as (keyof AdditionalUserInformation)[];
        
        const { wrongDataTypes, validatedObjects, missingInRequest } = usersManager.validateUserRequestWithAdditionalInformations(req.body, missingProperties);

        if (ValidationHelper.areArraysEmpty(missingInRequest, wrongDataTypes) === true) {
            throw new MissingParametersErros();
        }
        
        await usersManager.authorizateUser(validatedObjects, req.userDetails!.uid);
        
        res.status(200).json({
            status: CommonRoutesConfig.statusMessage.SUCCESS,
            message: "Successfully added aditional infomations",
            result: {}
        });

    } catch (error) {

        if(error instanceof ErrorWithCode){
            return res.status(error.status).json(error.toJSON());
        }

        internalServerErrorResponse(res);
    }
}