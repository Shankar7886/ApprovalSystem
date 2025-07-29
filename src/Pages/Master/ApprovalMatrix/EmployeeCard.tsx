import { useDrag, useDrop } from "react-dnd";
import { DragItem, Employee } from "./Index";
import { Trash, User } from "lucide-react";

const EmployeeCard: React.FC<{
  employee: Employee;
  index: number;
  level: number;
  from?: string;
  bgColor?: string;
  onDelete?: (employeeId: string, level: number) => void;
  moveEmployee: (
    dragEmp: Employee,
    fromLevel: number,
    toLevel: number,
    toIndex: number
  ) => void;
}> = ({ employee, index, level, moveEmployee, onDelete, from, bgColor }) => {
  const [, dragRef] = useDrag(() => ({
    type: "EMPLOYEE",
    item: { type: "EMPLOYEE", employee, fromLevel: level },
  }));

  const [, dropRef] = useDrop<DragItem>({
    accept: "EMPLOYEE",
    drop: (item: DragItem) => {
      if (item.employee.id !== employee.id) {
        moveEmployee(item.employee, item.fromLevel, level, index);
      }
    },
  });

  return (
    <div
      ref={(node) => {
        dragRef(dropRef(node));
      }}
      className={`flex justify-between items-center bg-white p-2 border shadow rounded-sm flex-col ${
        from === "hierarchy" ? "h-[120px] w-[160px]" : "h-[100px]"
      } w-[100px]`}
      style={{ backgroundColor: from === "department" ? bgColor : "white" }}
    >
      <div className={`flex gap-2 items-center justify-between w-full`}>
        <User size={18} />
        <small className="bg-purple-100 px-2 py-0.5 rounded">
          {employee.empcode}
        </small>
      </div>
      <div
        className={`${
          from === "hierarchy"
            ? "flex items-center gap-2 w-full flex-col"
            : "border-t p-1 w-full"
        }`}
      >
        {from === "hierarchy" && (
          <div className="flex items-center justify-between gap-2 p-2 w-full">
            <input
              type="checkbox"
              checked={employee.ismandatory}
              onChange={() => {
                if (from !== "hierarchy") {
                  return;
                }
                employee.ismandatory = !employee.ismandatory;
                moveEmployee(employee, level, level, index);
              }}
            />
            <Trash
              className="cursor-pointer text-red-600 hover:text-red-700"
              size={12}
              onClick={() => onDelete && onDelete(employee.id, level)}
            />
          </div>
        )}
        <p className="m-0 font-medium" style={{ fontSize: "12px" }}>
          {employee.name}
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;
