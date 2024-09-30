import { bold, green, white, yellow } from "colorette";
import { rimraf } from "rimraf";
import { buildServer } from "./server.build";
import { buildSvelte } from "./svelte.build";
import { buildReact } from "./react.build";

const start = performance.now();

async function clean() {
	await rimraf(".temp");
	await rimraf("dist/packages");
	await rimraf("dist/client_packages");
}

(async () => {
	await clean();
	await buildServer();
	await buildSvelte();
	await buildReact();

	const end = performance.now();

	console.log(
		bold(green("[INFO]")),
		white(`Used ${yellow((end - start).toFixed(0))} ms to build.`),
	);
})();
