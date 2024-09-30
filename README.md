<div align="center">
   <h1>ragemp-esbuild-starter</h1>
    <p>Next generation starter for RAGE:MP development</p>
</div>

> [!WARNING]  
> This project is not complete yet. I may change this at anytime...

# Roadmap
| Web frameworks to be added  | Done |
| --- | --- |
| Svelte  | X  |
| Vue  |   |
| React |   |

# Installation
> [!NOTE]  
> While this tutorial and repository uses Bun, it will work 100% fine with Node. It uses Node.js functions to build.

### Prerequisites
* [Bun](https://bun.sh/) or [Node.js](https://nodejs.org/en)
* [Git](https://git-scm.com/)

### Clone and setup the repository
Open a terminal, and write:
```
git clone https://github.com/voltration/ragemp-esbuild-starter.git
cd ragemp-esbuild-starter
bun i
```

### Drop server files in dist directory
> [!NOTE]  
> Linux server files can be located [here](https://cdn.rage.mp/updater/prerelease/server-files/linux_x64.tar.gz).

From where your RAGE:MP installation is located, retrieve copy the contents for `server-files` and drop them into `dist`.

# Development and tips
* Everything happens from the `main.ts` files located in `src/server` and `src/client`. To use other files you need to import them from `main.ts` from their respective directories.
* `src/web` is a different story, every file from that directory is compiled into HTML files. They are compiled to `dist/client_packages/web`. If you were to use them with `mp.browser.new()` you would use the path `http://package/web/<FileName>.html`.


### Build your project
```
bun run build (add --watch if you want to watch src directory)
```

This project was created using `bun init` in bun v1.1.22. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
