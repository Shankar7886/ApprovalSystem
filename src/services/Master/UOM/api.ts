import { callAPI } from "@/services/APICaller";

export const fetchUnitOfMeasurementAPI = async () => {
  // Fetch UOM of Master Section
  try {
    let api = {
      URL: "/v1/UnitOfMeasurement",
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const saveUnitOfMeasurementAPI = async (args: any) => {
  // Fetch UOM of Master Section
  try {
    let api = {
      URL: "/v1/UnitOfMeasurement",
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const updateUnitOfMeasurementAPI = async (args: any, param: any) => {
  // Fetch UOM of Master Section
  try {
    let api = {
      URL: "/v1/UnitOfMeasurement",
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
