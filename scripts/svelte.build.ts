import esbuildSvelte from "esbuild-svelte";
import { build } from "esbuild";
import { sveltePreprocess } from "svelte-preprocess";
import { mkdir, writeFile } from 'fs/promises';
import { join, basename, extname, relative } from 'path';
import { glob } from "glob";

export async function buildSvelte() {
    const rootDir = process.cwd();
    const tempPath = join(rootDir, ".temp");
    const outputDir = join(rootDir, "dist/client_packages/web");

    await mkdir(tempPath, { recursive: true });
    await mkdir(outputDir, { recursive: true });

    // Use glob to find all .svelte files in the src/web directory
    const entryFiles = await glob("src/web/**/*.svelte");

    await Promise.all(
        entryFiles.map(async (file) => {
            const name = basename(file, extname(file));
            const relativePath = relative(tempPath, file).replace(/\\/g, '/'); // Replace backslashes for Windows compatibility

            const tsContent = `
                import App from "${relativePath}";
                new App({
                    target: document.body
                });
            `;

            // Create the .ts file in .temp directory
            const tsFilePath = join(tempPath, `${name}.ts`);
            await writeFile(tsFilePath, tsContent.trim());
            console.log(`Created: ${name}.ts with relative path: ${relativePath}`);
        })
    );

    // Run esbuild to bundle all .ts files
    await build({
        bundle: true,
        metafile: true,
        platform: "browser",
        entryPoints: [join(tempPath, "**/*.ts")],
        mainFields: ["svelte", "browser", "module", "main"],
        conditions: ["svelte", "browser"],
        outdir: outputDir,
        plugins: [
            esbuildSvelte({
                preprocess: sveltePreprocess(),
            }),
        ],
    });

    // Generate an HTML file for each .ts entry file in the output directory
    await Promise.all(
        entryFiles.map(async (file) => {
            const name = basename(file, extname(file));
            const jsFilePath = `./${name}.js`; // Assuming esbuild will output a .js file with the same name in outdir
            const cssFilePath = `./${name}.css`; // You can change this if a specific CSS file is generated

            const htmlContent = `
                <!doctype html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>${name} - App</title> 
                    <link rel="stylesheet" href="${cssFilePath}" /> 
                  </head>

                  <body>
                    <script type="module" src="${jsFilePath}"></script>
                  </body>
                </html>
            `;

            // Write the HTML file to the dist directory
            const htmlFilePath = join(outputDir, `${name}.html`);
            await writeFile(htmlFilePath, htmlContent.trim());
            console.log(`Created: ${name}.html linking to ${jsFilePath}`);
        })
    );

    console.log('Build complete!');
}
