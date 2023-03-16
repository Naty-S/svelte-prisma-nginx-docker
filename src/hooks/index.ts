import type { Handle } from "@sveltejs/kit";

// import * as cookie from "cookie";


export const handle: Handle = async function ({ event, resolve }) {

  const response = await resolve(event);
  // const cookies = cookie.parse(event.request.headers.get("cookie") || '');
  // const jwt = cookies.jwt && Buffer.from(cookies.jwt, "base64").toString("utf-8");

  // set user
  // event.locals.user = jwt ? JSON.parse(jwt) : null;
  // event.locals.user = ;

  // Apply CORS header for API routes
  // if (event.url.pathname.startsWith('/api')) {
  // Required for CORS to work
  // if (event.request.method === 'OPTIONS') {
  //   return new Response(null, {
  //     headers: {
  //       'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
  //       'Access-Control-Allow-Origin': '*',
  //     }
  //   });
  // }

  // response.headers.append('Access-Control-Allow-Origin', `*`);
  // }

  return response;
};

// export const getSession: GetSession = function ({ locals }) {
//   return {
//     user: locals.user
//   };
// };

