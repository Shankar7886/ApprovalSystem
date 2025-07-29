import { callAPI } from "../APICaller";

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

//function to call the designation list

export const fetchDesignationList = async () => {
  try {
    let api = {
      URL: "/v1/Designation",
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

// function to call the department List

export const fetchDepartmentList = async () => {
  try {
    let api = {
      URL: "/v1/Department",
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const fetchCountryApiFn = async () => {
  try {
    let api = {
      URL: "/v1/Country",
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
export const fetchStateApiFn = async () => {
  try {
    let api = {
      URL: "/v1/State",
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
export const fetchCityApiFn = async () => {
  try {
    let api = {
      URL: "/v1/City",
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const submitEmployeePrsnlDtlApi = async (args: any) => {
  try {
    let api = {
      URL: "/v1/Employee",
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("failed to save the employee Personal details:", error);
    throw error;
  }
};

export const updateEmployeePrsnlDtlApi = async (args: any, param: any) => {
  try {
    let api = {
      URL: "/v1/Employee",
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("failed to update the employee Personal details:", error);
    throw error;
  }
};

export const getAllEmployeeAddress = async () => {
  try {
    let api = {
      URL: "/v1/EmployeeAddress",
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

// await callAPI(
//   { method: "put", URL: "/employee/update" },
//   { name: "John" },                  // bodyParams
//   null,                              // headers (optional)
//   { id: 123 }                        // query params
// );

// await callAPI(
//   { method: "delete", URL: "/employee/delete" },
//   {},                                 // no body
//   null,                               // headers
//   { id: 123 }                         // query params
// );
