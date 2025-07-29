import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import React from "react";
import {
  GridComponent,
  Inject,
  Filter,
  ColumnsDirective,
  ColumnDirective,
  Sort,
  Page,
  Edit,
  CommandColumn,
  InfiniteScroll,
  CommandModel,
} from "@syncfusion/ej2-react-grids";
import { Plus } from "lucide-react";
import { DatePickerFloatLabel } from "@/components/common/currentDatePicker";
const columnSizeData = [
  { text: "1", value: "1" },
  { text: "2", value: "2" },
  { text: "3", value: "3" },
  { text: "4", value: "4" },
  { text: "5", value: "5" },
  { text: "6", value: "6" },
  { text: "7", value: "7" },
  { text: "8", value: "8" },
  { text: "9", value: "9" },
  { text: "10", value: "10" },
  { text: "11", value: "11" },
  { text: "12", value: "12" },
];

const buttonVariants = [
  {
    text: "primary",
    value: "bg-blue-600 text-white hover:bg-blue-700",
  },
  {
    text: "secondary",
    value: "bg-gray-600 text-white hover:bg-gray-700",
  },
  {
    text: "success",
    value: "bg-green-600 text-white hover:bg-green-700",
  },
  {
    text: "danger",
    value: "bg-red-600 text-white hover:bg-red-700",
  },
  {
    text: "warning",
    value: "bg-yellow-500 text-black hover:bg-yellow-600",
  },
  {
    text: "info",
    value: "bg-teal-500 text-white hover:bg-teal-600",
  },
  {
    text: "light",
    value: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",
  },
  {
    text: "dark",
    value: "bg-gray-900 text-white hover:bg-black",
  },
  {
    text: "outline",
    value: "border border-gray-500 text-gray-700 hover:bg-gray-100",
  },
  {
    text: "ghost",
    value: "bg-transparent text-gray-700 hover:bg-gray-100",
  },
  {
    text: "link",
    value: "bg-transparent text-blue-600 underline hover:text-blue-800",
  },
  {
    text: "disabled",
    value: "bg-gray-300 text-gray-600 cursor-not-allowed",
  },
];

interface DynamicObject {
  [key: string]: any;
}

interface formFieldsTypes {
  placeholder: string;
  fieldId: string;
  name: string;
  dataSource: DynamicObject[];
  fieldName: string;
  columnSize: number;
  dropFields: DynamicObject;
  isMandatory: boolean;
  columns: DynamicObject[];
  uploadFiles: DynamicObject[];
  minDate?: Date;
  maxDate?: Date;
  buttonStyle?: string|undefined;
}
interface formDetailsProps {
  isFieldDetailPopup: boolean;
  handlePopupClose: () => void;
  startFields: formFieldsTypes;
  handleFieldChange: (
    field: string,
    event: string | boolean | Date | null
  ) => void;
  handleDetailSubmit: () => void;
  dropdownGridRef?: React.Ref<GridComponent>;
  tableGridRef?: React.Ref<GridComponent>;
  handleAddDropdwnOption: () => void;
  handleTableColumn: () => void;
}

export const FormDetailsPopup: React.FC<formDetailsProps> = ({
  isFieldDetailPopup,
  handlePopupClose,
  startFields,
  handleFieldChange,
  handleDetailSubmit,
  dropdownGridRef,
  tableGridRef,
  handleAddDropdwnOption,
  handleTableColumn,
}) => {
  const commands: CommandModel[] = [
    {
      type: "Delete",
      buttonOption: { cssClass: "e-flat", iconCss: "e-delete e-icons" },
    },
  ];
  return (
    <>
      <CustomDialog
        key="employeeDEtailsId"
        open={isFieldDetailPopup}
        onOpenChange={handlePopupClose}
        title="Enter Field Details"
        size="xl"
        footer={
          <div className="flex justify-end gap-2">
            <Button className="" onClick={handlePopupClose}>
              Go Back
            </Button>
            <Button
              className="editButtonEmployeeCss"
              onClick={() => handleDetailSubmit()}
            >
              Submit
            </Button>
          </div>
        }
      >
        {" "}
        <div className="grid grid-cols-1 gap-2">
          <div className="bg-white max-h-[500px] overflow-y-auto">
            <Row>
              <Col xl={3}>
                <SingleSelectDropdownFloat
                  id="columnSizeID"
                  options={columnSizeData}
                  placeholder="Select Column Size"
                  value={
                    startFields.columnSize
                      ? startFields.columnSize.toString()
                      : ""
                  }
                  label="Column Size"
                  fields={{ label: "text", value: "value" }}
                  onChange={(e) => handleFieldChange("columnSize", e)}
                  className="w-full"
                  error={""}
                />
              </Col>
              {startFields.fieldName !== "Table" && (
                <>
                  {" "}
                  <Col xl={3}>
                    <FloatingLabelInput
                      id="placeholder"
                      label="Placeholder"
                      name="placeholder"
                      value={startFields.placeholder}
                      onChange={(e) =>
                        handleFieldChange("placeholder", e.target.value)
                      }
                      error={""}
                    />
                  </Col>
                  <Col xl={3}>
                    <FloatingLabelInput
                      id="name"
                      label="Name"
                      name="name"
                      value={startFields.name}
                      onChange={(e) =>
                        handleFieldChange("name", e.target.value)
                      }
                      error={""}
                    />
                  </Col>
                  <Col xl={3}>
                    <Checkbox
                      id={"isMandatory"}
                      checked={startFields.isMandatory}
                      name={"isMandatory"}
                      label={"isMandatory"}
                      onCheckedChange={() =>
                        handleFieldChange(
                          "isMandatory",
                          !startFields.isMandatory
                        )
                      }
                    />
                  </Col>
                </>
              )}
            </Row>
            {startFields.fieldName === "Dropdown" && (
              <Row>
                <Col xl={12}>
                  <div className="bg-white rounded-lg shadow-md p-4 max-h-[550px] overflow-y-auto">
                    {/* Header with title and divider */}
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 whitespace-nowrap">
                        Enter Your Dropdown List
                      </h3>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Add Record button aligned right */}
                    <div className="flex justify-end mb-4">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition"
                        onClick={handleAddDropdwnOption}
                      >
                        <Plus className="w-5 h-5" />
                        Add Record
                      </Button>
                    </div>

                    {/* Grid Component */}
                    <GridComponent
                      id="dropdownOptionGrid_id"
                      key="dropdownOptionGrid_id"
                      cssClass="custom-grid"
                      enableHover={true}
                      rowHeight={28}
                      height="250px"
                      ref={dropdownGridRef}
                      dataSource={startFields.dataSource}
                      allowFiltering={true}
                      filterSettings={{ type: "Excel" }}
                      allowTextWrap={true}
                      allowSorting={true}
                      allowSelection={true}
                      allowPaging={false}
                      gridLines="Both"
                      editSettings={{
                        allowEditing: true,
                        allowAdding: true,
                        allowDeleting: true,
                        mode: "Batch",
                      }}
                      enableInfiniteScrolling={true}
                    >
                      <ColumnsDirective>
                        <ColumnDirective
                          field="seqNo"
                          headerText="Seq No"
                          allowEditing={true}
                          editType="numericEdit"
                          width="100"
                          allowFiltering={false}
                          isPrimaryKey={true}
                          visible={false}
                        />
                        <ColumnDirective
                          field="optionText"
                          headerText="Option Text"
                          allowEditing={true}
                          editType="stringedit"
                          width="220"
                        />
                        <ColumnDirective
                          field="optionValue"
                          headerText="Option Value"
                          width="220"
                          allowFiltering={true}
                          allowEditing={true}
                        />
                        <ColumnDirective
                          field="isActive"
                          headerText="Is Active"
                          displayAsCheckBox={true}
                          allowFiltering={false}
                          width="110"
                          textAlign="Center"
                          editType="booleanEdit"
                        />
                        <ColumnDirective
                          headerText="Delete"
                          commands={commands}
                          width="110"
                          textAlign="Center"
                          allowEditing={true}
                        />
                      </ColumnsDirective>
                      <Inject
                        services={[
                          Filter,
                          Sort,
                          Page,
                          Edit,
                          CommandColumn,
                          InfiniteScroll,
                        ]}
                      />
                    </GridComponent>
                  </div>
                </Col>
              </Row>
            )}

            <div
              style={{
                display: startFields.fieldName === "Table" ? "flex" : "none",
              }}
            >
              <Row>
                <Col xl={12}>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 whitespace-nowrap">
                      Enter Your Column Details
                    </h3>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                  <div className="flex justify-end mb-4">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition"
                      onClick={handleTableColumn}
                    >
                      <Plus className="w-5 h-5" />
                      Add Column
                    </Button>
                  </div>
                  <GridComponent
                    id="tableGridColumn_Id"
                    key="tableGridColumn_Id"
                    cssClass="custom-grid"
                    enableHover={true}
                    rowHeight={25}
                    // rowSelected={rowSelected}
                    height={"350px"}
                    dataSource={startFields.columns}
                    allowFiltering={true}
                    filterSettings={{ type: "Excel" }}
                    allowTextWrap={true}
                    // allowResizeToFit={true}
                    allowSorting={true}
                    ref={tableGridRef}
                    // SelectionMode="Row"
                    allowSelection={true}
                    allowPaging={false}
                    gridLines="Both"
                    editSettings={{
                      allowEditing: true,
                      allowAdding: true,
                      allowDeleting: true,
                      mode: "Batch",
                    }}
                    enableInfiniteScrolling={true}
                  >
                    <ColumnsDirective>
                      <ColumnDirective
                        field="id"
                        headerText="id"
                        allowEditing={true}
                        editType="numericEdit"
                        width={"100"}
                        allowFiltering={false}
                        isPrimaryKey={true}
                        visible={false}
                      />
                      <ColumnDirective
                        field="fieldName"
                        headerText="Field Name"
                        allowEditing={true}
                        // textAlign="center"
                        editType="stringedit"
                        width={"200"}
                      />
                      <ColumnDirective
                        field="displayName"
                        headerText="Display Name"
                        width={"200"}
                        // textAlign="center"
                        allowFiltering={true}
                        allowEditing={true}
                      />
                      <ColumnDirective
                        field="dataType"
                        headerText="Data Type"
                        allowFiltering={false}
                        allowEditing={true}
                        editType="dropdownedit"
                        // edit={dropdownData(FIELD_DATA_TYPE, {
                        //   text: "fieldtype",
                        //   value: "id",
                        // })}
                        type="string"
                        width={"150"}
                      />
                      <ColumnDirective
                        field="width"
                        headerText="Width"
                        width={"80"}
                        // textAlign="center"
                        allowFiltering={false}
                        allowEditing={true}
                        editType="numericEdit"
                      />
                      <ColumnDirective
                        field="isVisible"
                        headerText="Is Visible"
                        displayAsCheckBox={true}
                        allowFiltering={false}
                        width={"100"}
                        textAlign="Center"
                        editType="booleanEdit"
                      />
                      <ColumnDirective
                        field="allowEdit"
                        headerText="Allow Edit"
                        displayAsCheckBox={true}
                        allowFiltering={false}
                        width={"100"}
                        textAlign="Center"
                        editType="booleanEdit"
                      />
                      <ColumnDirective
                        field="isPrimaryKey"
                        headerText="Is Primary Value"
                        displayAsCheckBox={true}
                        allowFiltering={false}
                        width={"180"}
                        textAlign="Center"
                        editType="booleanEdit"
                      />
                      {/* <ColumnDirective
                                      headerText="Action"
                                      headerTemplate={addBtnTable}
                                      commands={commands}
                                      width={"100"}
                                      textAlign="Center"
                                      allowEditing={true}
                                    /> */}
                    </ColumnsDirective>
                    <Inject
                      services={[
                        Filter,
                        Sort,
                        Page,
                        Edit,
                        CommandColumn,
                        InfiniteScroll,
                      ]}
                    />
                  </GridComponent>
                </Col>
              </Row>
            </div>

            {startFields.fieldName === "Date Picker" && (
              <Row>
                <Col xl={3}>
                  <DatePickerFloatLabel
                    value={startFields.minDate ?? new Date()}
                    onChange={(e) => handleFieldChange("minDate", e)}
                    maxDate={new Date()}
                    label={"Start Date"}
                    clearable
                    id={"minDate"}
                    error={""}
                  />
                </Col>
                <Col xl={3}>
                  <DatePickerFloatLabel
                    value={startFields.minDate ?? new Date()}
                    onChange={(e) => handleFieldChange("maxDate", e)}
                    label={"End Date"}
                    clearable
                    id={"maxDate"}
                    error={""}
                  />
                </Col>
              </Row>
            )}
            {startFields.fieldName === "button" && (
              <Row>
                <Col xl={3}>
                  <SingleSelectDropdownFloat
                    id="buttonStyle"
                    options={buttonVariants}
                    placeholder="Select Button Style"
                    value={
                      startFields.buttonStyle ? startFields.buttonStyle : ""
                    }
                    label="Button Style"
                    fields={{ label: "text", value: "value" }}
                    onChange={(e) => handleFieldChange("buttonStyle", e)}
                    className="w-full"
                    error={""}
                  />
                </Col>
              </Row>
            )}
          </div>
        </div>
      </CustomDialog>
    </>
  );
};
