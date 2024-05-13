import { CommonRoutesConfig } from "../../common/common.routes.config";
import { ERROR_CODES } from "../errors/errorCodes.error";
import type { Response } from "express"

export function missingParametersResponse(res: Response, data: Record<string, string[]>) {
    return res.status(422).json({
        status: CommonRoutesConfig.statusMessage.FAILED,
        code: ERROR_CODES.MISSING_PARAMETERS,
        result: {
            invalidDataType: data.wrongTypes,
            missingData: data.missing
        }
    })
}