import { createClient, WithDefaultsT } from "../generated/definitions/client";

export const simpleClient = createClient({
  baseUrl: process.env.REACT_APP_API_URL,
  fetchApi: fetch
});