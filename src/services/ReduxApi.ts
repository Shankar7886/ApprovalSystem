import { callAPI } from "./APICaller";

export const getAllProjects = "/v1/project";

// function to fetch the all employee details

export const fetchEmployeesMaster = async () => {
  try {
      let api = {
    URL: "/v1/Employee",
    method: "get",
  };
    const response =await callAPI(api)
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

