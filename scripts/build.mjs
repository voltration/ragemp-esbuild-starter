import { bold, green, white, yellow } from "colorette";
import { buildServer } from "./server.build.mjs";
import { buildSvelte } from "./svelte.build.mjs";
import { buildConfig } from "./conf.build.mjs";
import { buildReact } from "./react.build.mjs";
import { buildVue } from "./vue.build.mjs";
import { deleteAsync } from 'del';
import fs from "node:fs";
import path from "node:path";
import toml from "toml";

const start = performance.now();
const file = fs.readFileSync(path.resolve("./config.toml"), "utf-8");
const parsed = toml.parse(file);

// use ! to exclude deletion
const exclusionList = [
	"!dist/client_packages/game_resources",
	"!dist/client_packages/package2",
];

export const prod = parsed.config.production;

async function clean() {
	await deleteAsync([".temp/**", "dist/packages/**", "dist/client_packages/**", ...exclusionList]);
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
