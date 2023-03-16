import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


export const GET: RequestHandler = async function ({ params }) {

  let status = 500;
  let body = null;

  try {
    console.log("login server")

    status = 200;
    // body = {};

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = JSON.stringify({ message, code });
  };

  return new Response(body);
};
