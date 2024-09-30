import { build } from "esbuild";

export async function buildServer() {
	/** server */
	await build({
		bundle: true,
		metafile: true,
		platform: "node",
		entryPoints: ["src/server/main.ts"],
		outfile: "dist/packages/core/index.js",
	});

	/** client */
	await build({
		bundle: true,
		metafile: true,
		platform: "node",
		entryPoints: ["src/client/main.ts"],
		outfile: "dist/client_packages/index.js",
	});
}
