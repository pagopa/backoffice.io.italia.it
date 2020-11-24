import { createClient } from "../generated/definitions/client";

export const BackofficeClient = createClient({
  baseUrl: process.env.REACT_APP_API_URL || "",
  fetchApi: fetch
});
