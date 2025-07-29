import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import TextBoxCompnonents from "../../../common/TextBox";
import SwitchComponents from "../../../common/SwitchComponent";
import { DropDownComponent } from "../../../common/DropDown";
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
} from "@syncfusion/ej2-react-grids";
import { FaPlusSquare } from "react-icons/fa";
import { MultipleSelectComponent } from "../../../common/MultipleSelect";
import { DatePicker } from "../../../common/DatePicker";
import { DataManager, Query } from "@syncfusion/ej2-data";
import {
  regex_alphaNumericOnly,
  regex_lettersOnlyNoSpace,
} from "../../../common/Constants";

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
const uploadFileCategories = [
  // "All",
  "Document",
  "Spreadsheet",
  "Presentation",
  "Image",
  "Audio",
  "Video",
  "Compressed Archive",
  "Code / Markup",
  "Executable / Installer",
];

export const FieldDetailPopup = ({
  isPopupOpen,
  setPopupOpen,
  droppedFields,
  onChange,
  resetFormField,
  handlePopupSubmit,
  dropdownGridRef,
  handleAddDropdwnOption,
  tableGridRef,
  handleTableColumn,
  error,
  setError,
}) => {
  const editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Batch",
  };
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  };

  const textStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  };

  const lineStyle = {
    flex: 1,
    height: "1px",
    backgroundColor: "#ccc",
  };

  const FIELD_DATA_TYPE = [
    { id: "string", fieldtype: "String" },
    { id: "decimal", fieldtype: "Decimal" },
    { id: "number", fieldtype: "Number" },
    { id: "date", fieldtype: "Date" },
    { id: "boolean", fieldtype: "Boolean" },
  ];

  const dropdownData = (array, fields) => {
    return {
      params: {
        dataSource: new DataManager(array),
        fields: fields,
        query: new Query(),
        allowFiltering: true,
      },
    };
  };

  const addBtn = () => {
    return (
      <FaPlusSquare
        className="text-success pointer"
        style={{ height: "25px", width: "25px" }}
        onClick={() => {
          handleAddDropdwnOption();
          if (error["dataSource"]) {
            setError((prevErrors) => ({
              ...prevErrors,
              ["dataSource"]: "",
            }));
          }
        }}
      />
    );
  };
  const addBtnTable = () => {
    return (
      <FaPlusSquare
        className="text-success pointer"
        style={{ height: "25px", width: "25px" }}
        onClick={() => {
          handleTableColumn();
          if (error["columns"]) {
            setError((prevErrors) => ({
              ...prevErrors,
              ["columns"]: "",
            }));
          }
        }}
        // onClick={()=>console.log("djbdk")}
      />
    );
  };

  const commands = [
    {
      type: "Delete",
      buttonOption: { cssClass: "e-flat", iconCss: "e-delete e-icons" },
    },
  ];

  return (
    <Modal isOpen={isPopupOpen} size="xl" centered={true}>
      <ModalHeader toggle={() => resetFormField()}>
        <div
          style={{
            fontWeight: "600",
            fontSize: "18px",
            color: "#333",
            padding: "8px 0",

            fontFamily: "Segoe UI, Roboto, sans-serif",
          }}
        >
          Enter the detail layout of the
          {droppedFields && droppedFields.fieldName}
        </div>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col xl={3} lg={3} md={6} sm={12} xs={12}>
            <DropDownComponent
              itemId={"columnSize"}
              fields={{ text: "text", value: "value" }}
              dataSources={columnSizeData}
              keyValue={"columnSize"}
              placeholder={"Column Size"}
              showDropDownIcon={true}
              popupHeight={"300px"}
              handleChange={(e) => {
                onChange(e, droppedFields);
                if (error["columnSize"]) {
                  setError((prevErrors) => ({
                    ...prevErrors,
                    ["columnSize"]: "",
                  }));
                }
              }}
              value={droppedFields?.columnSize ?? ""}
              allowFiltering={true}
              error={error.columnSize}
            />
          </Col>
          {droppedFields.fieldName != "Table" && (
            <>
              <Col xl={3} lg={3} md={6} sm={12} xs={12}>
                <TextBoxCompnonents
                  name={"placeholder"}
                  type="text"
                  placeholder="Placeholder Name..."
                  enabled={true}
                  value={droppedFields?.placeholder ?? ""}
                  onChange={(e) => {
                    onChange(e, droppedFields);
                    if (error["placeholder"]) {
                      setError((prevErrors) => ({
                        ...prevErrors,
                        ["placeholder"]: "",
                      }));
                    }
                  }}
                  keyPressMethod={(e) => {
                    if (!regex_alphaNumericOnly.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  maxLength={50}
                  minLength={1}
                  error={error.placeholder}
                />
              </Col>
              <Col xl={3} lg={3} md={6} sm={12} xs={12}>
                <TextBoxCompnonents
                  name={"name"}
                  type="text"
                  value={droppedFields?.name ?? ""}
                  placeholder="Field Name..."
                  enabled={true}
                  onChange={(e) => {
                    onChange(e, droppedFields);
                    if (error["name"]) {
                      setError((prevErrors) => ({
                        ...prevErrors,
                        ["name"]: "",
                      }));
                    }
                  }}
                  keyPressMethod={(e) => {
                    if (!regex_lettersOnlyNoSpace.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  maxLength={20}
                  error={error.name}
                />
              </Col>
              <Col xl={3} lg={3} md={6} sm={12} xs={12}>
                <SwitchComponents
                  label={"isMandatory"}
                  id="isMandatory"
                  name="isMandatory"
                  onLabel={"Yes"}
                  offLabel={"No"}
                  checked={droppedFields.isMandatory}
                  onChange={(e) => {
                    onChange(e, droppedFields);
                    if (error["isMandatory"]) {
                      setError((prevErrors) => ({
                        ...prevErrors,
                        ["isMandatory"]: "",
                      }));
                    }
                  }}
                  error={error.isMandatory}
                />
              </Col>
            </>
          )}
          {droppedFields.fieldName == "CheckBox" && (
            <>
              <Col xl={3} lg={3} md={6} sm={12} xs={12}>
                <TextBoxCompnonents
                  name={"offLabel"}
                  type="text"
                  placeholder="offLabel Value"
                  enabled={true}
                  value={droppedFields?.offLabel ?? ""}
                  onChange={(e) => {
                    onChange(e, droppedFields);
                    if (error["offLabel"]) {
                      setError((prevErrors) => ({
                        ...prevErrors,
                        ["offLabel"]: "",
                      }));
                    }
                  }}
                  keyPressMethod={(e) => {
                    if (!regex_alphaNumericOnly.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  maxLength={10}
                  minLength={1}
                  error={error.offLabel}
                />
              </Col>
              <Col xl={3} lg={3} md={6} sm={12} xs={12}>
                <TextBoxCompnonents
                  name={"onLabel"}
                  type="text"
                  placeholder="onLabel Value"
                  enabled={true}
                  value={droppedFields?.onLabel ?? ""}
                  onChange={(e) => {
                    onChange(e, droppedFields);
                    if (error["onLabel"]) {
                      setError((prevErrors) => ({
                        ...prevErrors,
                        ["onLabel"]: "",
                      }));
                    }
                  }}
                  keyPressMethod={(e) => {
                    if (!regex_alphaNumericOnly.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  maxLength={10}
                  minLength={1}
                  error={error.onLabel}
                />
              </Col>
            </>
          )}
        </Row>
        <Row>
          <Col
            xl={3}
            lg={3}
            md={6}
            sm={12}
            xs={12}
            style={{
              marginTop: "1rem",
              display:
                droppedFields.fieldName == "File Uploader" ? "flex" : "none",
            }}
          >
            <MultipleSelectComponent
              itemId={"fileTypes"}
              keyValue={"fileTypes"}
              dataSources={uploadFileCategories}
              placeholder={"Select File Type"}
              showSelect={true}
              showDropDownIcon={true}
              filterBarPlaceholder={"Select File Type"}
              popupHeight={"300px"}
              allowFiltering={true}
              value={droppedFields?.fileTypes ?? []}
              handleChange={(e) => {
                onChange(e, droppedFields);
                if (error["uploadFiles"]) {
                  setError((prevErrors) => ({
                    ...prevErrors,
                    ["uploadFiles"]: "",
                  }));
                }
              }}
              error={error.uploadFiles}
            />
          </Col>
          <Col
            xl={3}
            lg={3}
            md={6}
            sm={12}
            xs={12}
            style={{
              display:
                droppedFields.fieldName == "Date Picker" ? "flex" : "none",
              marginTop: "1rem",
            }}
          >
            <div style={{ width: "100%" }}>
              <DatePicker
                dateId={"minDate"}
                dateName={"minDate"}
                placeholder="Min Date"
                error={error.minDate}
                handleDateChange={(e) => {
                  onChange(e, droppedFields);
                  if (error["minDate"]) {
                    setError((prevErrors) => ({
                      ...prevErrors,
                      ["minDate"]: "",
                    }));
                  }
                }}
              />
            </div>
          </Col>
          <Col
            xl={3}
            lg={3}
            md={6}
            sm={12}
            xs={12}
            style={{
              display:
                droppedFields.fieldName == "Date Picker" ? "flex" : "none",
              marginTop: "1rem",
            }}
          >
            <div style={{ width: "100%" }}>
              <DatePicker
                dateId={"maxDate"}
                dateName={"maxDate"}
                placeholder="Max Date"
                error={error.maxDate}
                handleDateChange={(e) => {
                  onChange(e, droppedFields);
                  if (error["maxDate"]) {
                    setError((prevErrors) => ({
                      ...prevErrors,
                      ["maxDate"]: "",
                    }));
                  }
                }}
              />
            </div>
          </Col>
        </Row>

        <Row
          style={{
            display: droppedFields.fieldName == "Dropdown" ? "flex" : "none",
          }}
        >
          <Col style={{ marginTop: "1rem" }}>
            <div style={containerStyle}>
              <span style={textStyle}>Enter Your Dropdown List</span>
              <div style={lineStyle}></div>
            </div>
            <GridComponent
              id="dropdownOPtionGrid_id"
              key="dropdownOPtionGrid_id"
              cssClass="custom-grid"
              enableHover={true}
              rowHeight={25}
              // rowSelected={rowSelected}
              height={"350px"}
              dataSource={droppedFields.dataSource}
              allowFiltering={true}
              filterSettings={{ type: "Excel" }}
              allowTextWrap={true}
              allowResizeToFit={true}
              allowSorting={true}
              ref={dropdownGridRef}
              SelectionMode="Row"
              allowSelection={true}
              allowPaging={false}
              gridLines="Both"
              editSettings={editOptions}
              enableInfiniteScrolling={true}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="seqNo"
                  headerText="Seq No"
                  allowEditing={true}
                  editType="numericEdit"
                  width={"100"}
                  allowFiltering={false}
                  isPrimaryKey={true}
                  visible={false}
                />
                <ColumnDirective
                  field="optionText"
                  headerText="Option Text"
                  allowEditing={true}
                  textAlign="center"
                  editType="stringedit"
                  width={"200"}
                />
                <ColumnDirective
                  field="optionValue"
                  headerText="Option Value"
                  width={"200"}
                  textAlign="center"
                  allowFiltering={true}
                  allowEditing={true}
                />
                <ColumnDirective
                  field="isActive"
                  headerText="Is Active"
                  displayAsCheckBox={true}
                  allowFiltering={false}
                  width={"100"}
                  textAlign="Center"
                  editType="booleanEdit"
                />
                <ColumnDirective
                  headerText="Action"
                  headerTemplate={addBtn}
                  commands={commands}
                  width={"100"}
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
            {error.dataSource && (
              <span className="validation-error-msg">{error.dataSource}</span>
            )}
          </Col>
        </Row>
        <Row
          style={{
            display: droppedFields.fieldName == "Table" ? "flex" : "none",
          }}
        >
          <Col style={{ marginTop: "1rem" }}>
            <div style={containerStyle}>
              <span style={textStyle}>Enter Your Column Details</span>
              <div style={lineStyle}></div>
            </div>
            <GridComponent
              id="tableGridColumn_Id"
              key="tableGridColumn_Id"
              cssClass="custom-grid"
              enableHover={true}
              rowHeight={25}
              // rowSelected={rowSelected}
              height={"350px"}
              dataSource={droppedFields.dataSource}
              allowFiltering={true}
              filterSettings={{ type: "Excel" }}
              allowTextWrap={true}
              allowResizeToFit={true}
              allowSorting={true}
              ref={tableGridRef}
              SelectionMode="Row"
              allowSelection={true}
              allowPaging={false}
              gridLines="Both"
              editSettings={editOptions}
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
                  textAlign="center"
                  editType="stringedit"
                  width={"200"}
                />
                <ColumnDirective
                  field="displayName"
                  headerText="Display Name"
                  width={"200"}
                  textAlign="center"
                  allowFiltering={true}
                  allowEditing={true}
                />
                <ColumnDirective
                  field="dataType"
                  headerText="Data Type"
                  allowFiltering={false}
                  allowEditing={true}
                  editType="dropdownedit"
                  edit={dropdownData(FIELD_DATA_TYPE, {
                    text: "fieldtype",
                    value: "id",
                  })}
                  type="string"
                  width={"150"}
                />
                <ColumnDirective
                  field="width"
                  headerText="Width"
                  width={"80"}
                  textAlign="center"
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
                  width={"100"}
                  textAlign="Center"
                  editType="booleanEdit"
                />
                <ColumnDirective
                  headerText="Action"
                  headerTemplate={addBtnTable}
                  commands={commands}
                  width={"100"}
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
            {error.columns && (
              <span className="validation-error-msg">{error.columns}</span>
            )}
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <div>
          <Button
            onClick={() => {
              resetFormField();
              setError({});
            }}
          >
            Go Back
          </Button>
          <Button
            color="primary"
            onClick={handlePopupSubmit}
            // onClick={() => {
            //   if (validateFields()) {
            //     handlePopupSubmit();
            //   }
            // }}
            style={{ marginLeft: "1rem" }}
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
