import React from 'react';
import SideBar from '../../SideBar';
import PostJob from './PostJob';

export default function PostJobPage() {
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <SideBar />
      <PostJob />
      
 </div>
 </div>  
  )
}
