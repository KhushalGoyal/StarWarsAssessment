import {Request, Response, NextFunction} from "express";
import StartWarsService from "../services/StarWars";
import { ErrorResponse } from "../helpers/Response";
type StartWarsQuery = {
    type: string,
    name: string,
}
class StarWars {
    public static get(request: Request, response: Response, next: NextFunction) {
        const startWarsService = new StartWarsService();
        const { type, name } = request.query  as StartWarsQuery;
        startWarsService.getDetais(type, name).then((result)=> {
            response.status(200).send(result.data)
        }).catch((err) => {
            console.log(err)
            const error = new ErrorResponse(err?.response?.status, err?.message, [])
            next(error)
        })
    }   
}

export default StarWars;