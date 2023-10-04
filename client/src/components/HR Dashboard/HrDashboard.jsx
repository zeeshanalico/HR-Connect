import React from 'react'
import MainContent from './Department/MainContent';
import SideBar from './SideBar';

export default function HrDashboard() {
  return (

    <div className="container-fluid" id="main">
      <div className="row row-offcanvas" >
        <SideBar />
        <MainContent />
      </div>
    </div>
  )
}
// import React from 'react'
// import MainContent from './Department/MainContent';
// import SideBar from './SideBar';
// import { useLocation } from 'react-router-dom';
// export default function HrDashboard() {
//   const location = useLocation();
//   const roleID = location.state ? location.state.roleId : null;
//   if (roleID !== null && roleID === 1) {
//     return (
//       <div className="container-fluid" id="main">
//         <div className="row row-offcanvas" >
//           <SideBar />
//           <MainContent />
//         </div>
//       </div>
//     )
//   } else if(roleID !== null && roleID === 1){
//     return (
//       <div style={{ textAlign: 'center', marginTop: '50px' }}>
//         <h1 style={{ fontSize: '24px', color: 'red' }}>Access Denied</h1>
//         <p style={{ fontSize: '16px' }}>You are not authorized to access this page.</p>
//         <p style={{ fontSize: '16px', color: 'gray' }}>Please contact the administrator for assistance.</p>
//       </div>
//     );
//   }else {
//     return (
//       <div style={{ textAlign: 'center', marginTop: '50px' }}>
//         <h1 style={{ fontSize: '24px', color: 'red' }}>Invalid Role</h1>
//         <p style={{ fontSize: '16px' }}>The role ID is not recognized.</p>
//         <p style={{ fontSize: '16px', color: 'gray' }}>Please check your role and try again.</p>
//       </div>
//     );
//   }

// }