import { callAPI } from "@/services/APICaller";
import { getAllItemMaster, getAllItemMasterById } from "@/services/apiURL";

export const fetchItemMasterAPI = async () => {
  try {
    const api = {
      URL: getAllItemMaster,
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const submitItemMasterAPI = async (args: any) => {
  try {
    let api = {
      URL: getAllItemMaster,
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("failed to save the item master details:", error);
    throw error;
  }
};
export const updateItemMasterAPI = async (args: any, param: any) => {
  try {
    let api = {
      URL: getAllItemMasterById,
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("failed to update the item master details:", error);
    throw error;
  }
};
