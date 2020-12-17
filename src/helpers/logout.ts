import { getUserAgentApplication } from "../helpers/msal";

export function logout(): void {
  const userAgentApplication = getUserAgentApplication();
  sessionStorage.clear();
  userAgentApplication.logout();
}
