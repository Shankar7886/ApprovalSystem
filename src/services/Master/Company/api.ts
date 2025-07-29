import { callAPI } from "@/services/APICaller";
import { getCompanyData } from "@/services/apiURL";

export const fetchCompanyMaster = async () => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: getCompanyData,
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const saveCompanyAPI = async (args: any) => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: "/v1/Company",
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const updateCompanyAPI = async (args: any, param: any) => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: "/v1/Company",
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
