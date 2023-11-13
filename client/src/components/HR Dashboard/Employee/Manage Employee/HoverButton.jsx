import React, { useState } from 'react';

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
};

const iconStyle = {
  marginLeft: '10px',
  transform: 'scaleX(1)', // Initial scale
  transition: 'transform 0.3s ease',
};

const svgStyle = {
  width: '20px',
  height: '20px',
};

const HoverButton = ({ label, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    // Scale the icon on hover
    document.getElementById('icon').style.transform = 'scaleX(1.5)';
    setHovered(true);
  };

  const handleMouseLeave = () => {
    // Reset the icon scale when not hovering
    document.getElementById('icon').style.transform = 'scaleX(1)';
    setHovered(false);
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >      <svg
        id="icon"
        style={iconStyle}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M16.59 7L12 11.59 7.41 7 6 8.41l6 6 6-6z" />
      </svg>
    </button>
  );
};

export default HoverButton;
