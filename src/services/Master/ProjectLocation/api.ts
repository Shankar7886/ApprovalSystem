import { callAPI } from "@/services/APICaller";
import {
  getAllProjectLocation,
  getAllProjectLocationById,
} from "@/services/apiURL";

export const fetchProjectLocationAPI = async () => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: getAllProjectLocation,
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const submitProjectLocationMasterAPI = async (args: any) => {
  try {
    let api = {
      URL: getAllProjectLocation,
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("failed to save the project location details:", error);
    throw error;
  }
};
export const updateProjectLocationMasterAPI = async (args: any, param: any) => {
  try {
    let api = {
      URL: getAllProjectLocationById,
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("failed to update the project location details:", error);
    throw error;
  }
};
