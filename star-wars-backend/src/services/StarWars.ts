import { AxiosResponse } from "axios";
import RequestHelper from "../helpers/Request";

class StartWarsService {
    private requestHelper : RequestHelper;
    private baseURL : string = 'https://swapi.dev/api/'
    constructor() {
        this.requestHelper = new RequestHelper()
    }
    async getDetais (type: string, name?: string | undefined | null) : Promise<AxiosResponse> {
        let param = {}
        if (name) param = {...param, ...{search: name}}
        return this.requestHelper.get(this.baseURL, type, param, {})
    }
}

export default StartWarsService;