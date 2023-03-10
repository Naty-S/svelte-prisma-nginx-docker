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
	server: {
		strictPort: true,
		// watch: {
		// 	usePolling: process.env.USE_POLLING,
		// },
		hmr: {
			clientPort: 3000
		},
		host: '0.0.0.0',
		port: 3000,
	}
};

export default config;
