import { SupportToken } from "../../generated/definitions/SupportToken";

export const getCitizenId = () => {
  return window.sessionStorage.getItem("citizenid") || "";
};
export const getUserToken = () => {
  return window.sessionStorage.getItem("userToken") || "";
};
export const setCitizenId = (citizenid: string) => {
  const CitizenId = SupportToken.is(citizenid)
    ? citizenid
    : citizenid.toUpperCase();
  window.sessionStorage.setItem("citizenid", CitizenId);
};
