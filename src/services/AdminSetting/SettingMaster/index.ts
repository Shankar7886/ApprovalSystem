import { callAPI } from "@/services/APICaller";
import { getAllSettings, getAllSettingsById } from "@/services/apiURL";

export const fetchSettingMasterAPI = async () => {
  try {
    const api = {
      URL: getAllSettings,
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const submitSettingMasterAPI = async (args: any) => {
  try {
    let api = {
      URL: getAllSettings,
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("failed to save the setting details:", error);
    throw error;
  }
};
export const updateSettingMasterAPI = async (args: any, param: any) => {
  try {
    let api = {
      URL: getAllSettingsById,
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("failed to update the setting details:", error);
    throw error;
  }
};
