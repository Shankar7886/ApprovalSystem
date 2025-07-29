import { AppSidebar1 } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn-ui/breadcrumb";
import { Separator } from "@/components/shadcn-ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/shadcn-ui/sidebar";
// import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
// import { useAppDispatch } from "@/Store/reduxhook";
import { useNavigate } from "react-router";
// import { useEffect } from "react";

export default function Page() {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean); // remove empty strings
  const PathName = pathSegments[pathSegments.length - 1];

  const goToDashboard = () => {
    navigate("/home/Dashboard");
    // dispatch(updatePageTitle("Dashboard"));
  };

  return (
   <SidebarProvider>
    <div className="flex min-h-screen w-full overflow-hidden">
      <AppSidebar1 />
      <SidebarInset className="flex flex-col w-full overflow-hidden">
        <header className="flex h-13 shrink-0 items-center gap-2  bg-white">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem
                  className="hidden md:block"
                  onClick={goToDashboard}
                  style={{ cursor: "pointer" }}
                >
                  Approval Management System
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {PathName || "NO TITLE"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-2">
          <Outlet />
        </div>
      </SidebarInset>
    </div>
  </SidebarProvider>
  );
}
