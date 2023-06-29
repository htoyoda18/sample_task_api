import { Router } from "./interface/router/router";
import { envConfig } from "./shared/env";

const main = () => {
    const env = envConfig;
    const app = Router();
    app.listen(env.API_PORT, () => {
        console.log("Server is running on port 3000");
    });
}