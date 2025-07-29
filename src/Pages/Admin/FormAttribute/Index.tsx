import React, { useState, useRef, useEffect } from "react";
import { RightSidebar } from "./rightSidebar";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Row from "@/components/common/Row";
import Col from "@/components/common/Col";
import {
  ColumnDirective,
  ColumnsDirective,
  CommandColumn,
  Edit,
  Filter,
  GridComponent,
  InfiniteScroll,
  Inject,
  Page,
  Selection,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";
import { Edit2, Menu, Trash } from "lucide-react";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { DatePickerFloatLabel } from "@/components/common/currentDatePicker";
import { FormDetailsPopup } from "./formDetailsPopup";
import { Button } from "@/components/shadcn-ui/button";

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
  buttonStyle?: string;
}

let intialStateFormFields: formFieldsTypes = {
  placeholder: "",
  fieldId: "",
  name: "",
  dataSource: [],
  fieldName: "",
  columnSize: 3,
  dropFields: {},
  isMandatory: false,
  columns: [],
  uploadFiles: [],
  minDate: new Date(),
  maxDate: new Date(),
  buttonStyle: "",
};

export const Index = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [isFieldDetailPopup, setFieldDtlPopupOpn] = useState<boolean>(false);
  const [finalFormFields, setFinalFormFiels] = useState<formFieldsTypes[]>([]);
  const [showDragged, setShowDragged] = useState<boolean>(true);
  const [startFields, setStartFields] = useState<formFieldsTypes>(
    intialStateFormFields
  );

  const componentRef = useRef<{
    dropdownGridRef: GridComponent | null;
    tableGridRef: GridComponent | null;
  }>({
    dropdownGridRef: null,
    tableGridRef: null,
  });

  const moveField = (dragIndex: number, hoverIndex: number) => {
    setFinalFormFiels((prevFields) => {
      const updated = [...prevFields];
      const [draggedItem] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, draggedItem);
      return updated;
    });
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: "FORM_FIELD",
    drop: (item: any) => {
      // If item already exists, don't add again (it's just a reorder)
      if ("index" in item) return;

      setStartFields((prev) => ({
        ...prev,
        fieldName: item.fieldName,
        fieldId: `${item.id}-${Date.now()}`,
        columnSize: item.fieldName == "Table" ? 12 : 3,
      }));
      setFieldDtlPopupOpn(true);
      // setShowDragged(false);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleFieldChange = (args: any, value: any) => {
    setStartFields((prev) => ({ ...prev, [args]: value }));
  };

  const handlePopupClose = () => {
    setFieldDtlPopupOpn(false);
  };

  const handleDetailSubmit = () => {
    const newFields: formFieldsTypes = JSON.parse(JSON.stringify(startFields));
    if (
      newFields.fieldName === "Dropdown" &&
      componentRef.current.dropdownGridRef
    ) {
      const gridInstance = componentRef.current.dropdownGridRef;
      type GridBatchChanges = {
        addedRecords: any[];
        changedRecords: any[];
        deletedRecords: any[];
      };

      const changes = gridInstance.getBatchChanges() as GridBatchChanges;
      const dataSource = changes.addedRecords || [];
      newFields.dataSource = dataSource;
    }

    if (newFields.fieldName === "Table" && componentRef.current.tableGridRef) {
      const gridInstance = componentRef.current.tableGridRef;
      type GridBatchChanges = {
        addedRecords: any[];
        changedRecords: any[];
        deletedRecords: any[];
      };

      const changes = gridInstance.getBatchChanges() as GridBatchChanges;
      const dataSource = changes.addedRecords || [];
      newFields.columns = dataSource;
    }

    let prevFields = JSON.parse(JSON.stringify(finalFormFields));
    const matchIndex = prevFields.findIndex(
      (prev: any) => prev.fieldId == newFields.fieldId
    );
    if (matchIndex == -1) {
      setFinalFormFiels((prev) => [...prev, newFields]);
    } else {
      prevFields[matchIndex] = startFields;
      setFinalFormFiels([...prevFields]);
    }

    setStartFields(intialStateFormFields);
    setFieldDtlPopupOpn(false);
    setShowDragged(false);
  };

  const handleAddDropdwnOption = () => {
    if (componentRef.current.dropdownGridRef) {
      const gridInstance = componentRef.current.dropdownGridRef;
      type GridBatchChanges = {
        addedRecords: any[];
        changedRecords: any[];
        deletedRecords: any[];
      };

      const changes = gridInstance.getBatchChanges() as GridBatchChanges;
      const dataSource = changes.addedRecords || [];

      let maxCount = 1;
      if (dataSource.length > 0) {
        dataSource.forEach((element) => {
          if (element.seqNo >= maxCount) {
            maxCount = element.seqNo + 1;
          }
        });
      }

      gridInstance.addRecord({
        seqNo: maxCount,
        optionText: "",
        optionValue: "",
        isActive: false,
      });
    }
  };

  const handleRightSidebarClose = () => {
    setShowSidebar(!showSidebar);
  };

  const handleFieldUpdate = (type: string, fieldId: string) => {
    let prevFields = JSON.parse(JSON.stringify(finalFormFields));
    const matchIndex = prevFields.findIndex(
      (prev: any) => prev.fieldId == fieldId
    );
    if (matchIndex > -1) {
      if (type === "delete") {
        prevFields.splice(matchIndex, 1);
        setFinalFormFiels(prevFields);
      }
      if (type === "update") {
        let filteredValue = prevFields[matchIndex];
        setStartFields(filteredValue);
        setFieldDtlPopupOpn(true);
      }
    }
  };

  useEffect(() => {
    if (isFieldDetailPopup) {
      if (
        componentRef.current.tableGridRef &&
        Array.isArray(startFields.columns) &&
        startFields.columns.length > 0
      ) {
        // console.log("val");
        startFields.columns.forEach((val: any) => {
          componentRef.current.tableGridRef?.addRecord(val);
        });
      }
    }
  }, [isFieldDetailPopup]);

  const handleTableColumn = () => {
    if (componentRef.current.tableGridRef) {
      const gridInstance = componentRef.current.tableGridRef;
      type GridBatchChanges = {
        addedRecords: any[];
        changedRecords: any[];
        deletedRecords: any[];
      };

      const changes = gridInstance.getBatchChanges() as GridBatchChanges;
      const dataSource = changes.addedRecords || [];

      let maxCount = 1;
      if (dataSource.length > 0) {
        dataSource.forEach((element) => {
          if (element.seqNo >= maxCount) {
            maxCount = element.seqNo + 1;
          }
        });
      }

      gridInstance.addRecord({
        id: maxCount,
        fieldName: "",
        displayName: "",
        dataType: "",
        isVisible: true,
        allowEdit: false,
        isPrimaryKey: false,
      });
    }
  };

  return (
    <>
      <div className="h-screen overflow-hidden" style={{ height: "90vh" }}>
        <div className="h-full overflow-y-auto bg-white rounded-xl p-4 shadow-sm border border-gray-200 w-full">
          <Row className="h-full">
            <Col xl={showSidebar ? 10 : 12}>
              <div
                className={`pr-4 h-[91.6667%] ${
                  showSidebar ? "border-r border-gray-300" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Preview</h2>
                  {!showSidebar && (
                    <Menu
                      className="w-5 h-5 text-gray-600 cursor-pointer"
                      onClick={handleRightSidebarClose}
                    />
                  )}
                </div>
                {dropRef(
                  <div className="h-full">
                    {showDragged ? (
                      <div
                        className={`w-full h-full rounded-2xl text-center flex justify-center items-center backdrop-blur-md ${
                          isOver
                            ? "border-2 border-dashed border-purple-600"
                            : "border-2 border-dashed border-transparent"
                        } bg-gray-200/40`}
                      >
                        <h1>Drop here</h1>
                      </div>
                    ) : (
                      <div className="flex flex-wrap -mx-2">
                        {finalFormFields.map((field, index) => (
                          <div
                            key={field.fieldId}
                            className={`px-2 mb-4`}
                            style={{
                              width: `${(field.columnSize / 12) * 100}%`,
                            }}
                          >
                            <DraggableElement
                              index={index}
                              moveField={moveField}
                              handleFieldUpdate={handleFieldUpdate}
                              {...field}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Col>
            {showSidebar && (
              <Col xl={2}>
                <RightSidebar
                  handleRightSidebarClose={handleRightSidebarClose}
                />
              </Col>
            )}
          </Row>
        </div>
      </div>
      <FormDetailsPopup
        isFieldDetailPopup={isFieldDetailPopup}
        handlePopupClose={handlePopupClose}
        startFields={startFields}
        handleFieldChange={handleFieldChange}
        handleDetailSubmit={handleDetailSubmit}
        dropdownGridRef={(g: GridComponent | null) => {
          componentRef.current.dropdownGridRef = g;
        }}
        tableGridRef={(g: GridComponent | null) => {
          componentRef.current.tableGridRef = g;
        }}
        handleAddDropdwnOption={handleAddDropdwnOption}
        handleTableColumn={handleTableColumn}
      />
    </>
  );
};

interface DraggableElementProps extends formFieldsTypes {
  index: number;
  moveField: (dragIndex: number, hoverIndex: number) => void;
  handleFieldUpdate: (name: string, fieldId: string) => void;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  index,
  moveField,
  fieldId,
  fieldName,
  placeholder,
  name,
  dataSource,
  // columnSize,
  // dropFields,
  // isMandatory,
  columns,
  buttonStyle,
  // uploadFiles,
  handleFieldUpdate,
}) => {
  console.log(buttonStyle);
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop({
    accept: "FORM_FIELD",
    hover(item: any, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === undefined || dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "FORM_FIELD",
    item: { index, id: fieldId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  let component;
  switch (fieldName) {
    case "Text Input":
      component = (
        <FloatingLabelInput
          id={fieldId}
          label={placeholder}
          name={name}
          value={""}
          onChange={() => console.log("")}
          error={""}
        />
      );
      break;
    case "Number Input":
      component = (
        <FloatingLabelInput
          id={fieldId}
          label={placeholder}
          name={name}
          value={""}
          onChange={() => console.log("")}
          error={""}
          // type1="number"
        />
      );
      break;
    case "Dropdown":
      component = (
        <SingleSelectDropdownFloat
          id="gender"
          options={dataSource}
          placeholder={`Select ${placeholder}`}
          value={""}
          label={placeholder}
          fields={{ label: "optionText", value: "optionValue" }}
          // onChange={}
          className="w-full"
          error={""}
        />
      );
      break;
    case "Table":
      component = (
        <GridComponent
          id={`${fieldId}formBuilderGrid`}
          key={`${fieldId}formBuilderGrid`}
          cssClass="custom-grid"
          enableHover={true}
          rowHeight={25}
          // rowSelected={rowSelected}
          height={"350px"}
          dataSource={dataSource}
          allowFiltering={true}
          filterSettings={{ type: "Excel" }}
          allowTextWrap={true}
          // allowResizeToFit={true}
          allowSorting={true}
          //  ref={dropdownGridRef}
          // SelectionMode="Row"
          allowSelection={true}
          allowPaging={true}
          gridLines="Both"
          editSettings={{
            allowEditing: true,
            allowAdding: true,
            allowDeleting: true,
            mode: "Batch",
          }}
          enableInfiniteScrolling={true}
          disabled={true}
        >
          <ColumnsDirective>
            {Array.isArray(columns) &&
              columns.length > 0 &&
              columns.map((val) => (
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
            services={[
              Filter,
              Sort,
              Page,
              Edit,
              CommandColumn,
              InfiniteScroll,
              Selection,
            ]}
          />
        </GridComponent>
      );
      break;
    case "Button":
      component = (
        <button className="btn btn-primary w-100">{placeholder}</button>
      );
      break;
    case "CheckBox":
      component = (
        <Checkbox
          id={fieldId}
          checked={true}
          name={name}
          label={placeholder}
          // onCheckedChange={(e) => setForm({ ...form, IsActive: !!e })}
        />
      );
      break;
    case "File Uploader":
      component = (
        <>
          <div className="w-full max-w-md space-y-2">
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              {placeholder}
            </label>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center cursor-pointer hover:border-blue-400 transition "
              style={{ fontSize: "15px" }}
            >
              <input type="file" name={name} disabled={true} />
            </div>
          </div>
        </>
      );
      break;
    case "Date Picker":
      component = (
        <DatePickerFloatLabel
          value={new Date()}
          onChange={() => console.log("")}
          maxDate={new Date()}
          label={placeholder}
          clearable
          id={fieldId}
          error={""}
        />
      );
      break;
    case "button":
      component = (
        <Button className={buttonStyle ? buttonStyle : ""}>
          {" "}
          {placeholder ?? ""}
        </Button>
      );
      break;
    case "Title":
      component = (
        <div className="flex items-center gap-4 mb-2">
          <h3 className="text-xl font-semibold text-gray-900 whitespace-nowrap">
            {placeholder}
          </h3>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      );
      break;
    default:
      component = <div>Unknown field type</div>;
  }

  return (
    <div
      ref={ref}
      className={`relative     p-3 w-full cursor-move transition-opacity duration-200 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Icon container in the top-right */}
      <div
        className="absolute  right-2 flex gap-2 z-10"
        style={{ top: "-10px" }}
      >
        <Edit2
          size={16}
          style={{ cursor: "pointer", color: "#007bff" }}
          onClick={() => handleFieldUpdate("update", fieldId)}
        />
        <Trash
          size={16}
          style={{ cursor: "pointer", color: "#dc3545" }}
          onClick={() => handleFieldUpdate("delete", fieldId)}
        />
      </div>

      {/* Component content */}
      {component}
    </div>
  );
};

const FormBuilderUIType = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Index />
    </DndProvider>
  );
};

export default FormBuilderUIType;
