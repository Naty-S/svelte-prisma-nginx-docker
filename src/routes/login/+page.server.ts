import type { Load } from "@sveltejs/kit";
import { redirect } from '@sveltejs/kit';
import { redir } from "$lib/session";

import * as api from '$lib/api';


// import type { PageLoad, PageServerLoad } from './$types';

/** @type {import('./$types').PageServerLoad} */
export const load: Load = async ({ url }) => {
  
  console.log("load")
  const res = await api.get("/api/login");

  if (res.ok) {
    return { url: url.pathname }
  }

  const { message } = await res.json();
  return {
    error: new Error(message)
  };
}

// /** @type {import('./$types').Actions} */
// export const actions = {
//   default: async ({ request }) => {
    
//     console.log("login actions: default")

//     // throw redirect(307, '/');
//   }
// };
