import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import ApplyNow from './ApplyNow';
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './ApplyPage.css';
import { BaseUrl } from './../../constants.js';

export default function ApplyPage() {
  // State for filters and pagination
  const [filters, setFilters] = useState({
    location: '',
    jobTitle: '',
  });
  const [allJobs, setAllJobs] = useState([]);
  const [expandedJobs, setExpandedJobs] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getJobsforApply');
      setAllJobs(response.data);
    } catch (error) {
      console.error('Error fetching data jobs:', error);
      throw error;
    }
  };

  // Toggle expand for job details
  const toggleExpand = (job_id) => {
    setExpandedJobs((prevState) => ({
      ...prevState,
      [job_id]: !prevState[job_id],
    }));
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setCurrentPage(0); 
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0); 
  };

  // Filter jobs based on filters and current page
  const currentDate = new Date().toISOString().split('T')[0];
  const filteredJobs = allJobs
    .filter((job) =>
      job.location.toLowerCase().includes(filters.location.toLowerCase())
    )
    .filter((job) =>
      job.title.toLowerCase().includes(filters.jobTitle.toLowerCase())
    )
    .filter((job) =>
      job.expiry_date >= currentDate
    );
  const offset = currentPage * itemsPerPage;
  const currentJobs = filteredJobs.slice(offset, offset + itemsPerPage);

  return (
    <div className="apply-page">
      <RouterLink to="/">
        <i id="back-arrow" style={{ position: 'absolute', color: 'white', top: '35px', left: '40px', }} className="fa fa-arrow-left" aria-hidden="true" />
      </RouterLink>
      <div className="page-header">

        <h2 className='titleof' style={{ margin: '50px 0 -40px 30px' }} >Jobs Available</h2>
        <hr />
        <InputGroup className="filter-inputs">
          <FormControl
            className='formcont'
            name="jobTitle"
            placeholder="Filter by Job Title"
            value={filters.jobTitle}
            onChange={handleFilterChange}
            autoComplete="off"
          />
          <FormControl
            className='formcont'
            name="location"
            placeholder="Filter by Location"
            value={filters.location}
            onChange={handleFilterChange}
            autoComplete="off"
          />
          <label clasName='pageLabel' htmlFor="itemsPerPage" style={{ color: "white", marginTop: '30px' }}>Items Per Page:&ensp;</label>
          <select
            name="itemsPerPage"
            id="itemsPerPage"
            style={{ margin: '30px auto' }}
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </InputGroup>
      </div>
      <span style={{ position: 'fixed', top: '300px', left: '600px', width: '400px' }}>
        <span className="page-header">
          <span style={{ width: '420px' }} class="animated-text">"At TEHCHNOHUB, every job opening is an opportunity to be part of something bigger. Join us, and let's redefine success together."</span>
        </span>

      </span>
      {allJobs.length === 0 ? (
        <p className="no-jobs-message">Currently, There are no Jobs available.</p>
      ) : (
        currentJobs.map((job) => (
          <Card key={job.job_id} className="job-card">
            <Card.Header>
              <Card.Title>{job.title}</Card.Title>
              <Card.Subtitle>Experience Required: {job.experience}</Card.Subtitle>
              <Card.Subtitle>Location: {job.location}</Card.Subtitle>
            </Card.Header>
            <Card.Body>

              {expandedJobs[job.job_id] ? (
                <div>
                  <p>---Description---</p>
                  <p>{job.description}</p>
                  <hr className='hr1' />
                  <p>Date Posted: {job.date_posted.slice(0, 10)}</p>
                  <p>Salary: {job.salary}</p>
                  <p>Last Date to Apply: {job.expiry_date.slice(0, 10)}</p>
                  <RouterLink
                    to={{
                      pathname: '/applyPage/applyNow',
                      search: `?job_title=${job.title}&job_id=${job.job_id}`,
                      state: { job_title: job.title },
                    }}
                  >
                    <Button variant="primary">Apply Now</Button>
                  </RouterLink>
                </div>
              ) : null}
            </Card.Body>
            <Card.Footer>
              <Button variant="link" onClick={() => toggleExpand(job.job_id)}>
                {expandedJobs[job.job_id] ? 'show less' : 'show details'}
              </Button>
            </Card.Footer>
          </Card>
        ))
      )}

      <div style={{ margin: '0 17%' }}>

        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={Math.ceil(filteredJobs.length / itemsPerPage)}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
        />
      </div>
    </div>
  );
}
