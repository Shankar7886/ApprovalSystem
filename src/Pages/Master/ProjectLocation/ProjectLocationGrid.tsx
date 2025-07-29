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
  setShowEdit: (args: boolean) => void;
}
const ProjectLocationGrid = ({
  dataSource,
  gridRef,
  handleToolbarClick,
  editSettings,
  handleView,
  setShowEdit,
}: gridinterface) => {
  const projectList = useAppSelector((state) => state.projectList.data);
  const projectLocationParams = {
    params: {
      actionComplete: () => false,
      dataSource: new DataManager(projectList || []),
      fields: { text: "ProjectName", value: "Id" },
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
  return projectList.length > 0 ? (
    <GridComponent
      id="ProjectLocationMasterGrid"
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
          field="ProjectID"
          headerText="Project Name"
          width="150"
          editType="dropdownedit"
          allowSorting={true}
          edit={projectLocationParams}
          validationRules={{ required: true }}
          allowEditing={true}
          valueAccessor={(field: string, data: Record<string, any>): any => {
            const ProjectList = projectList.find(
              (dep) => dep.Id === data[field]
            );
            return ProjectList?.ProjectName ?? "";
          }}
        />
        <ColumnDirective
          field="Location"
          headerText="Location"
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
      <Inject
        services={[Page, Filter, GridEdit, Sort, Freeze, CommandColumn]}
      />
    </GridComponent>
  ) : (
    <Skeleton />
  );
};

export default ProjectLocationGrid;
