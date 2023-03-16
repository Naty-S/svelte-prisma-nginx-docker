import { fail, redirect } from '@sveltejs/kit';
import { redir } from "$lib/session";

import * as api from '$lib/api';


/** @type {import('./$types').PageLoad} */
export async function load({ url }) {

}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    
    console.log("login actions: default")

    // throw redirect(307, '/');
  }
};
