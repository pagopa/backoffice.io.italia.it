import { SupportToken } from "../../generated/definitions/SupportToken";

export function normalizeCitizenid(citizenid: string): string {
  return SupportToken.is(citizenid) ? citizenid : citizenid.toUpperCase();
}

export const getCitizenId = () => {
  return window.sessionStorage.getItem("citizenid") || "";
};
export const getUserToken = () => {
  return window.sessionStorage.getItem("userToken") || "";
};
export const setCitizenId = (citizenid: string) => {
  const CitizenId = normalizeCitizenid(citizenid);
  window.sessionStorage.setItem("citizenid", CitizenId);
};
