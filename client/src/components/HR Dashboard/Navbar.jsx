import React from 'react'
import { useNavigate } from "react-router-dom";
import './Navbar.css'
import { BaseUrl } from '../../constants';
import Toast from '../../UIModules/Toast/Toast';
import axios from 'axios';

export default function Navbar(props) {

    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(BaseUrl + '/logout');
      if (response.data.success) {
        Toast("You're Logout")
        navigate('/Login')
      }
      else {
        Toast("Issue Occured")
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
     props.type === "dashboard" ? (
    <nav id="Navbar" style={{marginTop:'-2.5px'}} aria-label="breadcrumb">
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a href="#">Home</a></li>

    <li className="breadcrumb-item ml-auto">
      {/* <RouterLink to="/Login"> */}
        <button className="btn btn-danger logout" onClick={handleLogout}>
          Logout
        </button>
        {/* </RouterLink> */}
       </li>
    </ol>
  </nav> ) : (
  <nav id="Navbar" aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><a href="#basic-information">Basic Information</a></li>
    <li className="breadcrumb-item"><a href="#professional-information">Professional Information</a></li>
  <li className="breadcrumb-item ml-auto">
    {/* <RouterLink to="/Login">
      <button className="btn btn-danger">
        Logout
      </button>
      </RouterLink> */}
     </li>
  
  </ol>
</nav> )
  
  ) 

}


// import React from 'react'
// import { Link as RouterLink } from "react-router-dom";
// import './Navbar.css'
// import Toast from '../../UIModules/Toast/Toast';
// import axios from 'axios';
// import { Navigate } from 'react-router-dom';
// import { BaseUrl } from '../../constants';


// export default function Navbar(props) {

//   const navigate = Navigate();

//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(BaseUrl + '/logout');
//       if (response.data.success) {
//         Toast("You're Logout")
//         navigate('/Login')
//       }
//       else {
//         Toast("Issue Occured")
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//      props.type === "dashboard" ? (
//     <nav id="Navbar" aria-label="breadcrumb">
//     <ol className="breadcrumb">
//       <li className="breadcrumb-item"><a href="#">Home</a></li>

//     <li className="breadcrumb-item ml-auto">
//         <button className="btn btn-danger" onClick={handleLogout}>
//           Logout
//         </button>
//        </li>
//     </ol>
//   </nav> ) : (
//   <nav id="Navbar" aria-label="breadcrumb">
//   <ol className="breadcrumb">
//     <li className="breadcrumb-item"><a href="#basic-information">Basic Information</a></li>
//     <li className="breadcrumb-item"><a href="#professional-information">Professional Information</a></li>
//   <li className="breadcrumb-item ml-auto">
//       <button className="btn btn-danger" onClick={handleLogout}>
//         Logout
//       </button>
      
//      </li>
  
//   </ol>
// </nav> )
  
//   ) 

// }

