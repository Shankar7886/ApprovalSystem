import { callAPI } from "@/services/APICaller";
import { getAllApprovalGroup } from "@/services/apiURL";

export const fetchApprovalGroupMaster = async () => {
  try {
    const api = {
      URL: getAllApprovalGroup,
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const saveApprovalGroupAPI = async (args: any) => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: "/v1/ApprovalGroup",
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
export const UpdateApprovalGroupAPI = async (args: any, param: any) => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: "/v1/ApprovalGroup",
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
