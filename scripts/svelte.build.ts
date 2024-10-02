import { mkdir, writeFile } from "node:fs/promises";
import { basename, extname, join, relative } from "node:path";
import { build } from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import { glob } from "glob";
import { sveltePreprocess } from "svelte-preprocess";
import { prod } from "./build";

export async function buildSvelte() {
	const rootDir = process.cwd();
	const tempPath = join(rootDir, ".temp");
	const outputDir = join(rootDir, "dist/client_packages/web");
	const entryFiles = await glob("src/web/**/*.svelte");

	await mkdir(tempPath, { recursive: true });
	await mkdir(outputDir, { recursive: true });

	await Promise.all(
		entryFiles.map(async (file) => {
			const name = basename(file, extname(file));
			const relativePath = relative(tempPath, file).replace(/\\/g, "/");
			const tsContent = `import App from "${relativePath}";new App({ target: document.body });`;
			const tsFilePath = join(tempPath, `${name}.ts`);

			await writeFile(tsFilePath, tsContent.trim());
		}),
	);

	await build({
		bundle: true,
		metafile: true,
		platform: "browser",
		entryPoints: [join(tempPath, "**/*.ts")],
		mainFields: ["svelte", "browser", "module", "main"],
		conditions: ["svelte", "browser"],
		outdir: outputDir,
		sourcemap: "inline",
		minify: prod,
		plugins: [
			esbuildSvelte({
				preprocess: sveltePreprocess({
					typescript: {
						tsconfigFile: "./src/web/tsconfig.json",
					},
				}),
			}),
		],
	});

	await Promise.all(
		entryFiles.map(async (file) => {
			const name = basename(file, extname(file));
			const jsFilePath = `./${name}.js`;
			const cssFilePath = `./${name}.css`;
			const htmlContent = `<!doctype html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${name}</title><link rel="stylesheet" href="${cssFilePath}" /></head><body><script type="module" src="${jsFilePath}"></script></body></html>`;
			const htmlFilePath = join(outputDir, `${name}.html`);

			await writeFile(htmlFilePath, htmlContent.trim());
		}),
	);
}
