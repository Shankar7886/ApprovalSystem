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
} from "@syncfusion/ej2-react-grids";

interface gridinterface {
  dataSource: (string | number | boolean | object | Date)[];
  gridRef?: React.RefObject<GridComponent | null>;
  handleToolbarClick?: (args: any) => void;
  editSettings?: object;
  handleView?: (args: any) => void;
  setShowEdit: (args: boolean) => void;
}
const TemplateGrid = ({
  dataSource,
  gridRef,
  editSettings,
  handleToolbarClick,
  handleView,
  setShowEdit,
}: gridinterface) => {
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
      id="TemplateGrid"
      dataSource={dataSource}
      allowPaging={true}
      allowSorting={true}
      allowFiltering={true}
      allowExcelExport={true}
      allowSelection={true}
      //   toolbar={toolbarOptions}
      toolbarClick={handleToolbarClick}
      filterSettings={{ type: "Excel" }}
      editSettings={editSettings}
      ref={gridRef}
      pageSettings={{
        pageSize: 5,
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
          field="TemplateName"
          headerText="Template Name"
          width="150"
          textAlign="Left"
          allowSorting={true}
        />
        <ColumnDirective
          field="Description"
          headerText="Description"
          width="150"
          textAlign="Left"
          allowSorting={true}
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
          headerText="Actions"
          width="100"
          commands={commands}
          freeze="Right"
        />
      </ColumnsDirective>
      <Inject services={[Page, Filter, GridEdit, CommandColumn]} />
    </GridComponent>
  );
};

export default TemplateGrid;
