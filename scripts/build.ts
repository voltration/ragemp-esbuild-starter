import { buildServer } from "./server.build";
import { bold, green, yellow, white } from "colorette";
import { buildSvelte } from "./svelte.build";

const start = performance.now();

(async () => {
    await buildServer();
    await buildSvelte();

    const end = performance.now();

    console.log(
        bold(green("[INFO]")), 
        white(`Used ${yellow((end - start).toFixed(0))} ms to build.`));
})();