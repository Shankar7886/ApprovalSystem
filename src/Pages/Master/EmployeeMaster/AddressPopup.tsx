import { CustomDialog } from "@/components/common/customPopup";
import { Button } from "@/components/shadcn-ui/button";
import React, { useState } from "react";
import { actualAddressData } from ".";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn-ui/accordion";
import { useAppSelector } from "@/Store/reduxhook";
import { Eye, PencilIcon } from "lucide-react";
import Row from "@/components/common/Row";
import Col from "@/components/common/Col";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";
import { Textarea } from "@/components/shadcn-ui/textarea";
import { FloatingLabelInput } from "@/components/common/InputComponent";

interface addressPopup {
  showPopup: boolean;
  showForm: boolean;
  handleClose: () => void;
  addressDetails: actualAddressData[];
}

const AddressPopup: React.FC<addressPopup> = ({
  showPopup,
  showForm,
  handleClose,
  addressDetails,
}) => {
  const countryList = useAppSelector((state) => state.employeeList.countryList);
  const stateList = useAppSelector((state) => state.employeeList.stateList);
  const cityList = useAppSelector((state) => state.employeeList.cityList);

  const [activeMode, setActiveMode] = useState<{
    [key: number]: "view" | "edit";
  }>({});

  return (
    <CustomDialog
      key="employeeAdressKeyid"
      open={showPopup}
      onOpenChange={handleClose}
      title="Employee Address"
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            className="newRecordButtonCSS px-6 py-2 font-medium"
            onClick={() => console.log("next")}
          >
            Add Address
          </Button>
          <Button
            className="saveButtonCss px-6 py-2 font-medium"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      }
    >
      <div className="p-2">
        <div
          className="bg-gradient-to-b from-gray-50 to-white rounded-lg p-4"
          style={{ overflowY: "auto" }}
        >
          <div className="max-h-[340px] ">
            <Accordion type="single" collapsible className="space-y-1">
              {addressDetails.length > 0 &&
                addressDetails.map((val, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-gray-200 rounded bg-white shadow-sm"
                  >
                    <AccordionTrigger className="px-3 py-2 hover:bg-gray-50 rounded-t">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-xs">
                            {index + 1}
                          </span>
                        </div>
                        <span className="font-semibold text-sm text-gray-800">
                          Address {index + 1}
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-0 pb-0">
                      <div className="flex justify-end gap-2 px-3 py-2 bg-gray-50 border-t">
                        {activeMode[index] === "edit" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 border-blue-300 hover:bg-blue-50"
                            onClick={() =>
                              setActiveMode((prev) => ({
                                ...prev,
                                [index]: "view",
                              }))
                            }
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        ) : (
                          <div className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded shadow-sm text-xs">
                            <Eye className="w-4 h-4" />
                            <span>View Mode</span>
                          </div>
                        )}
                        {activeMode[index] !== "edit" ? (
                          <Button
                            className="saveButtonCss"
                            size="sm"
                            onClick={() =>
                              setActiveMode((prev) => ({
                                ...prev,
                                [index]: "edit",
                              }))
                            }
                          >
                            <PencilIcon className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        ) : (
                          <div className="flex items-center gap-1 px-2 py-1 bg-purple-600 text-white rounded shadow-sm text-xs">
                            <PencilIcon className="w-4 h-4" />
                            <span>Edit Mode</span>
                          </div>
                        )}
                      </div>

                      {activeMode[index] === "edit" ? (
                        <div className="p-3 border-t text-sm">
                          <Row>
                            {/* <Col xl={3}>
                              <SingleSelectDropdownFloat
                                options={countryList}
                                placeholder="Select Country"
                                
                                label="Country"
                                fields={{ label: "CountryName", value: "id" }}
                                
                                className="w-full"
                                id={`countryID1${index}`}
                                key={`countryID1${index}`}
                              />
                            </Col> */}
                            <Col xl={3}>
                              <SingleSelectDropdownFloat
                                options={stateList}
                                placeholder="Select State"
                                value=""
                                label="State"
                                fields={{ label: "StateName", value: "ID" }}
                                // onChange={() => handleChange("jbvj")}
                                className="w-full"
                                id="stateId"
                              />
                            </Col>
                            <Col xl={3}>
                              <SingleSelectDropdownFloat
                                options={cityList}
                                placeholder="Select City"
                                value=""
                                label="City"
                                fields={{ label: "CityName", value: "id" }}
                                // onChange={() => handleChange("jbvj")}
                                className="w-full"
                                id="cityId"
                              />
                            </Col>
                            <Col xl={3}>
                              <FloatingLabelInput
                                id="ZipCode"
                                label="Zip Code"
                                name="ZipCode"
                                value={"Zip Code"}
                                // onChange={(e) => handleChange(e)}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col xl={6}>
                              <Textarea placeholder="Address Line 1" />
                            </Col>
                            <Col xl={6}>
                              <Textarea placeholder="Address Line 2" />
                            </Col>
                          </Row>
                        </div>
                      ) : (
                        <div className="p-3">
                          <div className="bg-white rounded border border-gray-100 p-3 shadow-sm text-sm">
                            <div className="space-y-2">
                              <div className="flex gap-3 pb-2 border-b border-gray-100">
                                <span className="min-w-24 text-gray-500">
                                  Address 1
                                </span>
                                <span className="font-medium text-gray-900">
                                  {val.Address1 || "-"}
                                </span>
                              </div>

                              <div className="flex gap-3 pb-2 border-b border-gray-100">
                                <span className="min-w-24 text-gray-500">
                                  Address 2
                                </span>
                                <span className="font-medium text-gray-900">
                                  {val.Address2 || "-"}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2 border-b border-gray-100">
                                <div className="flex gap-3">
                                  <span className="min-w-24 text-gray-500">
                                    Pin/Zip Code
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    {val.Pincode || "-"}
                                  </span>
                                </div>
                                <div className="flex gap-3">
                                  <span className="min-w-24 text-gray-500">
                                    City
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    {cityList.find(
                                      (item) => item.ID === val.CityID
                                    )?.CityName || "Unknown"}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex gap-3">
                                  <span className="min-w-24 text-gray-500">
                                    State
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    {stateList.find(
                                      (item) => item.ID === val.StateID
                                    )?.StateName || "Unknown"}
                                  </span>
                                </div>
                                <div className="flex gap-3">
                                  <span className="min-w-24 text-gray-500">
                                    Country
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    {countryList.find(
                                      (item) => item.ID === val.CountryID
                                    )?.CountryName || "Unknown"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>

            {showForm && (
              <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-lg">
                      +
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Add New Address
                  </h2>
                </div>
                {/* Place your address creation form here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </CustomDialog>
  );
};

export default AddressPopup;
