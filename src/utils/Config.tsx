const Config = {
  BASEURL: "https://api.ssdapproval.com",
  getAccessToken: () =>
    typeof window !== "undefined" ? sessionStorage.getItem("token") : "",
};
export default Config;
