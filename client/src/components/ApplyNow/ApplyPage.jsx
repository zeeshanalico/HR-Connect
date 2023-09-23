import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import ApplyNow from './ApplyNow';
import { Card, Button, InputGroup, FormControl, Pagination } from 'react-bootstrap';

import '../BasicStyle.css';
import './ApplyPage.css';

import { BaseUrl } from './../../constants.js';

export default function ApplyPage() {
  const [filters, setFilters] = useState({
    location: '',
    jobTitle: '',
  });

  const [alljobs, setAllJobs] = useState([]); // get
  const [expandedJobs, setExpandedJobs] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(5);

  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getJobs');
      setAllJobs(response.data);
    } catch (error) {
      console.error('Error fetching data jobs:', error);
      throw error;
    }
  };


  const toggleExpand = (job_id) => {
    setExpandedJobs((prevState) => ({
      ...prevState,
      [job_id]: !prevState[job_id],
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setJobsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredJobs = alljobs
    .filter((job) =>
      job.location.toLowerCase().includes(filters.location.toLowerCase())
    )
    .filter((job) =>
      job.title.toLowerCase().includes(filters.jobTitle.toLowerCase())
    )
    .filter((job) =>
      job.expiry_date >= currentDate
    );
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);


  return (
    <div id="full-content" className="container mt-4">
      {/* ... Your existing code ... */}
      <div>
        <h2 className="mb-4" style={{ display: 'inline' }}>
          Jobs Available{' '}
        </h2>
        <hr />
        <InputGroup className="mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl
            name="jobTitle"
            placeholder="Filter by Job Title"
            value={filters.jobTitle}
            onChange={handleFilterChange}
          />
          <FormControl
            name="location"
            placeholder="Filter by Location"
            value={filters.location}
            onChange={handleFilterChange}
          />
          <label htmlFor="itemsPerPage" style={{ marginRight: '10px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Items Per Page: </label>
          <select
            name="itemsPerPage"
            id="itemsPerPage"
            onChange={handleItemsPerPageChange}
            value={jobsPerPage}
            style={{
              padding: '5px',
              height: '40px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </InputGroup>


      </div>
      {alljobs.length === 0 ? (
        <p>Currently, There are no Jobs available.</p>
      ) : (
        currentJobs
          .filter((job) =>
            job.location.toLowerCase().includes(filters.location.toLowerCase())
          )
          .filter((job) =>
            job.title.toLowerCase().includes(filters.jobTitle.toLowerCase())
          )
          // .filter(job=>
          //   job.expiry_date >= currentDate)
          .map((job) => (
            <Card id="card" key={job.job_id} className="mb-3">
              <Card.Header>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Experience Required: {job.experience}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Location: {job.location}</Card.Subtitle>
              </Card.Header>
              <Card.Body>
                {expandedJobs[job.job_id] ? (
                  <div>
                    <p style={{ fontWeight: "bolder" }}>---Description---</p>
                    <p>{job.description}</p>
                    <hr />
                    <p>Date Posted: {job.date_posted.slice(0, 10)}</p>
                    <p>Salary : {job.salary}</p>
                    {/* <p>Location: {job.location}</p> */}
                    <p>Last Date to Apply: {job.expiry_date.slice(0, 10)}</p>
                    <RouterLink
                      to={{
                        pathname: '/applyPage/applyNow',
                        search: `?job_title=${job.title}&job_id=${job.job_id}`,
                        state: { job_title: job.title }
                      }}
                      style={{ position: 'absolute', top: '35px', right: '40px', }}><Button variant="primary">Apply Now</Button></RouterLink>
                    {/* to={{pathname: '/applyPage/applyNow', state: { jobTitle: job.title } }} */}
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
      <Pagination>
        {Array.from({ length: Math.ceil(alljobs.length / jobsPerPage) }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}
