export const getCitizenId = () => {
  const CitizenId = window.sessionStorage.getItem("citizenid") || "";
  return CitizenId.toUpperCase();
};
export const getUserToken = () => {
  return window.sessionStorage.getItem("userToken") || "";
};
export const setCitizenId = (citizenid: string) => {
  window.sessionStorage.setItem("citizenid", citizenid);
};
