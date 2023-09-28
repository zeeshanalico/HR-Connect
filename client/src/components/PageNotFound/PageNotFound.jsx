import React from 'react';
import './PageNotFound.css'; // Import your custom CSS for styling

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Page Not Found</p>
      <p className="not-found-description">
        The page you are looking for might have been removed or does not exist.
      </p>
    </div>
  );
};

export default PageNotFound;
