import React, {useEffect,useState} from 'react';
import axios from 'axios'
import { Link as RouterLink} from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import ApplyNow from './ApplyNow';
import '../BasicStyle.css';
import './ApplyPage.css';
import { BaseUrl } from './../../constants.js'

export default function ApplyPage() {
  
  const [alljobs, setAllJobs] = useState([]);//get
  const [expandedJobs, setExpandedJobs] = useState({});
  const [showApplyNow, setShowApplyNow] = useState(false);

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
  }, [])
  // const [jobsList] = useState([  {
  //   id: 1,
  //   title: 'Frontend Developer',
  //   experienceRequired: '2-4 years',
  //   description: '---Job Description here---',
  //   datePosted: 'August 1, 2023',
  //   dateExpiration: 'August 31, 2023',
  // },
  // {
  //   id: 2,
  //   title: 'Backend Developer',
  //   experienceRequired: '3-5 years',
  //   description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //   datePosted: 'August 5, 2023',
  //   dateExpiration: 'September 5, 2023',
  // },
  // {
  //   id: 3,
  //   title: 'UI/UX Designer',
  //   experienceRequired: '2-3 years',
  //   description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  //   datePosted: 'August 10, 2023',
  //   dateExpiration: 'September 10, 2023',
  // },
  
  // ]);

  const applyNowProps = {
    someProp: 'Hello from App!',
    anotherProp: 42,
  };

  const toggleExpand = (job_id) => {
    setExpandedJobs((prevState) => ({
      ...prevState,
      [job_id]: !prevState[job_id],
    }));
  };
 
  return (  
    <div id="full-content" className="container mt-4">
      
        <RouterLink to="/">
      <i id="back-arrow" style={{position: 'absolute', top: '35px', left: '40px',}} className="fa fa-arrow-left" aria-hidden="true" />
      </RouterLink>
      <div>
      <h2 className="mb-4" style={{display:"inline"}}>Jobs Available </h2><hr />
      <RouterLink to="/applyPage/applyNow" style={{position: 'absolute', top: '35px', right: '40px',}}><Button variant="primary">Apply Now</Button></RouterLink>
      </div>
      {alljobs.length === 0 ? (
        <p>Currently, There are no Jobs available.</p>
      ) : (
        
        alljobs.map((job) => (
          <Card id="card" key={job.job_id} className="mb-3">
            <Card.Header>
              <Card.Title>{job.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Experience Required: {job.experience}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              {expandedJobs[job.job_id] ? (
                <div>
                  <p style={{fontWeight:"bolder"}}>---Description---</p>
                  <b>ddf</b>
                  <hr />
                  <p>{job.description}</p>
                  <p>Date Posted: {job.date_posted.slice(0,10)}</p>
                  <p>Last Date to Apply: {job.expiry_date.slice(0,10)}</p>
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
