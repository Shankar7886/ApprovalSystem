import { Button } from "@/components/shadcn-ui/button";
import { useDrag } from "react-dnd";

const DraggableDepartmentButton = ({
  dept,
  isSelected,
  onSelect,
}: {
  dept: any;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const [, dragRef] = useDrag(() => ({
    type: "DEPARTMENT",
    item: { type: "DEPARTMENT", dept },
  }));

  return (
    <div
      ref={(node) => {
        dragRef(node);
      }}
    >
      <Button
        variant="secondary"
        style={{ backgroundColor: isSelected ? dept.color : "#F7F7F7" }}
        onClick={onSelect}
        className="shadow-sm border"
      >
        {dept.name}
      </Button>
    </div>
  );
};

export default DraggableDepartmentButton;
