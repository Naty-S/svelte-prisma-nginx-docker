import { error } from '@sveltejs/kit';


type Method = "GET" | "POST" | "PATCH" | "DELETE";


const request = async function (method: Method, endpoint: string, data?: any) {

  const opts: any = { method, headers: {}, credentials: "include" };

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
};

export const get = function (endpoint: string) {
  return request("GET", endpoint);
};

export const del = function (endpoint: string) {
  return request("DELETE", endpoint);
};

export const post = function (endpoint: string, data: any) {
  return request("POST", endpoint, data);
};

export const patch = function (endpoint: string, data: any) {
  return request("PATCH", endpoint, data);
};
