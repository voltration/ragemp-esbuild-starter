<div align="center">
   <h1>ragemp-esbuild-starter</h1>
   <p>A starter template designed for fast development.</p>
</div>

# Features
* **Quickly integrate CEF components**: Create your Svelte, React or Vue components in the `src/web` directory. The bundler will handle the rest, converting them to HTML with complete RAGE:MP type safety inside your components.

* **Fast compile times**: Enjoy fast builds thanks to [esbuild](https://esbuild.github.io/).

* **Biome.js Integration**: Use [Biome.js](https://biomejs.dev/) to keep your codebase formatted and linted.

# Installation
> [!NOTE]
> While this project uses Bun by default, it works perfectly with Node.js as well. The build scripts rely on standard Node.js functions.

### Prerequisites
* [Bun](https://bun.sh/) or [Node.js](https://nodejs.org/en)
* [Git](https://git-scm.com/)

### Cloning and Setting Up the Repository
Open your terminal and run:
```
git clone https://github.com/voltration/ragemp-esbuild-starter.git
cd ragemp-esbuild-starter
bun i
```
### Add Server Files to the `dist` Directory
> [!TIP] 
> You can find the Linux server files [here](https://cdn.rage.mp/updater/prerelease/server-files/linux_x64.tar.gz).

Copy the `server-files` from your RAGE:MP installation and place them in the `dist` directory.

# Development & Tips
* All server and client logic starts from the `main.ts` files located in `src/server` and `src/client`. If you add more files, make sure to import them into the appropriate `main.ts` files.

* The `src/web` directory is handled separately. Each file in this directory is compiled into an HTML file and placed in `dist/client_packages/web`. When loading these files with `mp.browser.new()`, use the path: `http://package/web/<FileName>.html`.

* Server settings can be configured in the `config.toml` file.

### Building Your Project
To build your project, run:
```
bun run build
```
To format your code, run:
```
bun run format
```
To lint your code, run:
```
bun run lint
```

# Issues and Requests
* If you have a bug report or a feature request, you can create a new [issue](https://github.com/voltration/ragemp-esbuild-starter/issues/new).
