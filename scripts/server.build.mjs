import { build } from "esbuild";
import { prod } from "./build.mjs";
import dotenv from "dotenv";

const parsed = dotenv.config().parsed || {};
const env = Object.entries(parsed).reduce((acc, [key, value]) => ({
	...acc,
	[`process.env.${key}`]: JSON.stringify(value)
}), {});

export async function buildServer() {
	/** server */
	await build({
		bundle: true,
		metafile: true,
		platform: "node",
		entryPoints: ["src/server/main.ts"],
		outfile: "dist/packages/core/index.js",
		sourcemap: "inline",
		target: ["node14"],
		minify: prod,
		define: env
	});

	/** client */
	await build({
		bundle: true,
		metafile: true,
		platform: "node",
		entryPoints: ["src/client/main.ts"],
		outfile: "dist/client_packages/index.js",
		sourcemap: "inline",
		target: ["node14"],
		minify: prod,
	});
}
