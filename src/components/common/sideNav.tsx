// components/Sidebar.tsx
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure cn is available (ShadCN utility)
import { Button } from "@/components/shadcn-ui/button";

type NavItem = {
  label: string;
  icon?: React.ReactNode;
  children?: NavItem[];
};

const sidebarItems: NavItem[] = [
  {
    label: "Dashboard",
  },
  {
    label: "Projects",
    children: [{ label: "Active Projects" }, { label: "Archived Projects" }],
  },
  {
    label: "Team",
    children: [
      { label: "Developers" },
      {
        label: "Designers",
        children: [{ label: "UI" }, { label: "UX" }],
      },
    ],
  },
  {
    label: "Settings",
  },
];

function SidebarItem({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className={cn("pl-2", depth && `pl-${depth * 4}`)}>
      <Button
        variant="ghost"
        className="w-full justify-start text-left"
        onClick={() => hasChildren && setOpen(!open)}
      >
        <span className="flex items-center gap-2">
          {hasChildren ? (
            open ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )
          ) : null}
          {item.label}
        </span>
      </Button>
      {hasChildren && open && (
        <div className="ml-4 border-l border-muted-foreground pl-2">
          {item.children!.map((child) => (
            <SidebarItem key={child.label} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r p-4 bg-background">
      {sidebarItems.map((item) => (
        <SidebarItem key={item.label} item={item} />
      ))}
    </aside>
  );
}
