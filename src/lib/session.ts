import type { Load } from "@sveltejs/kit";

import * as api from "$lib/api";


export const redir: Load = async function ({ url }) {

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
};
