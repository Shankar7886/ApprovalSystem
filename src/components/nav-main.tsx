import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn-ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/shadcn-ui/sidebar";
import { GetMenuIcon } from "./common/menuIcon";

type MenuItem = {
  menuid: number;
  formid: number;
  menuname: string;
  formname: string;
  haschild: boolean;
  parentid: number;
  seqno: number;
  iconpath?: string;
  SubMenus?: MenuItem[];
};

interface NavMainProps {
  items: MenuItem[];
  handleNavigation: (formname: string) => void;
}

export function NavMain({ items, handleNavigation }: NavMainProps) {
  const { state } = useSidebar();

  const renderMenu = (menu: MenuItem, level: number = 0) => {
    const hasChildren =
      menu.haschild && menu.SubMenus && menu.SubMenus.length > 0;

    if (hasChildren) {
      return (
        <Collapsible
          key={menu.menuid}
          asChild
          defaultOpen={false}
          className="group/collapsible relative"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={menu.menuname}>
                <span
                  className={`flex items-center ${
                    state === "collapsed" ? "gap-4" : "gap-2"
                  }`}
                >
                  <GetMenuIcon menuid={menu.menuid} state={state} />
                  {state !== "collapsed" && menu.menuname}
                </span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            {/* Expanded Mode: Inline Collapsible Submenus */}
            {state !== "collapsed" && (
              <CollapsibleContent>
                <SidebarMenuSub>
                  {(menu.SubMenus ?? []).map((child) =>
                    renderMenu(child, level + 1)
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            )}

            {/* Collapsed Mode: Hover Submenu Panel */}
            {state === "collapsed" && (
              <div className="absolute left-full top-0 z-50 hidden w-56 bg-white dark:bg-background shadow-lg rounded-md p-2 group-hover/collapsible:block">
                <SidebarMenuSub>
                  {(menu.SubMenus ?? []).map((child) =>
                    renderMenu(child, level + 1)
                  )}
                </SidebarMenuSub>
              </div>
            )}
          </SidebarMenuItem>
        </Collapsible>
      );
    } else {
      return (
        <SidebarMenuSubItem key={menu.menuid}>
          <SidebarMenuSubButton
            asChild
            onClick={() => handleNavigation(menu.menuname)}
          >
            <span>{menu.formname}</span>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      );
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu className="relative">
        {items.map((item) =>
          item.haschild ? (
            renderMenu(item)
          ) : (
            <SidebarMenuItem key={item.menuid}>
              <SidebarMenuButton
                asChild
                tooltip={item.menuname}
                onClick={() => handleNavigation(item.menuname)}
              >
                <span
                  className={`flex items-center ${
                    state === "collapsed" ? "gap-4" : "gap-2"
                  }`}
                >
                  <GetMenuIcon menuid={item.menuid} />
                  {state !== "collapsed" && item.formname}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
