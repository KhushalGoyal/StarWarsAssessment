import { Request, Response, NextFunction } from "express";
import envVars from "./EnvConfig";
import { ErrorResponse } from "./Response";

async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const { headers } = request;
        const apiKey = headers['x-api-key']
        if (apiKey) {
            const _appToken = envVars.API_TOKEN;
            try {
                if (_appToken === apiKey) {
                    next();
                } else {
                    throw new ErrorResponse(401, "Wrong authentication token", []);
                }
            } catch (error) {
                throw new ErrorResponse(401, "Wrong authentication token", []);
            }
        } else {
            throw new ErrorResponse(401, "Unauthorized", []);
        } 
    } catch (error) {
        next(error)
    }
    
}

export default authMiddleware;