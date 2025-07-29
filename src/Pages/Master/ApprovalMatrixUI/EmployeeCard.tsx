import { useDrag, useDrop } from "react-dnd";
import { DragItem } from ".";
import { TrashIcon } from "lucide-react";

interface EmployeeCardProps {
  employee: any;
  index: number;
  level: number;
  from?: string;
  bgColor?: string;
  onDelete?: (employee: any, level: number) => void;
  handleCheckBox?: (employee: any, level: number) => void;
  moveEmployee: (
    dragEmp: any,
    fromLevel: number,
    toLevel: number,
    toIndex: number
  ) => void;
}
export default function EmployeeCard({
  employee,
  index,
  level,
  moveEmployee,
  onDelete,
  from,
  handleCheckBox,
}: EmployeeCardProps) {
  const [, dragRef] = useDrag(() => ({
    type: "EMPLOYEE",
    item: { type: "EMPLOYEE", employee, fromLevel: level, from: from },
  }));

  const [, dropRef] = useDrop<DragItem>({
    accept: "EMPLOYEE",
    drop: (item: DragItem) => {
      if (item.employee.id !== employee.id) {
        if (level === item.fromLevel && from === "department") {
          return;
        }
        moveEmployee(item.employee, item.fromLevel, level, index);
      }
    },
  });
  return (
    <span
      ref={(node) => {
        dragRef(dropRef(node));
      }}
      className={`bg-white me-2 mb-2 cursor-pointer ${
        from === "hierarchy"
          ? "block p-1 rounded-md shadow-sm border-2"
          : "inline-block p-3 rounded"
      }`}
      style={{
        height: "fit-content",
        fontSize: "12px",
        borderColor: from === "hierarchy" ? employee.bgColor : "greylight",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
      }}
    >
      {from === "department" ? (
        <div
          style={{
            maxWidth: "15em",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          <span
            className="px-2 py-1 rounded me-2"
            style={{ backgroundColor: employee.bgColor }}
          >
            {employee.empcode}
          </span>
          {employee.name}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <span
            className="ms-1"
            style={{
              fontSize: "15px",
              fontWeight: "bolder",
              WebkitLineClamp: 2,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
            }}
          >
            {employee.name}
          </span>
          <div className="flex justify-between px-2">
            <span className="flex items-center">
              <input
                type="checkbox"
                className="cursor-pointer"
                placeholder=""
                id={employee.name + employee.id + employee.empcode}
                style={{
                  width: "15px",
                  height: "15px",
                  accentColor: employee.bgColor,
                }}
                checked={employee.ismandatory}
                onChange={() =>
                  handleCheckBox && handleCheckBox(employee, level)
                }
              />
              <label
                htmlFor={employee.name + employee.id + employee.empcode}
                className="ps-1 cursor-pointer"
              >
                IsMandatory
              </label>
            </span>
            <button
              className="text-white bg-red-400 hover:bg-red-300 p-1 rounded cursor-pointer"
              onClick={() => onDelete && onDelete(employee, level)}
            >
              <TrashIcon size={15} />
            </button>
          </div>
          <span className="bg-gray-100 px-2 py-1 rounded flex justify-between items-center">
            {employee.empcode}
            <span
              className="px-2 py-1 rounded"
              style={{ backgroundColor: employee.bgColor }}
            >
              {employee.dept}
            </span>
          </span>
        </div>
      )}
    </span>
  );
}
