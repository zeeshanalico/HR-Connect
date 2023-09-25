import React from "react";
import EmployeeSideBar from "../Employee SideBar/EmployeeSideBar";
import ViewProfile from "./ViewProfile";

export default function ViewProfilePage() {
  return (
    <div className="container-fluid" id="main">
      <div className="row row-offcanvas row-offcanvas-left">
        <EmployeeSideBar />
        <ViewProfile />
      </div>
    </div>
  );
}
