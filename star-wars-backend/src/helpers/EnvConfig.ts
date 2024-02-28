import dotenv from "dotenv";
import * as joi from "joi";

dotenv.config()
process.env = {
    PORT: '3000',
    API_TOKEN: 'PeRVZ5p3RS7EzmdULoXWtulJUOcj61xfi1VKcCLJxOwz3k3t0eghJ8gZHSvbuyHC',
    NODE_ENV: 'production'
}
const envVarsSchema = joi
    .object()
    .keys({
        NODE_ENV: joi
            .string()
            .valid("production", "development", "test")
            .required(),
        PORT: joi.number().positive().required(),
        API_TOKEN: joi.string().required().description("My api token"),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default envVars as {
    PORT: number,
    API_TOKEN: string,
    NODE_ENV: string,
}