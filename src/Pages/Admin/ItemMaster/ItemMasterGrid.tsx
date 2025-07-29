import { useAppSelector } from "@/Store/reduxhook";
import { DataManager, Query } from "@syncfusion/ej2-data";
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
  Sort,
  Freeze,
} from "@syncfusion/ej2-react-grids";

interface gridinterface {
  dataSource: (string | number | boolean | object | Date)[];
  gridRef?: React.RefObject<GridComponent | null>;
  handleToolbarClick?: (args: any) => void;
  editSettings?: object;
  handleView?: (args: any) => void;
  setShowEdit: (args: boolean) => void;
}
const ItemMasterGrid = ({
  dataSource,
  gridRef,
  editSettings,
  handleToolbarClick,
  handleView,
  setShowEdit,
}: gridinterface) => {
  const unitOfMeasurementList = useAppSelector(
    (state) => state.unitOfMeasurementList.data
  );
  const unitOfMeasurementParams = {
    params: {
      actionComplete: () => false,
      dataSource: new DataManager(unitOfMeasurementList || []),
      fields: { text: "Name", value: "Id" },
      query: new Query(),
      allowFiltering: true,
    },
  };
  const commands: CommandModel[] = [
    {
      buttonOption: {
        cssClass: "e-flat e-view",
        iconCss: "e-icons e-eye",
      },
    },
  ];
  return unitOfMeasurementList.length > 0 ? (
    <GridComponent
      id="ItemMasterGrid"
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
          field="ItemCode"
          headerText="Item Code"
          width="100"
          textAlign="Left"
        />
        <ColumnDirective
          field="ItemName"
          headerText="Item Name"
          width="100"
          textAlign="Left"
          allowSorting={true}
        />
        <ColumnDirective
          field="UnitOfMeasurementId"
          headerText="Unit Of Measurement"
          width="100"
          editType="dropdownedit"
          edit={unitOfMeasurementParams}
          validationRules={{ required: true }}
          allowEditing={true}
          valueAccessor={(field: string, data: Record<string, any>): String => {
            const UnitOfMeasurement = unitOfMeasurementList.find(
              (dep) => dep.Id == data[field]
            );
            return UnitOfMeasurement?.Name ?? "";
          }}
        />
        <ColumnDirective
          field="IsActive"
          headerText="Active"
          type="boolean"
          displayAsCheckBox={true}
          width="100"
          editType="booleanedit"
          allowFiltering={false}
        />
        <ColumnDirective
          headerText="Actions"
          width="50"
          commands={commands}
          freeze="Right"
        />
      </ColumnsDirective>
      <Inject
        services={[Page, Filter, GridEdit, Sort, Freeze, CommandColumn]}
      />
    </GridComponent>
  ) : (
    ""
  );
};

export default ItemMasterGrid;
