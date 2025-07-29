import {
  ColumnDirective,
  ColumnsDirective,
  CommandColumn,
  CommandModel,
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
const CountryGrid = ({
  dataSource,
  gridRef,
  handleToolbarClick,
  editSettings,
  handleView,
  setShowEdit,
}: // toolbarOptions,
gridinterface) => {
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
      commandClick={handleView}
      cellSaved={() => setShowEdit && setShowEdit(true)}
    >
      <ColumnsDirective>
        <ColumnDirective
          headerText="S.No"
          width={"20"}
          template={(props: any) => Number(props.index) + 1}
          textAlign="Center"
          allowFiltering={false}
          allowSorting={false}
          allowEditing={false}
        />
        <ColumnDirective
          field="CountryName"
          headerText="Country Name"
          width="100"
          textAlign="Left"
          allowSorting={true}
        ></ColumnDirective>
        <ColumnDirective
          field="CountryCode"
          headerText="Country Code"
          width="30"
          allowFiltering={false}
          textAlign="Left"
        ></ColumnDirective>
        <ColumnDirective
          field="IsActive"
          headerText="Active"
          type="boolean"
          displayAsCheckBox={true}
          textAlign="Center"
          width="20"
          editType="booleanedit"
          allowFiltering={false}
          allowSorting={true}
        />

        <ColumnDirective
          headerText="Actions"
          width="20"
          textAlign="Center"
          commands={commands}
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

export default CountryGrid;
