import { toast } from "sonner";
import { MESSAGE } from "@/components/common/MessageList";

export const Regex = {
  onlyNumbers: /^\d+$/,
  onlyLetters: /^[a-zA-Z]+$/,
  onlyLettersWithSpaces: /^[a-zA-Z\s]+$/,
  onlyLettersAndNumbers: /^[a-zA-Z0-9]+$/,
  onlyLettersAndNumbersWithSpaces: /^[a-zA-Z0-9\s]+$/,
  // email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  phone: /^\d{10}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  passwordWithSpecialChars:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,}$/,
  name: /^[A-Za-z\s]+$/,
  address: /^[a-zA-Z0-9\s,.'-]{3,}$/,
  postalCode: /^\d{5}(-\d{4})?$/, // US ZIP code format
};

export const validateName = (Name: string): string =>
  !Name
    ? MESSAGE.NAME_REQUIRED
    : Name.length < 2
    ? MESSAGE.WRITE_MORE_THAN_TWO_CHARACTERS
    : "";
export const validateProjectName = (ProjectName: string): string =>
  !ProjectName
    ? MESSAGE.PROJECT_NAME_IS_REQUIRED
    : ProjectName.length < 2
    ? MESSAGE.WRITE_MORE_THAN_TWO_CHARACTERS
    : "";
export const validateDepartemntName = (departemntName: string): string =>
  !departemntName
    ? MESSAGE.DEPARTMENT_IS_REQUIRED
    : departemntName.length < 2
    ? MESSAGE.WRITE_MORE_THAN_TWO_CHARACTERS
    : "";

export const validateDepartmentCode = (designationCode: string): string =>
  !designationCode
    ? MESSAGE.DEPARTMENT_CODE_IS_REQUIRED
    : designationCode.trim().length < 2
    ? MESSAGE.DEPARTMENT_CODE_TOO_SHORT
    : "";
export const validateDesignationName = (designationName: string): string =>
  !designationName
    ? MESSAGE.DESIGNATION_IS_REQUIRED
    : designationName.length < 2
    ? MESSAGE.WRITE_MORE_THAN_TWO_CHARACTERS
    : "";

export const validateDesignationCode = (designationCode: string): string =>
  !designationCode
    ? MESSAGE.DESIGNATION_CODE_IS_REQUIRED
    : designationCode.trim().length < 2
    ? MESSAGE.DESIGNATION_CODE_TOO_SHORT
    : "";

export const validateItemName = (itemName: string): string =>
  !itemName
    ? MESSAGE.ITEM_NAME_IS_REQUIRED
    : itemName.length < 2
    ? MESSAGE.WRITE_MORE_THAN_TWO_CHARACTERS
    : "";

export const validateCountryCode = (countryCode: string): string =>
  !countryCode
    ? MESSAGE.COUNTRY_CODE_IS_REQUIRED
    : !/^[A-Z]{2,3}$/.test(countryCode)
    ? MESSAGE.VALID_COUNTRY_CODE
    : "";

export const validateCountryName = (countryName: string): string =>
  !countryName
    ? MESSAGE.COUNTRY_NAME_IS_REQUIRED
    : countryName.trim().length < 4
    ? MESSAGE.COUNTRY_NAME_TOO_SHORT
    : "";

export const validateStateCode = (stateCode: string): string =>
  !stateCode
    ? MESSAGE.STATE_CODE_IS_REQUIRED
    : !/^[A-Za-z]{2}$/.test(stateCode)
    ? MESSAGE.VALID_STATE_CODE
    : "";

export const validateStateName = (stateName: string): string =>
  !stateName
    ? MESSAGE.STATE_NAME_IS_REQUIRED
    : stateName.trim().length < 4
    ? MESSAGE.STATE_NAME_TOO_SHORT
    : "";

export const validateCityName = (cityName: string): string =>
  !cityName
    ? MESSAGE.CITY_IS_REQUIRED
    : cityName.trim().length < 2
    ? MESSAGE.CITY_NAME_TOO_SHORT
    : "";

export const validateCityCode = (cityCode: string): string =>
  !cityCode
    ? MESSAGE.CITY_CODE_IS_REQUIRED
    : cityCode.length < 2
    ? MESSAGE.VALID_CITY_CODE
    : "";

export const validateItemCode = (itemCode: string): string =>
  !itemCode
    ? MESSAGE.ITEM_CODE_IS_REQUIRED
    : itemCode.trim().length < 2
    ? MESSAGE.ITEM_CODE_TOO_SHORT
    : "";
export const validateUomCode = (UOMCode: string): string =>
  !UOMCode
    ? MESSAGE.UOM_CODE_IS_REQUIRED
    : UOMCode.trim().length < 2
    ? MESSAGE.UOM_CODE_IS_TOO_SHORT
    : "";
export const validateUomName = (UOMName: string): string =>
  !UOMName
    ? MESSAGE.UOM_NAME_IS_REQUIRED
    : UOMName.trim().length < 2
    ? MESSAGE.UOM_NAME_TOO_SHORT
    : "";

// export const companyOptions = [
//   { label: "Google", value: "google" },
//   { label: "Microsoft", value: "microsoft" },
//   { label: "Amazon", value: "amazon" },
// ];

type ToastType = "success" | "info" | "warning" | "error";

interface ShowToastParams {
  type: ToastType;
  message: string;
  duration?: number;
}

export const showToast = ({
  type,
  message,
  duration = 3000,
}: ShowToastParams): void => {
  toast(message, {
    duration,
    description: "", // you can customize per use case
    className:
      type === "success"
        ? "bg-green-500 text-white"
        : type === "error"
        ? "bg-red-500 text-white"
        : type === "warning"
        ? "bg-yellow-500 text-black"
        : "bg-blue-500 text-white",
  });
};
