import { fail, redirect } from '@sveltejs/kit';
import { redir } from "$lib/session";

import * as api from '$lib/api';


/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {

  if (url.searchParams.has("ticket")) {

    const cas_ticket = url.searchParams.get("ticket");

    return {
      status: 200
    };
  } else if (url.pathname.includes("login")) {

    return {
      status: 302,
      redirect: "https://secure.dst.usb.ve/login?service=http%3A%2F%2Flocalhost:3000%2Flogin"
      // redirect: "https://secure.dst.usb.ve/login?service=http%3A%2F%2Fwww.sinai.did.usb.ve%2Flogin"
    };
  } else {
    return {
      status: 200
    };
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    
    console.log("login actions: default")

    // throw redirect(307, '/');
  }
};
