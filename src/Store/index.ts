import { configureStore } from "@reduxjs/toolkit";
import currentPageReducer from "./features/currentPageReducer";
import employeeListReducer from "./features/Master/EmployeeMaster"; // slice file
import stateListReducer from "./features/Master/Location/State";
import cityListReducer from "./features/Master/Location/City";
import companyListReducer from "./features/Master/CompanyMaster";
import countryListReducer from "./features/Master/Location/Country";
import projectListReducer from "./features/Master/Project";
import projectLocationListReducer from "./features/Master/ProjectLocation";
import designationListReducer from "./features/Master/DesignationMaster";
import departmentListReducer from "./features/Master/DepartmentMaster";
import approvalGroupListReducer from "./features/Master/ApprovalGroup";
import rolesListReducer from "./features/AdminSetting/Roles";
import settingMasterReducer from "./features/AdminSetting/SettingMaster";
import itemMasterReducer from "./features/AdminSetting/ItemMaster";
import templateReducer from "./features/AdminSetting/Template";
import unitOfMeasurementListReducer from "./features/Master/UOM";
import menuGroupListReducer from "./features/AdminSetting/MenuGroup";
import formMasterListReducer from "./features/AdminSetting/FormMaster";
import MenuListReducer from "./features/AdminSetting/Menu";
export const store = configureStore({
  reducer: {
    pagetitle: currentPageReducer,
    employeeList: employeeListReducer,
    stateList: stateListReducer,
    cityList: cityListReducer,
    countryList: countryListReducer,
    companyList: companyListReducer,
    projectList: projectListReducer,
    projectLocationList: projectLocationListReducer,
    designationList: designationListReducer,
    departmentList: departmentListReducer,
    approvalGroupList: approvalGroupListReducer,
    rolesList: rolesListReducer,
    settingMasterList: settingMasterReducer,
    itemMasterList: itemMasterReducer,
    templateList: templateReducer,
    unitOfMeasurementList: unitOfMeasurementListReducer,
    menuGroupList: menuGroupListReducer,
    formMasterList: formMasterListReducer,
    menuList: MenuListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
