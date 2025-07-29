import React from "react";
import RolePermission from "./RolePermission";
import Role from "./Role";

export default function Index() {
  const [pageType, setPageType] = React.useState("rolePermission");

  if (pageType === "createRole") {
    return <Role setPageType={setPageType} pageType={pageType} />;
  } else {
    return <RolePermission setPageType={setPageType} pageType={pageType} />;
  }
}
