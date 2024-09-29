import { buildServer } from "./server.build";
import { bold, green, yellow, white } from "colorette";
import { buildSvelte } from "./svelte.build";
import { rimraf } from "rimraf";

const start = performance.now();

async function clean() {
    await rimraf(".temp");
    await rimraf('dist/packages');
    await rimraf('dist/client_packages');
}

(async () => {
    await clean();
    await buildServer();
    await buildSvelte();

    const end = performance.now();

    console.log(
        bold(green("[INFO]")), 
        white(`Used ${yellow((end - start).toFixed(0))} ms to build.`));
})();