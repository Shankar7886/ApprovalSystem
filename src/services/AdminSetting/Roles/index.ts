import { callAPI } from "@/services/APICaller";

export const fetchRolesAdmin = async () => {
  try {
    const api = {
      URL: "/v1/Roles",
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
export const saveRolesAdmin = async (data: any) => {
  try {
    const api = {
      URL: "/v1/Roles",
      method: "post",
    };
    const response = await callAPI(api, data);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
export const updateRolesAdmin = async (args: any, param: any) => {
  try {
    const api = {
      URL: "/v1/Roles",
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
