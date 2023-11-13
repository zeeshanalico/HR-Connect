import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MDBBreadcrumb, MDBBreadcrumbItem } from 'mdb-react-ui-kit';
import SideBar from '../../SideBar';
import { useLocation } from 'react-router';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';


export default function ApplicantProfile() {

  const location = useLocation();
  const navigate = useNavigate();


  const handleBackClick = () => {
    navigate(`/hrdash/viewApplications`);
  };


  return(
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
 <SideBar />
 
 <div style={{width: "83.5%"}} className="mt-4">
      <MDBContainer className="py-10 h-100" style={{position: "relative", height:"80%", width: "100%", marginTop: "-35px"}}>
      <RouterLink to="/hrdash/viewApplications">
 <i id="back-arrow" style={{color:"white", position: 'relative', top: '45px', left: '35px', height:"5%" }} className="fa fa-arrow-left" />
 </RouterLink>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="10" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5" style={{fontSize:"22px", color: "black", textTransform: "capitalize"}}>{location.state.application.applicant_name}</MDBTypography>
                  <hr style={{width: "80%"}} className="mt-0 mb-2" />
                  <div style={{display:"flex", justifyContent:"space-around", width:"25%", marginLeft:"7rem"}}>
                  <a href={location.state.application.linkedin_profile_url.toString()}><MDBIcon fab icon="linkedin me-3" size="lg" /></a>
                      <a href={location.state.application.github_profile_url.toString()}><MDBIcon fab icon="github me-3" size="lg" /></a>
                      </div>
               <MDBCardText style={{fontSize: "18px", color: "black", textTransform: "capitalize"}}></MDBCardText>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody style={{fontSize: "16px"}} className="p-4">
                    <MDBTypography style={{fontSize:"20px"}}>Applicant Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>Email</MDBTypography>
                        <MDBCardText className="text-muted">{location.state.application.email}</MDBCardText> 
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>Phone</MDBTypography>
                        <MDBCardText className="text-muted">{location.state.application.phone_number}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>Department</MDBTypography>
                        <MDBCardText className="text-muted">{location.state.application.dep_name}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>Gender</MDBTypography>
                        <MDBCardText className="text-muted">{location.state.application.gender}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>CGPA</MDBTypography>
                      <MDBCardText className="text-muted">{location.state.application.cgpa}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>University</MDBTypography>
                        <MDBCardText className="text-muted">{location.state.application.university}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>Applied For</MDBTypography>
                      <MDBCardText className="text-muted">{location.state.application.title}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>Experience</MDBTypography>
                        <MDBCardText className="text-muted">{location.state.application.experience}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>Qualification</MDBTypography>
                      <MDBCardText className="text-muted">{location.state.application.qualification}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography style={{fontSize:"18px"}}>Degree</MDBTypography>
                        <MDBCardText className="text-muted">{location.state.application.degree}</MDBCardText>
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

  )

}
