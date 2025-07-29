import { callAPI } from "@/services/APICaller";
import { getAllProjects, getAllProjectsById } from "@/services/apiURL";

export const fetchProjectAPI = async () => {
  try {
    let api = {
      URL: getAllProjects,
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const submitProjectMasterAPI = async (args: any) => {
  try {
    let api = {
      URL: getAllProjects,
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("failed to save the project location details:", error);
    throw error;
  }
};
export const updateProjectMasterAPI = async (args: any, param: any) => {
  try {
    let api = {
      URL: getAllProjectsById,
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("failed to update the project location details:", error);
    throw error;
  }
};
