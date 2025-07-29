import { useDrop } from "react-dnd";
import { DragItem, Employee } from ".";
import EmployeeCard from "./EmployeeCard";
interface DropZoneProps {
  level: number;
  employees: Employee[];
  selectedLevel?: number;
  moveEmployee: (
    employee: Employee,
    fromLevel: number,
    toLevel: number,
    toIndex: number
  ) => void;
  onDelete: (employeeId: string, level: number) => void;
  handleDepartmentDrop: (employee: Employee[], level: number) => void;
  handleCheckBox?: (employee: Employee, level: number) => void;
}
type DragTypes =
  | DragItem
  | {
      type: "DEPARTMENT";
      dept: {
        color: string;
        employees: Employee[];
      };
    };
export default function DropZone({
  level,
  employees,
  moveEmployee,
  onDelete,
  handleDepartmentDrop,
  handleCheckBox,
}: DropZoneProps) {
  const [{ isOver, canDrop }, dropRef] = useDrop<
    DragTypes,
    void,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: ["EMPLOYEE", "DEPARTMENT"],
    drop: (item: DragTypes) => {
      // Drop at end of list if not dropped on a specific card
      if (item.type === "EMPLOYEE") {
        // Drop single employee
        if (!employees.find((e) => e.id === item.employee.id)) {
          moveEmployee(item.employee, item.fromLevel, level, employees.length);
        }
      } else if (item.type === "DEPARTMENT") {
        // Drop all employees from department
        let emp = item.dept.employees;
        let newEmp = emp.map((e) => ({ ...e, bgColor: item.dept.color }));
        handleDepartmentDrop(newEmp, level);
      }
      // if (!employees.find((e) => e.id === item.employee.id)) {
      //   moveEmployee(item.employee, item.fromLevel, level, employees.length);
      // }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  return dropRef(
    <div
      className={`border-r p-2 border-dashed w-[200px] h-full flex-shrink-0 border-gray-300 ${
        employees.length > 3 ? "overflow-y-scroll" : ""
      } ${
        isOver && canDrop
          ? "bg-green-50 border-green-400"
          : "border-dashed border-gray-300"
      }`}
    >
      <span className="block mb-2">{`Level ${level}`}</span>
      {employees.length > 0 ? (
        employees.map((emp, i) => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            index={i}
            level={level}
            moveEmployee={moveEmployee}
            onDelete={(employeeId) => onDelete(employeeId, level)}
            handleCheckBox={handleCheckBox}
            from="hierarchy"
          />
        ))
      ) : (
        <h6 className="text-sm text-[#a3a3a3] mt-5">Drop employees here</h6>
      )}
    </div>
  );
}
