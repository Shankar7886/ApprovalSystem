import { callAPI } from "@/services/APICaller";
import { getAllDepartment, getAllDepartmentById } from "@/services/apiURL";

export const fetchDepartmentMasterAPI = async () => {
  try {
    const api = {
      URL: getAllDepartment,
      method: "get",
    };
    const response = await callAPI(api);
    return response;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const submitDepartmentMasterAPI = async (args: any) => {
  try {
    let api = {
      URL: getAllDepartment,
      method: "post",
    };
    const response = await callAPI(api, args);
    return response;
  } catch (error) {
    console.error("failed to save the department details:", error);
    throw error;
  }
};
export const updateDepartmentMasterAPI = async (args: any, param: any) => {
  try {
    let api = {
      URL: getAllDepartmentById,
      method: "put",
    };
    const response = await callAPI(api, args, null, param);
    return response;
  } catch (error) {
    console.error("failed to update the department details:", error);
    throw error;
  }
};

// export const submitDepartmentMaster = async (args: any) => {
//   try {
//     const isUpdate = args.id > 0;

//     const api = {
//       URL: isUpdate ? `${getAllDepartmentById}${args.id}` : getAllDepartment,
//       method: isUpdate ? "put" : "post",
//     };

//     const response = await callAPI(api, args);
//     return response;
//   } catch (error) {
//     console.error("Failed to save department details:", error);
//     return {
//       IsSuccess: false,
//       DisplayMessage: "Something went wrong, please try again.",
//     };
//   }
// };
// export const submitDepartmentMaster = async (payload: any, id?: number) => {
//   try {
//     const isUpdate = id && id > 0;

//     const api = {
//       URL: isUpdate ? `${getAllDepartmentById}${id}` : getAllDepartment,
//       method: isUpdate ? "put" : "post",
//     };

//     const response = await callAPI(api, payload);
//     return response;
//   } catch (error) {
//     console.error("Failed to save department details:", error);
//     return {
//       IsSuccess: false,
//       DisplayMessage: "Something went wrong, please try again.",
//     };
//   }
// };
