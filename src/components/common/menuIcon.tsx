import {
  Settings,
  Layers,
  MapPin,
  FileBarChart,
  ClipboardList,
  UserCog,
  CreditCard,
  Activity,
  FileText,
  Microscope,
} from "lucide-react";

import React from "react";

interface GetMenuIconProps {
  menuid: number;
  state?: string;
}

export const GetMenuIcon: React.FC<GetMenuIconProps> = ({ menuid, state }) => {
  const iconMapping: Record<number, React.ReactNode> = {
    1: <Activity className="sidebar-icon" />,
    2: <Layers className="sidebar-icon" />,
    3: <MapPin className="sidebar-icon" />,
    13: <FileBarChart className="sidebar-icon" />,
    14: <ClipboardList className="sidebar-icon" />,
    24: (
      <UserCog
        className={
          state !== "collapsed"
            ? "sidebar-adminicon"
            : "sidebar-adminicon-collpase"
        }
      />
    ),
    39: <FileText className="sidebar-icon" />,
    43: <Microscope className="sidebar-icon" />,
    1033: <CreditCard className="sidebar-icon" />,
  };
  return iconMapping[menuid] || <Settings className="sidebar-icon" />;
};
