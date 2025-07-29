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
  ExcelExport,
  Toolbar,
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
  menuList?: { MenuId: number; MenuName: string }[];
  menuGroupList?: { MenuGroupId: number; GroupName: string }[];
  formMasterList?: { FormId: number; FormName: string }[];
}

const MenuGrid = ({
  dataSource = [],
  gridRef,
  handleToolbarClick,
  editSettings,
  handleView,
  setShowEdit,
  menuList = [],
  menuGroupList = [],
  formMasterList = [],
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
  const MenuListParams = {
    params: {
      actionComplete: () => false,
      dataSource: new DataManager(menuList || []),
      fields: { text: "MenuName", value: "MenuId" },
      query: new Query(),
      allowFiltering: true,
    },
  };
  const MenuGroupListParams = {
    params: {
      actionComplete: () => false,
      dataSource: new DataManager(menuGroupList || []),
      fields: { text: "GroupName", value: "MenuGroupId" },
      query: new Query(),
      allowFiltering: true,
    },
  };
  const FormMasterListParams = {
    params: {
      actionComplete: () => false,
      dataSource: new DataManager(formMasterList || []),
      fields: { text: "FormName", value: "FormId" },
      query: new Query(),
      allowFiltering: true,
    },
  };
  return (
    formMasterList.length > 0 &&
    menuGroupList.length > 0 &&
    menuList.length > 0 && (
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
            width={"100"}
            template={(props: any) => Number(props.index) + 1}
            textAlign="Center"
            allowFiltering={false}
            allowSorting={false}
            allowEditing={false}
          />
          <ColumnDirective
            field="ID"
            headerText="ID"
            visible={false}
            isPrimaryKey={false}
            width="80"
          />
          <ColumnDirective
            field="MenuName"
            headerText="Menu Name"
            width="200"
            textAlign="Left"
          ></ColumnDirective>
          <ColumnDirective
            field="FormId"
            headerText="Form Name"
            width="200"
            textAlign="Left"
            editType="dropdownedit"
            edit={FormMasterListParams}
            validationRules={{ required: true }}
            allowEditing={true}
            allowSorting={true}
            valueAccessor={(field: string, data: Record<string, any>): any => {
              const formMaster = formMasterList.find(
                (dep) => dep.FormId === data[field]
              );
              return formMaster?.FormName ?? "";
            }}
          />
          <ColumnDirective
            field="MenuGroupId"
            headerText="Menu Group Name"
            width="200"
            editType="dropdownedit"
            edit={MenuGroupListParams}
            validationRules={{ required: true }}
            allowEditing={true}
            allowSorting={true}
            valueAccessor={(field: string, data: Record<string, any>): any => {
              const menuGroup = menuGroupList.find(
                (dep) => dep.MenuGroupId === data[field]
              );
              return menuGroup?.GroupName ?? "";
            }}
          />
          <ColumnDirective
            field="ParentMenuId"
            headerText="Parent Menu Name"
            width="200"
            editType="dropdownedit"
            edit={MenuListParams}
            validationRules={{ required: true }}
            allowEditing={true}
            allowSorting={true}
            valueAccessor={(field: string, data: Record<string, any>): any => {
              const menu = menuList.find((dep) => dep.MenuId === data[field]);
              return menu?.MenuName ?? "";
            }}
          />
          <ColumnDirective
            field="URL"
            headerText="URL"
            width="200"
            textAlign="Left"
            validationRules={{
              required: true,
            }}
          />
          <ColumnDirective
            field="IsActive"
            headerText="IsActive"
            type="boolean"
            displayAsCheckBox={true}
            textAlign="Center"
            width="200"
            editType="booleanedit"
            allowFiltering={false}
          />
          <ColumnDirective
            headerText="Actions"
            width="100"
            commands={commands}
            textAlign="Center"
            freeze="Right"
          />
        </ColumnsDirective>
        <Inject
          services={[
            Page,
            Filter,
            Sort,
            GridEdit,
            ExcelExport,
            Toolbar,
            CommandColumn,
          ]}
        />
      </GridComponent>
    )
  );
};

export default MenuGrid;
