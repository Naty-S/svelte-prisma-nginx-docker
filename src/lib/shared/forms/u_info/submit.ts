import * as api from "$lib/api";


export const submit = function (uid: string, pathname: string) {
  return async function (data: any) {

    const res = await api.patch(`/api/info/${uid}`, { new: data, pathname });

    location.reload();
  };
};
