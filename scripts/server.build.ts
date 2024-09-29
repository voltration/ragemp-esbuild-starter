import { build } from "esbuild";
import { clean } from 'esbuild-plugin-clean';

export async function buildServer() {
    /** server */
    await build({
        bundle: true,
        metafile: true,
        platform: "node",
        entryPoints: ["src/server/main.ts"],
        outdir: "dist/packages/core",
    });

    /** client */
    await build({
        bundle: true,
        metafile: true,
        platform: "node",
        entryPoints: ["src/client/main.ts"],
        outdir: "dist/client_packages",
    });
}


