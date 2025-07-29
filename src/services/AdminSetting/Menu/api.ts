import { callAPI } from "@/services/APICaller";

export const fetchMenuListAPI = async () => {
  try {
    const api = {
      URL: "/v1/Menus",
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const saveMenuAPI = async (args: any) => {
  try {
    const api = {
      URL: "/v1/Menus",
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
export const updateMenuAPI = async (args: any, param: any) => {
  try {
    let api = {
      URL: "/v1/Menus",
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
