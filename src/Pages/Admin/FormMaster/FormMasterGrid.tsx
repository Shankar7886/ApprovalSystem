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
} from "@syncfusion/ej2-react-grids";

interface gridinterface {
  dataSource?: (string | number | boolean | object | Date)[];
  gridRef?: React.RefObject<GridComponent | null>;
  handleToolbarClick?: (args: any) => void;
  // toolbarOptions?: string[];
  editSettings?: object;
  handleView?: (args: any) => void;
  setShowEdit?: (args: boolean) => void;
}

const FormMasterGrid = ({
  dataSource,
  gridRef,
  handleToolbarClick,
  editSettings,
  handleView,
  setShowEdit,
}: gridinterface) => {
  const commands: CommandModel[] = [
    // {
    //   type: "Edit",
    //   buttonOption: {
    //     cssClass: "e-flat",
    //     iconCss: "e-edit e-icons",
    //   },
    // },
    {
      buttonOption: {
        cssClass: "e-flat e-view",
        iconCss: "e-icons e-eye",
      },
    },
  ];
  return (
    <GridComponent
      id="CountryMasterGrid"
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
          field="FormId"
          isPrimaryKey={true}
          visible={false}
          headerText="Menu ID"
          width={0}
        />
        <ColumnDirective
          field="FormName"
          headerText="Form Name"
          width={50}
          allowEditing={true}
          allowSorting={true}
        />
        <ColumnDirective
          field="Description"
          headerText="Description"
          width="100"
          allowFiltering={false}
          allowEditing={true}
        />

        <ColumnDirective
          headerText="Actions"
          width="30"
          commands={commands}
          textAlign="Center"
          // freeze="Right"
        />
      </ColumnsDirective>
      <Inject
        services={[Page, Filter, GridEdit, Toolbar, ExcelExport, CommandColumn]}
      />
    </GridComponent>
  );
};

export default FormMasterGrid;
