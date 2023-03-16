import { error } from '@sveltejs/kit'; 


type Method = "GET" | "POST" | "PATCH" | "DELETE";


const request = async function (method: Method, endpoint: string, headers: any, data?: any) {

  const opts: any = { method, headers, credentials: "same-origin", /* mode: "no-cors" */ };

  if (data) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(data);
  };

  const res = await fetch(endpoint, opts);

  if (res.ok || res.status === 422) {
    const text = await res.text();

    return text ? JSON.parse(text) : {};
  };

  throw error(res.status);

  // return fetch(endpoint, opts);
};

export const get = function (endpoint: string, headers: any = {}) {
  return request("GET", endpoint, headers);
};

export const del = function (endpoint: string, headers: any = {}) {
  return request("DELETE", endpoint, headers);
};

export const post = function (endpoint: string, headers: any = {}, data: any) {
  return request("POST", endpoint, headers, data);
};

export const patch = function (endpoint: string, headers: any = {}, data: any) {
  return request("PATCH", endpoint, headers, data);
};
