import type { Load } from "@sveltejs/kit";
import { redirect } from '@sveltejs/kit';
import { redir } from "$lib/session";

import * as api from '$lib/api';


// import type { PageLoad, PageServerLoad } from './$types';

/** @type {import('./$types').PageServerLoad} */
export const load: Load = async ({ url }) => {
  api.get("/api/login");

  return { url: url.pathname }
}

// /** @type {import('./$types').Actions} */
// export const actions = {
//   default: async ({ request }) => {
    
//     console.log("login actions: default")

//     // throw redirect(307, '/');
//   }
// };
