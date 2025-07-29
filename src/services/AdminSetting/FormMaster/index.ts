import { callAPI } from "@/services/APICaller";

export const fetchFormMasterAPI = async () => {
  try {
    const api = {
      URL: "/v1/Forms",
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
export const saveFormMasterAPI = async (args: any) => {
  try {
    let api = {
      URL: "/v1/Forms",
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("failed to save the item master details:", error);
    throw error;
  }
};
export const updateFormMasterAPI = async (args: any, param: any) => {
  try {
    let api = {
      URL: "/v1/Forms",
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("failed to update the item master details:", error);
    throw error;
  }
};
