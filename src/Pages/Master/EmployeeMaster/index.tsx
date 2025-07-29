import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  lazy,
  Suspense,
  useMemo,
} from "react";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import {
  fetchCity,
  fetchCountry,
  fetchDepartment,
  fetchDesignation,
  fetchEmployees,
  Employee,
  fetchState,
  EmployeeAddress,
} from "@/Store/features/Master/EmployeeMaster";
import EmployeeGrid from "./EmoloyeeGrid";
import Section from "@/components/common/Section";
import {
  submitEmployeePrsnlDtlApi,
  updateEmployeePrsnlDtlApi,
} from "@/services/Master/employeeMaster";
import { formatDateForApiCall } from "@/assets/util";
import { BlankErrorMsg } from "@/components/common/MessageList";
import { toast } from "sonner";

const ViewEmployeeDetails = lazy(() => import("./viewPopup"));
const NewEmployeePopup = lazy(() => import("./newEmployee"));
const AddressPopup = lazy(() => import("./AddressPopup"));

const initialState: Employee = {
  ID: 0,
  EmployeeCode: "",
  FirstName: "",
  LastName: "",
  Gender: "",
  DOB: "",
  DOJ: "",
  DepartmentID: 0,
  DesignationID: 0,
  IsActive: false,
  IsDeleted: false,
  Department: "",
  Designation: "",
};

export interface actualAddressData extends EmployeeAddress {
  stateName: string;
  cityName: string;
  countryName: string;
}

const employeeAddressState: actualAddressData[] = [
  {
    AddressID: 0,
    EmployeeID: 0,
    Address1: "",
    Address2: "",
    CityID: 0,
    StateID: 0,
    CountryID: 0,
    Pincode: "",
    Employee: "",
    stateName: "",
    cityName: "",
    countryName: "",
  },
];

export interface EmployeeFormData {
  employeeCode: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date | null;
  doj: Date | null;
  departmentID: string;
  designationID: string;
  isActive: boolean;
}

const initialFormState: EmployeeFormData = {
  employeeCode: "",
  firstName: "",
  lastName: "",
  gender: "",
  dob: null,
  doj: null,
  departmentID: "",
  designationID: "",
  isActive: true,
};

const editSettings = {
  allowEditing: true,
  allowDeleting: true,
  mode: "Batch",
};

const toolbarOptions = ["Search", "ExcelExport"];

type EmployeeRecord = {
  ID: number;
  EmployeeCode: string;
  FirstName: string;
  LastName: string;
  Gender: string;
  DOB: string;
  DOJ: string;
  DepartmentID: number;
  DesignationID: number;
  IsActive: boolean;
};

interface GridChanges {
  changedRecords?: EmployeeRecord[];
}

interface HandleChangeArgs {
  name: keyof EmployeeFormData;
  value: any;
}

interface AddressState {
  showPopup: boolean;
  showForm: boolean;
}

const EmployeeMaster: React.FC = () => {
  const gridRef = useRef<GridComponent | null>(null);
  const [viewValue, setViewValue] = useState<Employee>(initialState);
  const [openViewPopup, setViewPopup] = useState(false);
  const [openNewPopup, setNewPopup] = useState(false);
  const [formFields, setFormFields] =
    useState<EmployeeFormData>(initialFormState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showEdit, setShowEdit] = useState(false);
  const [showAddress, setShowAddress] = useState<AddressState>({
    showPopup: false,
    showForm: false,
  });
  const [addressValue, setAddressValue] =
    useState<actualAddressData[]>(employeeAddressState);

  const dispatch = useAppDispatch();
  const { data: employees } = useAppSelector((state) => state.employeeList);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchDepartment());
    dispatch(fetchDesignation());
  }, [dispatch]);

  const loadAddressData = useCallback(() => {
    dispatch(fetchCountry());
    dispatch(fetchState());
    dispatch(fetchCity());
  }, [dispatch]);

  const handleToolbarClick = useCallback((args: any) => {
    if (args?.item?.id === "unitmaster_id_excelexport") {
      gridRef.current?.excelExport();
    }
  }, []);

  const handleView = useCallback(
    (args: any) => {
      if (args.name === "location") {
        loadAddressData();
        getEmployeeAddress();
        setShowAddress({ showPopup: true, showForm: false });
      } else if (args.name === "view") {
        setViewValue(args.rowData);
        setViewPopup(true);
      }
    },
    [loadAddressData]
  );

  const handleCloseViewPopup = useCallback(() => {
    setViewPopup(false);
    setViewValue(initialState);
  }, []);

  const handleChange = useCallback(
    ({ name, value }: HandleChangeArgs) => {
      setFormFields((prev) => ({ ...prev, [name]: value }));
      if (formErrors[name]) {
        setFormErrors((prev) => ({
          ...prev,
          [name]: value ? "" : BlankErrorMsg,
        }));
      }
    },
    [formErrors]
  );

  const handleNewPopupOpen = useCallback(() => {
    setNewPopup(true);
  }, []);

  const handleNewPopupClose = useCallback(() => {
    setNewPopup(false);
  }, []);

  const validateForm = useCallback(() => {
    const requiredFields: (keyof EmployeeFormData)[] = [
      "firstName",
      "lastName",
      "employeeCode",
      "doj",
      "dob",
      "departmentID",
      "designationID",
      "gender",
    ];
    const errors: Record<string, string> = {};
    let isValid = true;

    for (const field of requiredFields) {
      if (!formFields[field]) {
        errors[field] = BlankErrorMsg;
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  }, [formFields]);

  const handleReset = useCallback(() => {
    setFormFields(initialFormState);
    setFormErrors({});
  }, []);

  const handleSubmit = useCallback(
    async (action: "submit" | "next") => {
      if (validateForm()) {
        const payload = {
          ...formFields,
          dob: formatDateForApiCall(formFields.dob),
          doj: formatDateForApiCall(formFields.doj),
        };

        try {
          const response = await submitEmployeePrsnlDtlApi(payload);
          if (response.IsSuccess) {
            toast.success(response.DisplayMessage);
            handleReset();
            if (action === "submit") handleNewPopupClose();
            dispatch(fetchEmployees());
          } else {
            toast.error(response.DisplayMessage || "Submission failed");
          }
        } catch (error: any) {
          console.error(error);
          toast.error("Error occurred", {
            description: error?.message || "Please try again.",
          });
        }
      }
    },
    [formFields, validateForm, handleReset, handleNewPopupClose, dispatch]
  );

  const handleUpdate = useCallback(async () => {
    const gridChanges = gridRef.current?.getBatchChanges() as GridChanges;
    const changedRecords = gridChanges?.changedRecords || [];

    if (!changedRecords.length) {
      toast.error("No Changes Found To Process");
      return;
    }

    try {
      const updatePromises = changedRecords.map((val) => {
        const payload = {
          employeeCode: val.EmployeeCode,
          firstName: val.FirstName,
          lastName: val.LastName,
          gender: val.Gender,
          dob: formatDateForApiCall(new Date(val.DOB)),
          doj: formatDateForApiCall(new Date(val.DOJ)),
          departmentID: val.DepartmentID,
          designationID: val.DesignationID,
          isActive: val.IsActive,
        };
        return updateEmployeePrsnlDtlApi(payload, val.ID);
      });

      const results = await Promise.all(updatePromises);
      const allSuccessful = results.every((res) => res.IsSuccess);

      allSuccessful
        ? toast.success("All changes saved successfully")
        : toast.error("Some updates failed");

      dispatch(fetchEmployees());
      setShowEdit(false);
    } catch (error: any) {
      console.error(error);
      toast.error("API Error occurred", {
        description: "Please try again later.",
      });
    }
  }, [dispatch]);

  const EmployeeGridMemoized = useMemo(() => {
    return (
      <EmployeeGrid
        employees={employees}
        gridRef={gridRef}
        editSettings={editSettings}
        handleToolbarClick={handleToolbarClick}
        toolbarOptions={toolbarOptions}
        handleView={handleView}
        setShowEdit={setShowEdit}
      />
    );
  }, [employees, handleToolbarClick, handleView]);

  const getEmployeeAddress = () => {
    const res1 = [
      {
        AddressID: 8,
        EmployeeID: 20,
        Address1: "f/147 Sudershan park",
        Address2: "moti nagar",
        CityID: 5,
        StateID: 1,
        CountryID: 6,
        Pincode: "110015",
        Employee: "",
        cityName: "",
        stateName: "",
        countryName: "",
      },
      {
        AddressID: 9,
        EmployeeID: 20,
        Address1: "f/146 Sudershan park",
        Address2: "moti nagar",
        CityID: 5,
        StateID: 1,
        CountryID: 6,
        Pincode: "110015",
        Employee: "",
        cityName: "",
        stateName: "",
        countryName: "",
      },
      {
        AddressID: 11,
        EmployeeID: 20,
        Address1: "f/14fs6 Sudershan park",
        Address2: "moti nagar",
        CityID: 5,
        StateID: 1,
        CountryID: 6,
        Pincode: "110015",
        Employee: "",
        cityName: "",
        stateName: "",
        countryName: "",
      },
      {
        AddressID: 12,
        EmployeeID: 20,
        Address1: "f/14scsdfs6 Sudershan park",
        Address2: "moti nagar",
        CityID: 5,
        StateID: 1,
        CountryID: 6,
        Pincode: "110015",
        Employee: "",
        cityName: "",
        stateName: "",
        countryName: "",
      },
      {
        AddressID: 14,
        EmployeeID: 20,
        Address1: "f Sudershan park",
        Address2: "moti nagar",
        CityID: 5,
        StateID: 1,
        CountryID: 6,
        Pincode: "110015",
        Employee: "",
        cityName: "",
        stateName: "",
        countryName: "",
      },
      {
        AddressID: 15,
        EmployeeID: 20,
        Address1: "Sudershan park",
        Address2: "moti nagar",
        CityID: 5,
        StateID: 1,
        CountryID: 6,
        Pincode: "110015",
        Employee: "",
        cityName: "",
        stateName: "",
        countryName: "",
      },
      {
        AddressID: 16,
        EmployeeID: 20,
        Address1: "park",
        Address2: "moti nagar",
        CityID: 5,
        StateID: 1,
        CountryID: 6,
        Pincode: "110015",
        Employee: "",
        cityName: "",
        stateName: "",
        countryName: "",
      },
      {
        AddressID: 17,
        EmployeeID: 20,
        Address1: "vcvsdkjc",
        Address2: "moti nagar",
        CityID: 5,
        StateID: 1,
        CountryID: 6,
        Pincode: "110015",
        Employee: "",
        cityName: "",
        stateName: "",
        countryName: "",
      },
    ];

    setAddressValue([...res1]);
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          className="newRecordButtonCSS"
          onClick={handleNewPopupOpen}
        >
          <Plus /> Add New Employee
        </Button>
      </div>
      <Section>
        {EmployeeGridMemoized}

        {showEdit && (
          <div className="flex justify-end mt-2">
            <Button
              variant="outline"
              className="saveButtonCss"
              onClick={handleUpdate}
            >
              <Save /> Update Your Changes
            </Button>
          </div>
        )}

        <Suspense fallback={<div>Loading View...</div>}>
          {openViewPopup && (
            <ViewEmployeeDetails
              viewValue={viewValue}
              openViewPopup={openViewPopup}
              handlePopup={handleCloseViewPopup}
            />
          )}
        </Suspense>

        <Suspense fallback={<div>Loading Form...</div>}>
          {openNewPopup && (
            <NewEmployeePopup
              handleChange={handleChange}
              formFields={formFields}
              openNewPopup={openNewPopup}
              handleNewPopupClose={handleNewPopupClose}
              handleSubmit={handleSubmit}
              formErrors={formErrors}
            />
          )}
        </Suspense>

        <Suspense fallback={<div>Loading Address...</div>}>
          {showAddress.showPopup && (
            <AddressPopup
              showPopup={showAddress.showPopup}
              showForm={showAddress.showForm}
              handleClose={() =>
                setShowAddress((prev) => ({ ...prev, showPopup: false }))
              }
              addressDetails={addressValue}
            />
          )}
        </Suspense>
      </Section>
    </>
  );
};

export default React.memo(EmployeeMaster);
