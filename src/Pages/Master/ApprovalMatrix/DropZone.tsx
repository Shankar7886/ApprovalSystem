import { useDrop } from "react-dnd";
import { DragItem, Employee } from "./Index";
import EmployeeCard from "./EmployeeCard";

const DropZone: React.FC<{
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
}> = ({ level, employees, moveEmployee, onDelete, selectedLevel }) => {
  const [{ isOver, canDrop }, dropRef] = useDrop<
    DragItem,
    void,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: "EMPLOYEE",
    drop: (item: DragItem) => {
      // Drop at end of list if not dropped on a specific card
      if (!employees.find((e) => e.id === item.employee.id)) {
        moveEmployee(item.employee, item.fromLevel, level, employees.length);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return dropRef(
    <div
      className={`p-3 rounded-xl h-full overflow-y-auto border border-dashed border-gray-300 block flex-shrink-0 ${
        selectedLevel !== 1 ? "w-[200px]" : "w-full"
      } ${
        isOver && canDrop
          ? "bg-green-50 border-green-400"
          : "border-dashed border-gray-300"
      }`}
    >
      <h4 className="text-lg font-semibold mb-2">Hierarchy Level {level}</h4>
      <div className="space-y-2 px-3 mt-3">
        {employees.length > 0 ? (
          employees.map((emp, i) => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              index={i}
              level={level}
              moveEmployee={moveEmployee}
              onDelete={(employeeId) => onDelete(employeeId, level)}
              from="hierarchy"
            />
          ))
        ) : (
          <h6 className="text-sm text-[#a3a3a3] mt-5">Drop employees here</h6>
        )}
      </div>
    </div>
  );
};

export default DropZone;
