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
const ProjectGrid = ({
  dataSource,
  gridRef,
  handleToolbarClick,
  editSettings,
  handleView,
  setShowEdit,
}: gridinterface) => {
  const companyList = useAppSelector((state) => state.companyList.data);
  const companyParams = {
    params: {
      actionComplete: () => false,
      dataSource: new DataManager(companyList || []),
      fields: { text: "CompanyName", value: "CompanyID" },
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

  return companyList.length > 0 ? (
    <GridComponent
      id="ProjectMasterGrid"
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
          field="CompanyId"
          headerText="Company Name"
          width="50"
          editType="dropdownedit"
          edit={companyParams}
          validationRules={{ required: true }}
          allowEditing={true}
          allowSorting={true}
          valueAccessor={(field: string, data: Record<string, any>): any => {
            const company = companyList.find(
              (dep) => dep.CompanyID === data[field]
            );
            return company?.CompanyName ?? "";
          }}
        />
        <ColumnDirective
          field="ProjectName"
          headerText="Project Name"
          width="100"
          textAlign="Left"
          allowSorting={true}
        />
        <ColumnDirective
          field="ProjectCode"
          headerText="Project Code"
          width="50"
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
        <ColumnDirective headerText="Actions" width="20" commands={commands} />
      </ColumnsDirective>
      <Inject
        services={[Page, Filter, GridEdit, Sort, Freeze, CommandColumn]}
      />
    </GridComponent>
  ) : (
    <Skeleton />
  );
};

export default ProjectGrid;
