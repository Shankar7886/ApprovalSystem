import React from "react";
import { useDrag } from "react-dnd";
import { sidebarFormData } from "./sidebarFormData";
import {
  Text,
  Hash,
  ChevronDown,
  Upload,
  Calendar,
  Table,
  Code2,
  Plus,
  CheckSquare,
  Heading,
  Menu,
} from "lucide-react";

const iconMap: { [key: number]: React.ReactNode } = {
  1: <Text size={16} />,
  2: <Hash size={16} />,
  3: <ChevronDown size={16} />,
  4: <Upload size={16} />,
  5: <Calendar size={16} />,
  6: <Table size={16} />,
  7: <Code2 size={16} />,
  8: <Plus size={16} />,
  9: <CheckSquare size={16} />,
  10: <Heading size={16} />,
};

interface RightSidebarProps {
  handleRightSidebarClose: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  handleRightSidebarClose,
}) => {
  return (
    <div className=" bg-white" style={{ paddingRight: "0px" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Elements</h2>
        <Menu
          className="w-5 h-5 text-gray-600 cursor-pointer"
          onClick={handleRightSidebarClose}
        />
      </div>
      <div className="space-y-2">
        {sidebarFormData.map((field) => (
          <DraggableSidebarItem
            key={field.id}
            field={field}
            icon={iconMap[field.id]}
          />
        ))}
      </div>
    </div>
  );
};

interface SidebarField {
  id: number;
  fieldName: string;
  [key: string]: any;
}

interface DraggableSidebarItemProps {
  field: SidebarField;
  icon: React.ReactNode;
}

const DraggableSidebarItem: React.FC<DraggableSidebarItemProps> = ({
  field,
  icon,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "FORM_FIELD",
    item: { ...field },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return dragRef(
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition ${
        isDragging ? "opacity-50" : "bg-gray-100 hover:bg-purple-200"
      }`}
      style={{ userSelect: "none" }}
    >
      {icon}
      <span className="text-sm text-gray-800">{field.fieldName}</span>
    </div>
  );
};
