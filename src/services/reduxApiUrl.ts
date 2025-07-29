import { callAPI } from "./APICaller";
import { getCities, getStates } from "./apiURL";

export const getAllProjects = "/v1/project";

// function to fetch the all employee details

export const fetchEmployeesMaster = async () => {
  try {
    let api = {
      URL: "/v1/Employee",
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const fetchStatesMaster = async () => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: getStates,
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const fetchCityMaster = async () => {
  // Fetch states of Master Section
  try {
    let api = {
      URL: getCities,
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
