import { callAPI } from "@/services/APICaller";
import { getAllTemplate, getAllTemplateById } from "@/services/apiURL";

export const fetchTemplateAPI = async () => {
  try {
    const api = {
      URL: getAllTemplate,
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const submitTemplateAPI = async (args: any) => {
  try {
    let api = {
      URL: getAllTemplate,
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("failed to save the template details:", error);
    throw error;
  }
};
export const updateTemplateAPI = async (args: any, param: any) => {
  try {
    let api = {
      URL: getAllTemplateById,
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("failed to update the template details:", error);
    throw error;
  }
};
