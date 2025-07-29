import React from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Sort,
  Filter,
  Toolbar,
  ExcelExport,
  CommandColumn,
  Edit as GridEdit,
  // CommandModel,
  Freeze,
} from "@syncfusion/ej2-react-grids";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { useAppSelector } from "@/Store/reduxhook";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn-ui/tooltip";
import { Eye, MapPin } from "lucide-react";
// import { TooltipContent } from "@radix-ui/react-tooltip";

interface gridinterface {
  employees: (string | number | boolean | object | Date)[];
  gridRef?: React.RefObject<GridComponent | null>; // CORRECTED TYPE
  handleToolbarClick: (args: any) => void;
  toolbarOptions: string[];
  editSettings: object;
  handleView: (args: any) => void;
  setShowEdit: (args: boolean) => void;
}

const EmployeeGrid: React.FC<gridinterface> = ({
  employees,
  gridRef,
  handleToolbarClick,
  toolbarOptions,
  editSettings,
  handleView,
  setShowEdit,
}) => {
  const designationList = useAppSelector(
    (state) => state.employeeList.designationlist
  );
  const departmentList = useAppSelector(
    (state) => state.employeeList.departmentList
  );
  // const commands: CommandModel[] = [
  //   {
  //     buttonOption: {
  //       cssClass: "e-flat e-view",
  //       iconCss: "e-icons e-eye",
  //     },
  //   },
  //   {
  //     buttonOption: {
  //       cssClass: "e-flat e-add-location", // flat button with add location styling
  //       iconCss: "e-icons e-add-location", // location add icon (syncfusion icon set or use custom)
  //       content: "", // icon only, no text
  //     },
  //     // tooltip on hover
  //   },
  // ];

  const genderParams = {
    params: {
      actionComplete: () => false,
      dataSource: new DataManager([
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
      ]),
      fields: { text: "label", value: "value" },
      query: new Query(),
    },
  };
  const designationParams = {
    params: {
      actionComplete: () => false,
      dataSource: new DataManager(designationList || []),
      fields: { text: "DesignationName", value: "ID" },
      query: new Query(),
      allowFiltering: true,
    },
  };
  const departmentParams = {
    params: {
      actionComplete: () => false,
      dataSource: new DataManager(departmentList || []),
      fields: { text: "DepartmentName", value: "ID" },
      query: new Query(),
      allowFiltering: true,
    },
  };

  const actionTemplate = (rowData: any) => {
    return (
      <TooltipProvider>
        <div className="flex gap-4">
          {/* View Record Button with Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className=" p-2 "
                style={{ cursor: "pointer" }}
                onClick={() => handleView({ name: "view", rowData: rowData })}
              >
                <Eye className="h-5 w-5 text-blue-600" />
              </button>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className=" p-2  "
                style={{ cursor: "pointer" }}
                onClick={() =>
                  handleView({ name: "location", rowData: rowData })
                }
              >
                <MapPin className="h-5 w-5 text-green-600" />
              </button>
            </TooltipTrigger>
          </Tooltip>
        </div>
      </TooltipProvider>
    );
  };

  return (
    <>
      {designationList.length > 0 && departmentList.length > 0 ? (
        <GridComponent
          id="employeeMasterGrid_id"
          dataSource={employees}
          allowPaging={true}
          allowSorting={true}
          allowFiltering={true}
          allowExcelExport={true}
          allowSelection={true}
          toolbar={toolbarOptions}
          toolbarClick={handleToolbarClick}
          filterSettings={{ type: "Excel" }}
          editSettings={editSettings}
          ref={gridRef}
          pageSettings={{
            pageSize: 15,
            pageSizes: ["5", "10", "15", "20", "All"],
          }}
          rowHeight={30}
          enableHover={true}
          gridLines="Both"
          cssClass="custom-grid"
          frozenColumns={1}
          height={"400px"}
          cellSaved={() => setShowEdit(true)}
        >
          <ColumnsDirective>
            <ColumnDirective
              headerText="S.No"
              width={"80"}
              template={(props: any) => Number(props.index) + 1}
              textAlign="Center"
              allowFiltering={false}
              allowSorting={false}
              allowEditing={false}
            />
            <ColumnDirective
              field="ID"
              headerText="ID"
              visible={false}
              isPrimaryKey={false}
              width="80"
            />
            <ColumnDirective
              field="EmployeeCode"
              headerText="Employee Code"
              width="200"
              allowEditing={false}
            />
            <ColumnDirective
              field="FirstName"
              headerText="First Name"
              width="180"
              allowSorting={true}
            />
            <ColumnDirective
              field="LastName"
              headerText="Last Name"
              width="180"
              allowSorting={true}
            />
            <ColumnDirective
              field="Gender"
              headerText="Gender"
              width="150"
              editType="dropdownedit"
              edit={genderParams}
              validationRules={{ required: true }}
              allowEditing={true}
              allowSorting={true}
            />
            <ColumnDirective
              field="DOB"
              headerText="D.O.B"
              type="date"
              format="yMd"
              width="140"
              allowSorting={true}
            />
            <ColumnDirective
              field="DOJ"
              headerText="Date of Joining"
              type="date"
              format="yMd"
              width="190"
              allowSorting={true}
            />
            <ColumnDirective
              field="DepartmentID"
              headerText="Department"
              width="200"
              editType="dropdownedit"
              edit={departmentParams}
              validationRules={{ required: true }}
              allowEditing={true}
              valueAccessor={(
                field: string,
                data: Record<string, any>
              ): string => {
                const department = departmentList.find(
                  (dep) => dep.ID === data[field]
                );
                return department?.DepartmentName ?? "";
              }}
              allowSorting={true}
            />
            <ColumnDirective
              field="DesignationID"
              headerText="Designation"
              width="200"
              editType="dropdownedit"
              edit={designationParams}
              validationRules={{ required: true }}
              allowEditing={true}
              allowSorting={true}
              valueAccessor={(
                field: string,
                data: Record<string, any>
              ): string => {
                const department = designationList.find(
                  (dep) => dep.ID === data[field]
                );
                return department?.DesignationName ?? "";
              }}
            />
            <ColumnDirective
              field="IsActive"
              headerText="Active"
              type="boolean"
              displayAsCheckBox={true}
              width="150"
              editType="booleanedit"
              allowFiltering={false}
              allowSorting={true}
            />
            <ColumnDirective
              field="IsDeleted"
              headerText="Deleted"
              type="boolean"
              width="100"
              visible={false}
            />
            {/* <ColumnDirective
              headerText="Actions"
              width="150"
              commands={commands}
              freeze="Right"
            /> */}
            <ColumnDirective
              headerText="Actions"
              template={actionTemplate}
              width="150"
              freeze="Right"
            />
          </ColumnsDirective>
          <Inject
            services={[
              Page,
              Sort,
              Filter,
              Toolbar,
              ExcelExport,
              GridEdit,
              CommandColumn,
              Freeze,
            ]}
          />
        </GridComponent>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default EmployeeGrid;
