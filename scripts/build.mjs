import { bold, green, white, yellow } from "colorette";
import { rimraf } from "rimraf";
import { buildServer } from "./server.build";
import { buildSvelte } from "./svelte.build";
import { buildConfig } from "./conf.build";
import { buildReact } from "./react.build";
import fs from "node:fs";
import path from "node:path";
import toml from "toml";
import { buildVue } from "./vue.build";

const start = performance.now();
const file = fs.readFileSync(path.resolve("./config.toml"), "utf-8");
const parsed = toml.parse(file);

export const prod = parsed.config.production;

async function clean() {
	await rimraf(".temp");
	await rimraf("dist/packages");
	await rimraf("dist/client_packages");
}

(async () => {
	await clean();
	await buildServer();
	await buildSvelte();
	await buildVue();
	await buildReact();
	await buildConfig();

	const end = performance.now();

	console.log(
		bold(green("[INFO]")),
		white(`Used ${yellow((end - start).toFixed(0))} ms to build.`),
	);
})();
