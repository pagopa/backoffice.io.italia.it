import { createClient } from "../../generated/definitions/client";

export const BackofficeClient = createClient({
  basePath: "/backoffice",
  baseUrl: process.env.REACT_APP_API_URL || "",
  fetchApi: fetch
});
