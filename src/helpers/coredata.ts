import { SupportToken } from "../../generated/definitions/SupportToken";

export const getCitizenId = () => {
  const CitizenId = window.sessionStorage.getItem("citizenid") || "";
  return SupportToken.is(CitizenId) ? CitizenId : CitizenId.toUpperCase();
};
export const getUserToken = () => {
  return window.sessionStorage.getItem("userToken") || "";
};
export const setCitizenId = (citizenid: string) => {
  window.sessionStorage.setItem("citizenid", citizenid);
};
