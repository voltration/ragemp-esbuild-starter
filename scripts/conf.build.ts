import fs from "node:fs";
import toml from "toml";
import path from "node:path";

const tomlPath = path.resolve("./config.toml");
const jsonPath = path.resolve("./dist/conf.json");

export async function buildConfig() {
	fs.readFile(tomlPath, "utf-8", (err, data) => {
		if (err) throw err;

		const parsed = toml.parse(data);
		const config = parsed.server;

		fs.mkdir(path.dirname(jsonPath), { recursive: true }, (err) => {
			if (err) throw err;
			fs.writeFile(jsonPath, JSON.stringify(config, null, 2), (err) => {
				if (err) throw err;
			});
		});
	});
}
