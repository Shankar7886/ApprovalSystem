import { Skeleton } from "@/components/shadcn-ui/skeleton";
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
const CityGrid = ({
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
  const stateList = useAppSelector((state) => state.stateList.data);
  const stateParams = {
    params: {
      actionComplete: () => false,
      dataSource: new DataManager(stateList || []),
      fields: { text: "StateName", value: "ID" },
      query: new Query(),
      allowFiltering: true,
    },
  };
  return stateList?.length > 0 ? (
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
          field="CityCode"
          headerText="City Code"
          width="30"
          textAlign="Left"
          visible={false}
        ></ColumnDirective>
        <ColumnDirective
          field="CityName"
          headerText="City Name"
          width="50"
          textAlign="Left"
          allowSorting={true}
        ></ColumnDirective>
        <ColumnDirective
          field="StateID"
          headerText="State Name"
          width="50"
          editType="dropdownedit"
          edit={stateParams}
          allowSorting={true}
          validationRules={{ required: true }}
          allowEditing={true}
          valueAccessor={(field: string, data: Record<string, any>): String => {
            const state = stateList.find((dep) => dep.ID === data[field]);
            return state?.StateName ?? "";
          }}
        />
        <ColumnDirective
          field="CountryName"
          headerText="Country Name"
          width="50"
          allowEditing={false}
          textAlign="Left"
          allowSorting={true}
        />
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
  ) : (
    <Skeleton />
  );
};

export default CityGrid;
