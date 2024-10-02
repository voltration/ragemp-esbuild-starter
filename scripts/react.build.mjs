import { mkdir, writeFile } from "node:fs/promises";
import { basename, extname, join, relative } from "node:path";
import { build } from "esbuild";
import { glob } from "glob";
import { prod } from "./build";

export async function buildReact() {
	const rootDir = process.cwd();
	const tempPath = join(rootDir, ".temp");
	const outputDir = join(rootDir, "dist/client_packages/web");
	const entryFiles = await glob("src/web/**/*.{tsx,jsx}");

	await mkdir(tempPath, { recursive: true });
	await mkdir(outputDir, { recursive: true });

	await Promise.all(
		entryFiles.map(async (file) => {
			const name = basename(file, extname(file));
			const relativePath = relative(tempPath, file).replace(/\\/g, "/");
			const tsContent = `import React from 'react';import ReactDOM from 'react-dom/client';import App from "${relativePath}";ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);`;
			const tsFilePath = join(tempPath, `${name}.tsx`);

			await writeFile(tsFilePath, tsContent.trim());
		}),
	);

	await build({
		bundle: true,
		metafile: true,
		platform: "browser",
		entryPoints: [join(tempPath, "**/*.tsx")],
		mainFields: ["browser", "module", "main"],
		conditions: ["browser"],
		outdir: outputDir,
		sourcemap: "inline",
		minify: prod,
		loader: { ".tsx": "tsx", ".jsx": "jsx" },
		jsxFactory: "React.createElement",
		jsxFragment: "React.Fragment",
	});

	await Promise.all(
		entryFiles.map(async (file) => {
			const name = basename(file, extname(file));
			const jsFilePath = `./${name}.js`;
			const cssFilePath = `./${name}.css`;
			const htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${name}</title><link rel="stylesheet" href="${cssFilePath}" /></head><body><div id="root"></div><script type="module" src="${jsFilePath}"></script></body></html>`;
			const htmlFilePath = join(outputDir, `${name}.html`);

			await writeFile(htmlFilePath, htmlContent.trim());
		}),
	);
}