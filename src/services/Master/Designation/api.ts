import { callAPI } from "@/services/APICaller";
import { getAllDesignation, getAllDesignationById } from "@/services/apiURL";

export const fetchDesignationMasterAPI = async () => {
  try {
    const api = {
      URL: getAllDesignation,
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const submitDesignationMasterAPI = async (args: any) => {
  try {
    let api = {
      URL: getAllDesignation,
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("failed to save the designation details:", error);
    throw error;
  }
};
export const updateDesignationMasterAPI = async (args: any, param: any) => {
  try {
    let api = {
      URL: getAllDesignationById,
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("failed to update the department details:", error);
    throw error;
  }
};
