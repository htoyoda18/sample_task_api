import { Router } from "./interface/router/router";
import { envConfig } from "./shared/env";

const main = () => {
    const env = envConfig;
    const app = Router();
    app.listen(env.CONTAINER_API_PORT, () => {
        console.log("Server is running on container api port " + env.CONTAINER_API_PORT + "...");
    });
}

main();