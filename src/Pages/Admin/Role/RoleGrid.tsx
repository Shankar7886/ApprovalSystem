import Col from "@/components/common/Col";
import Row from "@/components/common/Row";
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

  Freeze,
} from "@syncfusion/ej2-react-grids";
// import {
//   Tooltip,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/shadcn-ui/tooltip";
// import { Eye } from "lucide-react";

export const RoleDetailGrid: React.FC = () => {
  // const actionTemplate = (rowData: any) => {
  //   return (
  //     <TooltipProvider>
  //       <div className="flex gap-4">
  //         {/* View Record Button with Tooltip */}
  //         <Tooltip>
  //           <TooltipTrigger asChild>
  //             <button className=" p-2 " style={{ cursor: "pointer" }}>
  //               <Eye className="h-5 w-5 text-blue-600" />
  //             </button>
  //           </TooltipTrigger>
  //         </Tooltip>
  //       </div>
  //     </TooltipProvider>
  //   );
  // };
  return (
    <>
      <Row>
        <Col xl={12}>
          <GridComponent
            id="employeeMasterGrid_id"
            dataSource={[
              {
                formid: 2,
                create: true,
                alter: true,
                view: true,
                approved: true,
                rejected: true,
                import: true,
                export: true,
                delete: true,
                menuName: "Designation",
              },
              {
                formid: 24,
                create: true,
                alter: true,
                view: true,
                approved: true,
                rejected: true,
                import: true,
                export: true,
                delete: true,
                menuName: "Department",
              },
              {
                formid: 25,
                create: true,
                alter: true,
                view: true,
                approved: true,
                rejected: true,
                import: true,
                export: true,
                delete: true,
                menuName: "Location",
              },
            ]}
            allowPaging={true}
            allowSorting={true}
            allowFiltering={true}
            allowExcelExport={true}
            allowSelection={true}
            toolbar={["Search", "ExcelExport"]}
            // toolbarClick={handleToolbarClick}
            filterSettings={{ type: "Excel" }}
            editSettings={{
              allowEditing: true,
              allowDeleting: true,
              mode: "Batch",
            }}
            // ref={gridRef}
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
            // cellSaved={() => setShowEdit(true)}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="Select"
                headerText="Select"
                type="checkbox"
                width={50}
                allowEditing={false}
                allowFiltering={false}
                allowSorting={false}
              />
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
                field="formid"
                isPrimaryKey={true}
                visible={false}
                headerText="Menu ID"
                width={0}
              />
              <ColumnDirective
                field="menuName"
                headerText="Menu Name"
                width={180}
                allowEditing={false}
              />
              <ColumnDirective
                field="create"
                headerText="Create"
                type="boolean"
                displayAsCheckBox={true}
                width="120"
                editType="booleanedit"
                allowFiltering={false}
              />
              <ColumnDirective
                field="alter"
                headerText="Alter"
                type="boolean"
                displayAsCheckBox={true}
                width="120"
                editType="booleanedit"
                allowFiltering={false}
              />
              <ColumnDirective
                field="view"
                headerText="View"
                type="boolean"
                displayAsCheckBox={true}
                width="100"
                editType="booleanedit"
                allowFiltering={false}
              />
              <ColumnDirective
                field="approved"
                headerText="Approved"
                type="boolean"
                displayAsCheckBox={true}
                width="140"
                editType="booleanedit"
                allowFiltering={false}
              />
              <ColumnDirective
                field="rejected"
                headerText="Rejected"
                type="boolean"
                displayAsCheckBox={true}
                width="120"
                editType="booleanedit"
                allowFiltering={false}
              />
              <ColumnDirective
                field="import"
                headerText="Import"
                type="boolean"
                displayAsCheckBox={true}
                width="120"
                editType="booleanedit"
                allowFiltering={false}
              />
              <ColumnDirective
                field="export"
                headerText="Export"
                type="boolean"
                displayAsCheckBox={true}
                width="120"
                editType="booleanedit"
                allowFiltering={false}
              />
              <ColumnDirective
                field="delete"
                headerText="Delete"
                type="boolean"
                displayAsCheckBox={true}
                width="120"
                editType="booleanedit"
                allowFiltering={false}
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
        </Col>
      </Row>
    </>
  );
};
