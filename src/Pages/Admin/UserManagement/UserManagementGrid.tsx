import Col from "@/components/common/Col";
import Row from "@/components/common/Row";
import React from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Sort,
  Filter,
  Toolbar,
  ExcelExport,
  CommandColumn,
  Edit as GridEdit,
  Freeze,
} from "@syncfusion/ej2-react-grids";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn-ui/tooltip";
import { Key } from "lucide-react";

export const UserManagementGrid: React.FC = () => {
  const actionTemplate = (rowData: any) => {
    console.log(rowData)
    return (
      <TooltipProvider>
        <div className="flex gap-4">
          {/* View Record Button with Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button className=" p-2 " style={{ cursor: "pointer" }}>
                <Key className="h-5 w-5 text-blue-600" />
              </button>
            </TooltipTrigger>
          </Tooltip>
        </div>
      </TooltipProvider>
    );
  };

  let roleList = [
    { text: "Admin", value: "admin" },
    { text: "HR", value: "HR" },
    { text: "Client", value: "Client" },
  ];
  const multiSelectEditParams = {
    create: () => {
      const container = document.createElement("div");
      container.className = "custom-multiselect-container";
      const select = document.createElement("select");
      select.multiple = true;
      select.style.width = "100%";
      select.style.height = "100px";
      select.style.padding = "4px";

      roleList.forEach((role) => {
        const option = document.createElement("option");
        option.value = role.value;
        option.text = role.text;
        select.appendChild(option);
      });

      container.appendChild(select);
      return container;
    },

    write: (args: any) => {
      const container = args.element as HTMLDivElement;
      const select = container.querySelector("select") as HTMLSelectElement;
      const selected = args.rowData?.[args.column.field] || [];

      Array.from(select.options).forEach((opt) => {
        opt.selected = selected.includes(opt.value);
      });
    },

    read: (args: any) => {
      const container = args.element as HTMLDivElement;
      const select = container.querySelector("select") as HTMLSelectElement;
      const values: string[] = [];

      Array.from(select.selectedOptions).forEach((opt) => {
        values.push(opt.value);
      });

      return values;
    },

    destroy: () => {
      // Nothing to destroy, native select
    },
  };

  return (
    <>
      <Row>
        <Col xl={12}>
          <GridComponent
            id="userManageMentGridID"
            dataSource={[
              {
                id: "1",
                fullName: "Shankr Yadav",
                username: "shankar01",
                isAuthorized: true,
                isActive: true,
                Roles: ["Admin", "HR"],
                password: "123456",
              },
              {
                id: "2",
                fullName: "Sahil Kumar",
                username: "sahil01",
                isAuthorized: true,
                isActive: false,
                Roles: ["Admin", "HR"],
                password: "123456",
              },
              {
                id: "3",
                fullName: "Sunny",
                username: "sunny01",
                isAuthorized: false,
                isActive: true,
                Roles: ["Admin", "HR"],
                password: "123456",
              },
            ]}
            allowPaging={true}
            allowSorting={true}
            allowFiltering={true}
            allowExcelExport={true}
            allowSelection={true}
            toolbar={["Search", "ExcelExport"]}
            // toolbarClick={handleToolbarClick}
            filterSettings={{ type: "Excel" }}
            editSettings={{
              allowEditing: true,
              allowDeleting: true,
              mode: "Batch",
            }}
            pageSettings={{
              pageSize: 15,
              pageSizes: ["5", "10", "15", "20", "All"],
            }}
            rowHeight={30}
            enableHover={true}
            gridLines="Both"
            cssClass="custom-grid"
            frozenColumns={1}
            height={"400px"}
          >
            <ColumnsDirective>
              <ColumnDirective
                headerText="S.No"
                width={"80"}
                template={(props: any) => Number(props.index) + 1}
                textAlign="Center"
                allowFiltering={false}
                allowSorting={false}
                allowEditing={false}
              />
              <ColumnDirective
                field="id"
                headerText="ID"
                visible={false}
                isPrimaryKey={false}
                width="80"
              />
              <ColumnDirective
                field="fullName"
                headerText="Full Name"
                width="200"
                allowEditing={false}
              />
              <ColumnDirective
                field="username"
                headerText="User Name"
                width="180"
              />
              <ColumnDirective
                field="isAuthorized"
                headerText="IsAuthorized"
                type="boolean"
                displayAsCheckBox={true}
                width="150"
                editType="booleanedit"
                allowFiltering={false}
                textAlign="Center"
              />
              <ColumnDirective
                field="IsActive"
                headerText="Active"
                type="boolean"
                displayAsCheckBox={true}
                width="150"
                editType="booleanedit"
                allowFiltering={false}
                textAlign="Center"
              />
              <ColumnDirective
                field="Roles" // was 'skills'
                headerText="Roles"
                width="250"
                // editType="dropdownedit"
                edit={multiSelectEditParams}
                template={(props: any) => props.Roles?.join(", ")} // display Roles properly
              />
              <ColumnDirective
                headerText="Password"
                template={actionTemplate}
                width="100"
                freeze="Right"
                textAlign="Center"
              />
            </ColumnsDirective>
            <Inject
              services={[
                Page,
                Sort,
                Filter,
                Toolbar,
                ExcelExport,
                GridEdit,
                CommandColumn,
                Freeze,
              ]}
            />
          </GridComponent>
        </Col>
      </Row>
    </>
  );
};
