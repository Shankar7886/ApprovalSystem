import { callAPI } from "@/services/APICaller";

export const fetchMenuGroupAPI = async () => {
  try {
    const api = {
      URL: "/v1/MenuGroups",
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const submitMenuGroupAPI = async (args: any) => {
  try {
    let api = {
      URL: "/v1/MenuGroups",
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("failed to save the item master details:", error);
    throw error;
  }
};
export const updateMenuGroupAPI = async (args: any, param: any) => {
  try {
    let api = {
      URL: "/v1/MenuGroups",
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("failed to update the item master details:", error);
    throw error;
  }
};
