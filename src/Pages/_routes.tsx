import {
  BrowserRouter,

  Routes as ReactRoutes,
  Route,
} from "react-router";
import Home from "./Home";
import NotFound from "./404";
import Login from "./Login/login";
import { Toaster } from "@/components/shadcn-ui/sonner";
import React, { Suspense } from "react";
import { lazy, LazyExoticComponent } from "react";
const Dashboard = lazy(() => import("./Dashboard"));
// const ProjectMaster = lazy(() => import("./Master/Project"));
const CompanyMaster = lazy(() => import("./Master/Company"));
const WIPPage = lazy(() => import("./../components/common/Wip"));
const EmployeeMaster = lazy(() => import("../Pages/Master/EmployeeMaster"));
const CountryMaster = lazy(() => import("./Master/Location/Country/Index"));
const CityMaster = lazy(() => import("./Master/Location/City/Index"));
const StateMaster = lazy(() => import("./Master/Location/State/Index"));
const ProjectMaster = lazy(() => import("./Master/Project/index"));
const ProjectLocation = lazy(() => import("./Master/ProjectLocation/index"));
const unitOfMeasurement = lazy(() => import("./Master/UnitOfMeasurement"));
const approvalMatrix = lazy(() => import("./Master/ApprovalMatrix/Index"));
const approvalGroup = lazy(
  () => import("./Master/ApprovalGroup/approvalgroup")
);
const Role = lazy(() => import("./Admin/Role"));
const userManagement = lazy(() => import("./Admin/UserManagement/Index"));
const menu = lazy(() => import("./Admin/Menu/index"));
const menuGroup = lazy(() => import("./Admin/MenuGroup/Index"));
const formMaster = lazy(() => import("./Admin/FormMaster/Index"));
const template = lazy(() => import("./Admin/Template/Index"));
const settingMaster = lazy(() => import("./Admin/SettingMaster/Index"));
const formAttribute = lazy(() => import("./Admin/FormAttribute/Index"));
const formAttributeDetail = lazy(
  () => import("./Admin/FormAttributeDetail/Index")
);
const itemMaster = lazy(() => import("./Admin/ItemMaster/Index"));
const Designation = lazy(() => import("./Master/Designation/designation"));
const Department = lazy(() => import("./Master/Department/Index"));
// const Client = lazy(() => import("./Master/Client/index"));
const ApprovalCategory = lazy(() => import("./newPages/ApprovalCategory"));
const ApprovalReason = lazy(() => import("./newPages/ApprovalReason"));
const ModeOfPayment = lazy(() => import("./newPages/ModeOfPayment"));
const CustomerGroup = lazy(() => import("./newPages/CustomerGroup"));
const CustomerMaster = lazy(() => import("./newPages/CustomerMaster"));
const Divison = lazy(() => import("./newPages/Divison"));
const BankMaster = lazy(() => import("./newPages/BankMaster"));
const ApprovalMatrixUI = lazy(() => import("./Master/ApprovalMatrixUI"));

export interface RouteItem {
  path: string;
  component: LazyExoticComponent<React.FC>;
}

export const routes: RouteItem[] = [
  {
    path: "/Dashboard",
    component: Dashboard,
  },
  {
    path: "Project",
    component: ProjectMaster,
  },
  {
    path: "Company",
    component: CompanyMaster,
  },
  {
    path: "wip",
    component: WIPPage,
  },
  {
    path: "EmployeeMaster",
    component: EmployeeMaster,
  },
  {
    path: "Country",
    component: CountryMaster,
  },
  {
    path: "State",
    component: StateMaster,
  },
  {
    path: "City",
    component: CityMaster,
  },
  {
    path: "projectLocation",
    component: ProjectLocation,
  },
  {
    path: "unitOfMeasurement",
    component: unitOfMeasurement,
  },
  {
    path: "ApprovalMatrix",
    component: approvalMatrix,
  },
  {
    path: "ApprovalGroup",
    component: approvalGroup,
  },
  {
    path: "role",
    component: Role,
  },
  {
    path: "userManagement",
    component: userManagement,
  },
  {
    path: "menu",
    component: menu,
  },
  {
    path: "menuGroup",
    component: menuGroup,
  },
  {
    path: "formMaster",
    component: formMaster,
  },
  {
    path: "template",
    component: template,
  },
  {
    path: "settingMaster",
    component: settingMaster,
  },
  {
    path: "formAttribute",
    component: formAttribute,
  },
  {
    path: "formAttributeDetail",
    component: formAttributeDetail,
  },
  {
    path: "itemMaster",
    component: itemMaster,
  },
  {
    path: "Designation",
    component: Designation,
  },
  {
    path: "Department",
    component: Department,
  },
  {
    path: "ApprovalCategory",
    component: ApprovalCategory,
  },
  {
    path: "ApprovalReason",
    component: ApprovalReason,
  },
  {
    path: "ModeOfPayment",
    component: ModeOfPayment,
  },
  {
    path: "CustomerGroup",
    component: CustomerGroup,
  },
  {
    path: "CustomerMaster",
    component: CustomerMaster,
  },
  {
    path: "Divison",
    component: Divison,
  },
  {
    path: "BankMaster",
    component: BankMaster,
  },
  {
    path: "ApprovalMatrixUI",
    component: ApprovalMatrixUI,
  },
];

const Routes = () => {
  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    
    // return children;
    return  children ;
  };
  return (
    <BrowserRouter >
      <Suspense
        fallback={
          <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </>
        }
      >
        <ReactRoutes>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          >
            {routes.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={`/home/${path}`}
                element={<Component />}
              />
            ))}
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </ReactRoutes>
      </Suspense>
      <Toaster />
    </BrowserRouter>
  );
};

export default Routes;
