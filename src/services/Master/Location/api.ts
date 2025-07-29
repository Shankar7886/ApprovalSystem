import { callAPI } from "@/services/APICaller";
import { getAllCountry } from "@/services/apiURL";

export const fetchCountryMaster = async () => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: getAllCountry,
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const saveCountry = async (args: any) => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: "/v1/Country",
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const UpdateCountryAPI = async (args: any, param: any) => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: "/v1/Country",
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const SaveStateAPI = async (args: any) => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: "/v1/State",
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const UpdateStateAPI = async (args: any, param: any) => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: "/v1/State",
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const SaveCityAPI = async (args: any) => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: "/v1/City",
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
export const UpdateCityAPI = async (args: any, param: any) => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: "/v1/City",
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
