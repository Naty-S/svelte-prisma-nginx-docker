/// <reference types="@sveltejs/kit" />

export interface User {
	email: string;
};

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		interface Locals {
			user: User | null;
		};
		// interface Platform {}
		interface Session {
			user: User | null;
		};
		// interface Stuff {}
	};
};
