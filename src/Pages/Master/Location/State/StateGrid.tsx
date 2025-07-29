import { Skeleton } from "@/components/shadcn-ui/skeleton";
import { useAppSelector } from "@/Store/reduxhook";
import { DataManager, Query } from "@syncfusion/ej2-data";
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Page,
  Edit as GridEdit,
  CommandColumn,
  Inject,
  CommandModel,
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
const StateGrid = ({
  dataSource,
  gridRef,
  handleToolbarClick,
  editSettings,
  handleView,
  setShowEdit,
}: // toolbarOptions,
gridinterface) => {
  const countryList = useAppSelector((state) => state.countryList.data);
  const countryParams = {
    params: {
      actionComplete: () => false,
      dataSource: new DataManager(countryList || []),
      fields: { text: "CountryName", value: "ID" },
      query: new Query(),
      allowFiltering: true,
    },
  };
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
  return countryList.length > 0 ? (
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
          field="StateCode"
          headerText="State Code"
          width="50"
          textAlign="Left"
        ></ColumnDirective>
        <ColumnDirective
          field="StateName"
          headerText="State Name"
          width="50"
          textAlign="Left"
          allowSorting={true}
        ></ColumnDirective>
        <ColumnDirective
          field="CountryID"
          headerText="Country Name"
          width="50"
          editType="dropdownedit"
          edit={countryParams}
          validationRules={{ required: true }}
          allowEditing={true}
          allowSorting={true}
          valueAccessor={(field: string, data: Record<string, any>): any => {
            const country = countryList.find((dep) => dep.ID === data[field]);
            return country?.CountryName ?? "";
          }}
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
        <ColumnDirective headerText="Actions" width="20" commands={commands} />
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

export default StateGrid;
