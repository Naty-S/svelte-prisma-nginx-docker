import type { info } from "@prisma/client";


export const init = function (u_info: info) {

  return {
    info: u_info.info || null
  };
};
