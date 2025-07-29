import {
  ColumnDirective,
  ColumnsDirective,
  CommandModel,
  CommandColumn,
  Edit as GridEdit,
  Filter,
  GridComponent,
  Inject,
  Page,
  Toolbar,
  ExcelExport,
  Sort,
  Freeze,
} from "@syncfusion/ej2-react-grids";

interface gridinterface {
  dataSource: (string | number | boolean | object | Date)[];
  gridRef?: React.RefObject<GridComponent | null>;
  handleToolbarClick?: (args: any) => void;
  // toolbarOptions?: string[];
  editSettings?: object;
  handleView?: (args: any) => void;
  setShowEdit?: (args: boolean) => void;
}
const ApprovalGroupGrid = ({
  dataSource,
  gridRef,
  handleToolbarClick,
  editSettings,
  handleView,
  setShowEdit,
}: // toolbarOptions,
gridinterface) => {
  const commands: CommandModel[] = [
    {
      buttonOption: {
        cssClass: "e-flat e-view",
        iconCss: "e-icons e-eye",
      },
    },
  ];
  return (
    <GridComponent
      id="ApprovalGroupMasterGrid"
      dataSource={dataSource}
      allowPaging={true}
      allowSorting={true}
      allowFiltering={true}
      allowExcelExport={true}
      allowSelection={true}
      toolbar={["Search", "ExcelExport"]}
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
      commandClick={handleView}
      cellSaved={setShowEdit}
    >
      <ColumnsDirective>
        <ColumnDirective
          headerText="S.No"
          width={"30"}
          template={(props: any) => Number(props.index) + 1}
          textAlign="Center"
          allowFiltering={false}
          allowSorting={false}
          allowEditing={false}
        />
        <ColumnDirective
          field="GroupName"
          headerText="Group Name"
          width="100"
          textAlign="Left"
          allowSorting={true}
        ></ColumnDirective>
        <ColumnDirective
          field="Description"
          headerText="Description"
          width="100"
          textAlign="Left"
        ></ColumnDirective>
        <ColumnDirective
          field="IsActive"
          headerText="Active"
          type="boolean"
          displayAsCheckBox={true}
          allowSorting={true}
          textAlign="Center"
          width="30"
          editType="booleanedit"
          allowFiltering={false}
        />

        <ColumnDirective
          headerText="Actions"
          width="30"
          commands={commands}
          freeze="Right"
        />
      </ColumnsDirective>
      <Inject
        services={[
          Page,
          Filter,
          GridEdit,
          Toolbar,
          Sort,
          Freeze,
          ExcelExport,
          CommandColumn,
        ]}
      />
    </GridComponent>
  );
};

export default ApprovalGroupGrid;
