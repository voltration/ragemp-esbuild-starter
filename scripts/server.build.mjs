import { build } from "esbuild";
import { prod } from "./build.mjs";

export async function buildServer() {
	/** server */
	await build({
		bundle: true,
		metafile: true,
		platform: "node",
		entryPoints: ["src/server/main.ts"],
		outfile: "dist/packages/core/index.js",
		sourcemap: "inline",
		minify: prod,
	});

	/** client */
	await build({
		bundle: true,
		metafile: true,
		platform: "node",
		entryPoints: ["src/client/main.ts"],
		outfile: "dist/client_packages/index.js",
		sourcemap: "inline",
		minify: prod,
	});
}
