import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link as RouterLink } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import ApplyNow from './ApplyNow';
import '../BasicStyle.css';
import './ApplyPage.css';
import { InputGroup, FormControl } from 'react-bootstrap';

import { BaseUrl } from './../../constants.js'

export default function ApplyPage() {

  const [locationFilter, setLocationFilter] = useState('');
  const [jobTitleFilter, setJobTitleFilter] = useState('');
  // const [minSalaryFilter, setMinSalaryFilter] = useState('');
  // const [maxSalaryFilter, setMaxSalaryFilter] = useState('');



  const [alljobs, setAllJobs] = useState([]);//get
  const [expandedJobs, setExpandedJobs] = useState({});
  console.log(alljobs);
  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getJobs');
      setAllJobs(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data jobs:', error);
      throw error;
    }
  };
  useEffect(() => {
    fetchData()
  }, []);

  const toggleExpand = (job_id) => {
    setExpandedJobs((prevState) => ({
      ...prevState,
      [job_id]: !prevState[job_id],
    }));
  };

  return (
    <div id="full-content" className="container mt-4">

      <RouterLink to="/">
        <i id="back-arrow" style={{ position: 'absolute', top: '35px', left: '40px', }} className="fa fa-arrow-left" aria-hidden="true" />
      </RouterLink>
      <div>
        <h2 className="mb-4" style={{ display: "inline" }}>Jobs Available </h2><hr />
        <InputGroup className="mb-4">
          <FormControl
            placeholder="Filter by Job Title"
            value={jobTitleFilter}
            onChange={(e) => setJobTitleFilter(e.target.value)}
          />
          <FormControl
            placeholder="Filter by Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          {/* <FormControl
            placeholder="Min Salary"
            type="number"
            value={minSalaryFilter}
            onChange={(e) => setMinSalaryFilter(e.target.value)}
          />
          <FormControl
            placeholder="Max Salary"
            type="number"
            value={maxSalaryFilter}
            onChange={(e) => setMaxSalaryFilter(e.target.value)}
          /> */}
        </InputGroup>
        {/* <RouterLink to="/applyPage/applyNow" style={{ position: 'absolute', top: '35px', right: '40px', }}><Button variant="primary">Apply Now</Button></RouterLink> */}
      </div>
      {alljobs.length === 0 ? (
        <p>Currently, There are no Jobs available.</p>
      ) : (

        alljobs
          .filter((job) =>
            job.location.toLowerCase().includes(locationFilter.toLowerCase())
          )
          .filter((job) =>
            job.title.toLowerCase().includes(jobTitleFilter.toLowerCase())
          )
          // .filter((job) =>
          //   job.salary >= (minSalaryFilter ? parseFloat(minSalaryFilter) : 0)
          //   && job.salary <= (maxSalaryFilter ? parseFloat(maxSalaryFilter) : Number.MAX_VALUE)
          // )
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
    </div>
  );
}
