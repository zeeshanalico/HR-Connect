import React from 'react'
import EmployeeSideBar from '../Employee SideBar/EmployeeSideBar'
import EmployeeDashboard from './EmployeeDashboard'

export default function EmployeeDashboardPage() {
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <EmployeeSideBar />
      <EmployeeDashboard />
 </div>
 </div>  
  )
}

// import React from 'react'
// import EmployeeSideBar from '../Employee SideBar/EmployeeSideBar'
// import { useLocation } from 'react-router-dom';
// import EmployeeDashboard from './EmployeeDashboard'
// export default function EmployeeDashboardPage() {
//   const location = useLocation();
//   const roleID = location.state ? location.state.roleId : null;
//   console.log("role id in Employee Dashboard is", roleID);
//   if (roleID !== null && roleID === 2) {
//     return (
//       <div className="container-fluid" id="main">
//         <div className="row row-offcanvas row-offcanvas-left">
//           <EmployeeSideBar />
//           <EmployeeDashboard />
//         </div>
//       </div>
//     )
//   } else if (roleID !== null && roleID === 1) {
//     return (
//       <div style={{ textAlign: 'center', marginTop: '50px' }}>
//         <h1 style={{ fontSize: '24px', color: 'red' }}>Access Denied</h1>
//         <p style={{ fontSize: '16px' }}>You are not authorized to access this page.</p>
//         <p style={{ fontSize: '16px', color: 'gray' }}>Please contact the administrator for assistance.</p>
//       </div>
//     );
//   } else {
//     return (
//       <div style={{ textAlign: 'center', marginTop: '50px' }}>
//         <h1 style={{ fontSize: '24px', color: 'red' }}>Invalid Role</h1>
//         <p style={{ fontSize: '16px' }}>The role ID is not recognized.</p>
//         <p style={{ fontSize: '16px', color: 'gray' }}>Please check your role and try again.</p>
//       </div>
//     );
//   }

// }

   