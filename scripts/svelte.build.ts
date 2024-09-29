import esbuildSvelte from "esbuild-svelte";
import { build } from "esbuild";
import { glob } from 'glob';
import { sveltePreprocess } from "svelte-preprocess";

export async function buildSvelte() {
    await build({
        bundle: true,
        metafile: true,
        platform: "browser",
        entryPoints: ["src/web/**/*.ts"],
        mainFields: ["svelte", "browser", "module", "main"],
        conditions: ["svelte", "browser"],
        outdir: "dist/client_packages/web",
        plugins: [
            esbuildSvelte({
                preprocess: sveltePreprocess(),
            }),
        ],
    });
}


