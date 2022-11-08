import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";


/** @type {import("vite").UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$api: path.resolve("./src/routes/api"),
		}
	},
};

export default config;
