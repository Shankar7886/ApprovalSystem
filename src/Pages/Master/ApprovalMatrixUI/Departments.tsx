import { useState } from "react";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import EmployeeCard from "./EmployeeCard";
import { useDrop } from "react-dnd";
import DraggableDepartmentButton from "./DraggableDepartmentButton";
import { useIsMobile } from "@/hooks/use-mobile";
interface DepartmentProps {
  moveEmployee: (
    dragEmp: any,
    fromLevel: number,
    toLevel: number,
    toIndex: number
  ) => void;
  departmentList: any[];
  onDepartmentDrop: (item: any) => void;
}
export default function Departments({
  moveEmployee,
  departmentList = [],
  onDepartmentDrop,
}: DepartmentProps) {
  const [search, setSearch] = useState("");
  const [colorCode, setColorCode] = useState("");
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState({
    name: "",
    isVisible: false,
  });
  const [, dropRef] = useDrop({
    accept: "EMPLOYEE",
    drop: (item: any) => {
      onDepartmentDrop(item);
    },
  });
  return (
    <div className={`mb-2`}>
      <div
        className={`flex gap-2 ${
          departmentList.length > 10 ? "overflow-x-scroll pb-2" : ""
        } ${isMobile ? "overflow-x-scroll pb-2" : ""}`}
      >
        {departmentList.map((dept: any) => (
          <DraggableDepartmentButton
            key={dept.name}
            dept={dept}
            isSelected={selected.name === dept.name}
            onSelect={() => {
              setColorCode(dept.color);
              if (selected.name !== dept.name) {
                setSelected({
                  name: dept.name,
                  isVisible: true,
                });
              } else {
                setSelected({
                  name: "",
                  isVisible: false,
                });
              }
            }}
          />
        ))}
      </div>
      {selected.isVisible && (
        <div
          ref={(node) => {
            dropRef(node);
          }}
          className="bg-gray-50 h-[200px] mt-2 p-2 rounded shadow border-2 flex flex-col gap-2"
          // style={{ backgroundColor: colorCode ? colorCode : "lightgray" }}
          style={{ borderColor: colorCode ? colorCode : "lightgray" }}
        >
          <div className="">
            <FloatingLabelInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              label="Search"
              id="SearchEmp"
              className="bg-white w-[200px]"
            />
          </div>
          <div className="grow overflow-y-scroll">
            {departmentList
              .find((dept) => dept.name === selected.name)
              ?.employees?.filter(
                (emp: any) =>
                  emp.name.toLowerCase().includes(search) ||
                  emp.empcode.toLowerCase().includes(search)
              )
              .map((emp: any, i: number) => (
                <EmployeeCard
                  key={emp.id + i}
                  employee={{
                    ...emp,
                    bgColor: departmentList.find(
                      (dept) => dept.name === selected.name
                    )?.color,
                  }}
                  index={0}
                  level={0}
                  moveEmployee={moveEmployee}
                  from="department"
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
