import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [isNight, setIsNight] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // New state for hover

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const amPm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format

      setCurrentTime(
        `${formattedHours}:${String(minutes).padStart(2, '0')}:${String(
          seconds
        ).padStart(2, '0')} ${amPm}`
      );

      // Determine if it's night (assuming 7 PM to 6 AM as night)
      setIsNight(hours >= 19 || hours < 6);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const h2Styles = {
    fontSize: '36px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    color: isNight ? 'white' : 'blue',
    backgroundColor: isNight ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
    boxShadow: isHovered
      ? '0px 4px 10px rgba(0, 0, 0, 0.2)'
      : '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 1s ease-in-out', // Add transition for background-color
    padding: '10px',
    borderRadius: '5px',
  };


  // Handlers for hover events
  const handleMouseEnter = () => {
    setIsHovered(true); // Update the state to indicate hover
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Update the state to indicate no hover
  };

  return (
    <div style={{ width: 'fitcontent', margin: '10px auto' }}
    >
      <h2
        style={{ ...h2Styles}}
        onMouseEnter={handleMouseEnter} // Use the event handlers
        onMouseLeave={handleMouseLeave}
      >
        {currentTime}
      </h2>
    </div>
  );
};

export default Clock;
