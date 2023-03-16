import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";


// import * as passport from "passport";


/** @type {import('vite').Plugin} */
const myPlugin = {
	name: 'log-request-middleware',
	configureServer(server) {
		server.middlewares.use((req, res, next) => {

			// initialize passport
			// passport.initialize();
			// passport.session();

			console.log(`Got request ${req.url}`);
			next();
		});
	}
};

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), myPlugin],
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
