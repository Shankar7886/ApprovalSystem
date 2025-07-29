import * as React from "react";
import { useNavigate } from "react-router";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  // useSidebar,
} from "@/components/shadcn-ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/shadcn-ui/dialog";
import { Button } from "@/components/shadcn-ui/button";
import { useAppDispatch } from "@/Store/reduxhook";
import { updatePageTitle } from "@/Store/features/currentPageReducer";
import { Menu } from "@/utils/Menu";
import activeMenus from "@/utils/activeMenus";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/shadcn-ui/command";
import { Search } from "lucide-react";

export function AppSidebar1({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = React.useState(false);

  const handleNavigation = (args: string) => {
    if (activeMenus.indexOf(args) > -1) {
      navigate(args);
    } else {
      navigate("wip");
    }
    dispatch(updatePageTitle(args));
  };

  const handleLogout = () => {
    window.sessionStorage.clear();
    navigate("/");
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      document.body.removeAttribute("style");
    }, 800);
  };

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={Menu.teams} />
          <SearchForm />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={Menu.navMain} handleNavigation={handleNavigation} />
          <NavProjects projects={Menu.projects} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser logOut={() => setIsOpen(true)} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent closeVisible={false}>
          <h1 className="text-xl">Are you sure you want to logout?</h1>
          <DialogFooter>
            <Button className="cursor-pointer" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
              onClick={handleLogout}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// export function SearchForm() {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [open, setOpen] = React.useState(false);
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [filteredItems, setFilteredItems] = React.useState<any[]>([]);

//   const flattenMenu = (items: any[]): any[] => {
//     return items.flatMap((item) => {
//       const current = {
//         label: item.menuname,
//         tag: item.MenuType,
//         navigation: item.navigation,
//       };
//       const subItems = item.SubMenus ? flattenMenu(item.SubMenus) : [];
//       return [current, ...subItems];
//     });
//   };

//   const allItems = React.useMemo(() => flattenMenu(Menu.navMain), []);

//   const handleInputChange = (value: string) => {
//     setSearchTerm(value);
//     if (!value.trim()) {
//       setFilteredItems([]);
//       return;
//     }

//     const filtered = allItems.filter((item) =>
//       item.label.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredItems(filtered);
//   };

//   const handleSelect = (item: any) => {
//     if (item.navigation) {
//       navigate(item.navigation);
//       dispatch(updatePageTitle(item.navigation));
//     } else {
//       navigate("/wip");
//       dispatch(updatePageTitle("wip"));
//     }
//     setSearchTerm("");
//     setOpen(false); // Close the dialog
//   };

//   return (
//     <>
//       {/* Always show the search icon */}
//       <SidebarMenuButton asChild tooltip="Search">
//         <span className="cursor-pointer" onClick={() => setOpen(true)}>
//           🔍
//         </span>
//       </SidebarMenuButton>

//       {/* ShadCN Command dialog for searching */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="sm:max-w-md p-0 overflow-hidden">
//           <Command>
//             <CommandInput
//               placeholder="Search the menu..."
//               value={searchTerm}
//               onValueChange={handleInputChange}
//             />
//             <CommandList>
//               {searchTerm && <CommandEmpty>No results found.</CommandEmpty>}
//               <CommandGroup heading="Menu Items">
//                 {filteredItems.map((item, idx) => (
//                   <CommandItem
//                     key={idx}
//                     onSelect={() => handleSelect(item)}
//                     className="flex justify-between"
//                   >
//                     <span>{item.label}</span>
//                     <span className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-600">
//                       {item.tag}
//                     </span>
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
export function SearchForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState<any[]>([]);

  const flattenMenu = (items: any[]): any[] => {
    return items.flatMap((item) => {
      const current = {
        label: item.menuname,
        tag: item.MenuType,
        navigation: item.navigation,
      };
      const subItems = item.SubMenus ? flattenMenu(item.SubMenus) : [];
      return [current, ...subItems];
    });
  };

  const allItems = React.useMemo(() => flattenMenu(Menu.navMain), []);

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      setFilteredItems([]);
      return;
    }

    const filtered = allItems.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleSelect = (item: any) => {
    if (item.navigation) {
      navigate(item.navigation);
      dispatch(updatePageTitle(item.navigation));
    } else {
      navigate("/wip");
      dispatch(updatePageTitle("wip"));
    }
    setSearchTerm("");
    setOpen(false);
  };

  return (
    <>
      <SidebarMenuButton asChild tooltip="Search">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
      flex items-center
      gap-2
      px-3 py-2
      rounded-md
      border border-gray-300
      bg-white dark:bg-gray-800
      text-gray-700 dark:text-gray-200
      shadow-sm
      hover:bg-gray-100 dark:hover:bg-gray-700
      focus:outline-none focus:ring-2 focus:ring-indigo-500
      transition-colors
      w-full
      max-w-xs
    "
          aria-label="Open search"
        >
          <Search className="w-5 h-5" />
          <span className="text-sm font-medium">Search..</span>
        </button>
      </SidebarMenuButton>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-xl shadow-lg border border-gray-200">
          <Command className="bg-white">
            <CommandInput
              placeholder="Type to search menu..."
              value={searchTerm}
              onValueChange={handleInputChange}
              className="px-4 py-3 text-sm border-b border-gray-200 focus:outline-none focus:ring-0"
            />
            <CommandList className="max-h-[300px] overflow-y-auto">
              {searchTerm && <CommandEmpty>No results found.</CommandEmpty>}
              <CommandGroup
                heading="Menu Items"
                className="px-4 py-2 text-gray-500 text-xs font-semibold uppercase"
              >
                {filteredItems.map((item, idx) => (
                  <CommandItem
                    key={idx}
                    onSelect={() => handleSelect(item)}
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
                  >
                    <span className="text-sm text-gray-800">{item.label}</span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                      {item.tag}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
