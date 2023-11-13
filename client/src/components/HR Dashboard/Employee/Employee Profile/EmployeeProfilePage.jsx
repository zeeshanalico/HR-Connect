import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Link as RouterLink } from 'react-router-dom';
import SideBar from '../../SideBar';
import EmployeeProfile from './EmployeeProfile';
import { useLocation } from 'react-router';

export default function EmployeeProfilePage() {
 // const { employee } = props.location.state;
 //<EmployeeProfile employee={location} />
 //{location.state.employee.name}

 const location = useLocation();

  return (
    <div className="container-fluid" id="main">
          <div className="row row-offcanvas row-offcanvas-left">

        <SideBar />
        <div style={{width: "83.5%"}} className="mt-4">
        <h2 className="mt-2" style={{textAlign: "center"}}>Employee Profile</h2>
      <MDBContainer className="py-10 h-100" style={{position: "relative", width: "100%", marginTop: "-87px"}}>
      <RouterLink to="/hrdash/manageEmployee">
 <i id="back-arrow" style={{color:"white", position: 'relative', top: '50px', left: '35px', height:"5%" }} className="fa fa-arrow-left" />
 </RouterLink>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="10" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5" style={{fontSize:"22px", color: "black", textTransform: "capitalize"}}>{location.state.employee.name}</MDBTypography>
                  <hr style={{width: "80%"}} className="mt-0 mb-2" />
               <MDBCardText style={{fontSize: "18px", color: "black", textTransform: "capitalize"}}>{location.state.employee.job_name}</MDBCardText>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody style={{fontSize: "16px"}} className="p-4">
                    <MDBTypography style={{fontSize:"20px"}}>Employee Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-2">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>Email</MDBTypography>
                        <MDBCardText className="text-muted">{location.state.employee.email}</MDBCardText> 
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>Phone</MDBTypography>
                        <MDBCardText className="text-muted">{location.state.employee.phone_number}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-2">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>Department</MDBTypography>
                        <MDBCardText className="text-muted">{location.state.employee.dep_name}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>Gender</MDBTypography>
                        <MDBCardText className="text-muted">{location.state.employee.gender}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-2">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>Salary</MDBTypography>
                        <MDBCardText className="text-muted">{location.state.employee.salary?.toString()?.slice(0, -3)} PKR</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>Hire Date</MDBTypography>
                        <MDBCardText className="text-muted">{location.state.employee.hire_date?.toString()?.slice(0, 10)}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </div>
      </div>
    </div>
  );
}

//<Navbar type={"dashboard"} />
