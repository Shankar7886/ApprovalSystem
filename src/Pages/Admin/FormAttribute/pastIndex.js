import React, { useState, useReducer, useRef } from "react";
import { RightSidebar } from "./formRightSidebar";
import { Row, Col, Table } from "reactstrap";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { sidebarFormData } from "./sidebarFormData";
import { HTML5Backend } from "react-dnd-html5-backend";
import TextBoxCompnonents from "../../../common/TextBox";
import { DropDownComponent } from "../../../common/DropDown";
import { FieldDetailPopup } from "./fieldDetailPopup";
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
import { FiEdit, FiTrash2 } from "react-icons/fi";
import SwitchComponents from "../../../common/SwitchComponent";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import { Calendars } from "../../../common/CalendarsCommon";
import { DatePicker } from "../../../common/DatePicker";

const ItemTypes = {
  sidebarData: "sidebarData",
  formFields: "formFields",
};

let formFields = {
  placeholder: "",
  fieldId: "",
  name: "",
  dataSource: [],
  fieldName: "",
  columnSize: "",
  dropFields: {},
  isMandatory: false,
  columns: [],
  uploadFiles: [],
};

let dropdownOptionSkelton = {
  seqNo: 0,
  optionText: "",
  optionValue: "",
  isActive: false,
};

const fieldsUpdateReducer = (state, action) => {
  switch (action.type) {
    case "add":
      let dropdownFieldsDataSource = [];
      let newFormFields = {
        ...formFields,
        fieldId: `${action.payload.id}-${Date.now()}`,
        fieldName: action.payload.fieldName,
        dataSource: [...dropdownFieldsDataSource],
      };
      return newFormFields;
    case "update":
      return action.payload;
    case "reset":
      return { ...formFields };
    default:
      return state;
  }
};

const FormBuilderUI = () => {
  const [droppedFields, setDroppedFields] = useReducer(fieldsUpdateReducer, {});
  const [structureFieldDetails, setDetailsStructureFields] = useState([]);
  const [error, setError] = useState({});
  const [isPopupOpen, setPopupOpen] = useState(false);
  const componentRef = useRef({
    dropdownGridRef: null,
    tableGridRef: null,
  });

  const [, drop] = useDrop({
    accept: [ItemTypes.sidebarData, ItemTypes.formFields],
    drop: (item) => {
      if (item.type == "sidebarData") {
        setDroppedFields({ type: "add", payload: item });
        setPopupOpen(true);
      }
    },
  });

  const onChange = (e, item) => {
    let name = e?.target?.name ?? e.element.id;
    setDroppedFields({
      type: "update",
      payload: {
        ...droppedFields,
        [name]: name === "isMandatory" ? !droppedFields.isMandatory : e.value,
      },
    });
  };

  const resetFormField = () => {
    setDroppedFields({ type: "reset" });
    setPopupOpen(false);
    setError({});
  };
 

  const validateFields = () => {
    const errors = {};
    const dataSourceErrors = [];
    const columnsErrors = [];

    const isEmpty = (value) =>
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0);

    const validateKey = (key, value) => {
      if (isEmpty(value)) {
        errors[key] = "Required";
      }
    };

    const validateBasicFields = () => {
      ["name", "placeholder", "columnSize"].forEach((key) =>
        validateKey(key, droppedFields[key])
      );
    };

    const validateGridRecords = (
      records,
      requiredKeys,
      errorList,
      errorMessageKey
    ) => {
      if (records.length === 0) {
        errors[errorMessageKey] = `Please add ${
          errorMessageKey === "dataSource"
            ? "options to dropdown"
            : "columns to table"
        }.`;
        return;
      }

      const isValid = records.every((item, index) => {
        const hasEmptyFields = requiredKeys.some((key) => isEmpty(item[key]));
        if (hasEmptyFields) {
          errorList.push({ index });
          return false;
        }
        return true;
      });

      if (!isValid) {
        errors[errorMessageKey] = "Please check fields are not empty.";
      }
    };

    const fieldType = droppedFields.fieldName;

    switch (fieldType) {
      case "Dropdown":
        validateBasicFields();
        const dropdownRecords =
          componentRef.current?.dropdownGridRef?.getBatchChanges()
            ?.addedRecords || [];
        validateGridRecords(
          dropdownRecords,
          ["optionText", "optionValue"],
          dataSourceErrors,
          "dataSource"
        );
        break;

      case "Table":
        validateKey("columnSize", droppedFields.columnSize);
        const tableRecords =
          componentRef.current?.tableGridRef?.getBatchChanges()?.addedRecords ||
          [];
        validateGridRecords(
          tableRecords,
          ["fieldName", "displayName", "dataType"],
          columnsErrors,
          "columns"
        );
        break;

      case "Text Input":
      case "Number Input":
        validateBasicFields();
        break;

      case "File Uploader":
        validateBasicFields();
        validateKey("uploadFiles", droppedFields.uploadFiles);
        break;

      case "Date Picker":
        validateBasicFields();
        validateKey("minDate", droppedFields.minDate);
        validateKey("maxDate", droppedFields.maxDate);
        break;

      case "Button":
      case "CheckBox":
        validateBasicFields();
        validateKey("onLabel", droppedFields.onLabel);
        validateKey("offLabel", droppedFields.offLabel);
        break;

      default:
        break;
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePopupSubmit = () => {
    if (!validateFields()) {
      return;
    }
    let newFields = [
      ...structureFieldDetails.filter(
        (val) => val.fieldId !== droppedFields.fieldId
      ),
    ];
    let copyDroppedFields = { ...droppedFields };
    if (droppedFields.fieldName === "Dropdown") {
      let dropDownDataSource =
        componentRef.current.dropdownGridRef.getBatchChanges().addedRecords ||
        [];
      copyDroppedFields.dataSource = dropDownDataSource;
    }
    if (droppedFields.fieldName === "Table") {
      let tableColumnData =
        componentRef.current.tableGridRef.getBatchChanges().addedRecords || [];
      copyDroppedFields.columns = tableColumnData;
    }
    newFields.push(copyDroppedFields);
    setDetailsStructureFields(newFields);
    setPopupOpen(false);
    setDroppedFields({ type: "reset" });
  };

  const handleAddDropdwnOption = () => {
    let dataSource =
      componentRef.current.dropdownGridRef.getBatchChanges().addedRecords || [];
    let maxCount = 1;
    if (dataSource.length > 0) {
      dataSource.forEach((element) => {
        if (element.seqNo >= maxCount) {
          maxCount = element.seqNo + 1;
        }
      });
    }
    componentRef.current.dropdownGridRef.addRecord({
      seqNo: maxCount,
      optionText: "",
      optionValue: "",
      isActive: false,
    });
  };

  const handleTableColumn = () => {
    let dataSource =
      componentRef.current.tableGridRef.getBatchChanges().addedRecords || [];
    let maxCount = 1;
    if (dataSource.length > 0) {
      dataSource.forEach((element) => {
        if (element.seqNo >= maxCount) {
          maxCount = element.seqNo + 1;
        }
      });
    }
    componentRef.current.tableGridRef.addRecord({
      id: maxCount,
      fieldName: "",
      displayName: "",
      dataType: "",
      isVisible: true,
      allowEdit: false,
      isPrimaryKey: false,
    });
  };

  const moveField = (dragIndex, hoverIndex) => {
    const updatedFields = [...structureFieldDetails];
    const [removed] = updatedFields.splice(dragIndex, 1);
    updatedFields.splice(hoverIndex, 0, removed);
    setDetailsStructureFields(updatedFields);
  };

  const handleEditField = (item) => {
    setDroppedFields({
      type: "update",
      payload: {
        ...item,
      },
    });
    setPopupOpen(true);
  };

  const handleDeleteField = (index) => {
    let newStrucctedData = [...structureFieldDetails];
    newStrucctedData.splice(index, 1);
    setDetailsStructureFields([...newStrucctedData]);
  };

  return (
    <div className="contentCSS">
      <Row>
        <Col
          xl={2}
          lg={3}
          md={4}
          sm={12}
          xs={12}
          className="rightSidebarWrapper"
        >
          <Row>
            <Col>
              <div className="rightSidebarHeader">Elements</div>
            </Col>
          </Row>
          <Table borderless responsive>
            <thead>
              {sidebarFormData &&
                sidebarFormData.map((val, index) => (
                  <RightSidebar
                    key={val.id}
                    fields={val}
                    ItemTypes={ItemTypes}
                    index={index}
                  />
                ))}
            </thead>
          </Table>
        </Col>

        <Col xl={10} lg={8} md={8} sm={12} xs={12}>
          <div
            ref={drop}
            className="rightSidebarWrapper"
            style={{ minHeight: "30rem" }}
          >
            <div className="contentCSS">
              <Row>
                <Col>
                  <div
                    className="rightSidebarHeader"
                    style={{ marginTop: "5px", marginBottom: "20px" }}
                  >
                    Preview
                  </div>
                </Col>
              </Row>
              <Row>
                {structureFieldDetails.length === 0 ? (
                  <div className="text-muted">Drop elements here...</div>
                ) : (
                  structureFieldDetails.map((field, index) => (
                    <DraggableField
                      key={field.fieldId}
                      index={index}
                      field={field}
                      moveField={moveField}
                      handleEditField={handleEditField}
                      handleDeleteField={handleDeleteField}
                    />
                  ))
                )}
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      <FieldDetailPopup
        isPopupOpen={isPopupOpen}
        setPopupOpen={setPopupOpen}
        onChange={onChange}
        droppedFields={droppedFields}
        resetFormField={resetFormField}
        handlePopupSubmit={handlePopupSubmit}
        dropdownGridRef={(g) => (componentRef.current.dropdownGridRef = g)}
        handleAddDropdwnOption={handleAddDropdwnOption}
        tableGridRef={(g) => (componentRef.current.tableGridRef = g)}
        handleTableColumn={handleTableColumn}
        error={error}
        setError={setError}
        // handleEditField={handleEditField}
      />
    </div>
  );
};

const DraggableField = ({
  field,
  index,
  moveField,
  handleEditField,
  handleDeleteField,
}) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.formFields,
    item: { type: ItemTypes.formFields, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Batch",
  };

  const [, drop] = useDrop({
    accept: ItemTypes.formFields,
    hover: (item, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  let component;
  switch (field.fieldName) {
    case "Text Input":
      component = (
        <TextBoxCompnonents
          placeholder={`${field.placeholder}${field.isMandatory ? "*" : ""}`}
          type="text"
          enabled={false}
        />
      );
      break;
    case "Number Input":
      component = (
        <TextBoxCompnonents
          placeholder={`${field.placeholder}${field.isMandatory ? "*" : ""}`}
          type="number"
          enabled={false}
        />
      );
      break;
    case "Dropdown":
      component = (
        <DropDownComponent
          placeholder={`${field.placeholder}${field.isMandatory ? "*" : ""}`}
          fields={{ text: "optionText", value: "optionValue" }}
          dataSources={field.dataSource}
          disabled={true}
        />
      );
      break;
    case "Table":
      component = (
        <GridComponent
          id="dropdownOPtionGrid_id"
          key="dropdownOPtionGrid_id"
          cssClass="custom-grid"
          enableHover={true}
          rowHeight={25}
          // rowSelected={rowSelected}
          height={"350px"}
          dataSource={field.dataSource}
          allowFiltering={true}
          filterSettings={{ type: "Excel" }}
          allowTextWrap={true}
          allowResizeToFit={true}
          allowSorting={true}
          //  ref={dropdownGridRef}
          SelectionMode="Row"
          allowSelection={true}
          allowPaging={true}
          gridLines="Both"
          editSettings={editOptions}
          enableInfiniteScrolling={true}
          disabled={true}
        >
          <ColumnsDirective>
            {Array.isArray(field.columns) &&
              field.columns.length > 0 &&
              field.columns.map((val) => (
                <ColumnDirective
                  field={val.fieldName}
                  headerText={val.displayName}
                  allowEditing={val.allowEdit ?? false}
                  type={val.dataType ?? "string"}
                  // editType="numericEdit"
                  width={val.width ?? "100"}
                  allowFiltering={false}
                  isPrimaryKey={val.isPrimaryKey ?? false}
                  visible={val.isVisible ?? false}
                />
              ))}
          </ColumnsDirective>
          <Inject
            services={[Filter, Sort, Page, Edit, CommandColumn, InfiniteScroll]}
          />
        </GridComponent>
      );
      break;
    case "Button":
      component = (
        <button className="btn btn-primary w-100">{field.placeholder}</button>
      );
      break;
    case "CheckBox":
      component = (
        <SwitchComponents
          label={`${field.placeholder}${field.isMandatory ? "*" : ""}`}
          id={field.placeholder}
          name={field.name}
          onLabel={field.onLabel}
          offLabel={field.offLabel}
        />
      );
      break;
    case "File Uploader":
      component = (
        <>
          <span className="ms-2">{`${field.placeholder}${
            field.isMandatory ? "*" : ""
          }`}</span>
          <UploaderComponent name={field.name} disabled={true} />
        </>
      );
      break;
    case "Date Picker":
      component = (
        <DatePicker
          minDate={field.minDate}
          maxDate={field.maxDate}
          placeholder={`${field.placeholder}${field.isMandatory ? "*" : ""}`}
          id={field.name}
          name={field.name}
        />
      );
      break;
    default:
      component = <div>Unknown field type</div>;
  }

  return (
    <Col xl={field.columnSize} lg={field.columnSize} md={6} xs={12} sm={12}>
      <div
        ref={(node) => {
          ref.current = node;
          drag(drop(node));
        }}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
          padding: "8px 0",
          position: "relative",
          // border: "1px solid #ddd",
          // borderRadius: "8px",
          paddingTop: "32px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "4px",
            right: "8px",
            display: "flex",
            gap: "8px",
            zIndex: 1,
          }}
        >
          <FiEdit
            onClick={() => handleEditField(field)}
            style={{ cursor: "pointer", color: "#007bff" }}
            title="Edit"
          />
          <FiTrash2
            onClick={() => handleDeleteField(index)}
            style={{ cursor: "pointer", color: "#dc3545" }}
            title="Delete"
          />
        </div>
        {component}
      </div>
    </Col>
  );
};

const FormBuilderUIType = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <FormBuilderUI />
    </DndProvider>
  );
};

export default FormBuilderUIType;
