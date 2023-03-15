import type { Load } from "@sveltejs/kit";
import * as api from "$lib/api";


/** @type {import('./$types').PageServerLoad} */
export const load: Load = async ({ params, fetch }) => {
  const res = await fetch(`/api/info/${params.uid}`);

  if (res.ok) {
    const info = await res.json();

    return { info };
  };

  const { message } = await res.json();
  return {
    error: new Error(message)
  };
};
