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

const MenuGroupGrid = ({
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
      frozenColumns={1}
      commandClick={handleView}
      cellSaved={setShowEdit}
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
          field="GroupName"
          headerText="Group Name"
          width="60"
          textAlign="Left"
          allowFiltering={true}
          allowSorting={true}
          allowEditing={true}
        ></ColumnDirective>
        <ColumnDirective
          field="DisplayOrder"
          headerText="Display Order"
          width="30"
          textAlign="Left"
          allowSorting={true}
          allowEditing={true}
        />
        <ColumnDirective
          field="Icon"
          headerText="Icon Name"
          width="50"
          textAlign="Left"
        />

        <ColumnDirective
          field="IsActive"
          headerText="IsActive"
          type="boolean"
          displayAsCheckBox={true}
          textAlign="Center"
          width="20"
          editType="booleanedit"
          allowFiltering={false}
        />
        <ColumnDirective headerText="Actions" width="20" commands={commands} />
      </ColumnsDirective>
      <Inject
        services={[
          Page,
          Filter,
          Sort,
          GridEdit,
          Toolbar,
          ExcelExport,
          CommandColumn,
        ]}
      />
    </GridComponent>
  );
};

export default MenuGroupGrid;
