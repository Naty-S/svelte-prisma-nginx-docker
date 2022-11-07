import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


export const GET: RequestHandler = async function ({ params }) {

  let status = 500;
  let body = null;

  try {
    const info = await prisma.info.findUniqueOrThrow({
      where: { uid: params.uid }
    });

    status = 200;
    body = JSON.stringify(info);

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = JSON.stringify({ message, code });
  };

  return new Response (body);
};


export const PATCH: RequestHandler = async function ({ request, params }) {

  const data = await request.json();

  let status = 500;
  let body = null;

  try {
    await prisma.info.update({
      data: data.new,
      where: { uid: params.uid }
    });

    status = 200;
    body = JSON.stringify({ code: "updated" });

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = JSON.stringify({ message, code });
  };

  return new Response(body);
};
