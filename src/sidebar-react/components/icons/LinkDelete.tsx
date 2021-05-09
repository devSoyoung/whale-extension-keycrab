import React, { useEffect, useState } from 'react';

const DEFAULT_SIZE = 8;
const HOVERED_SIZE = 12;

const LinkDelete = ({ color = '#c6c6c6', hoveredColor = 'red' }) => {
  const [isHovered, setHovered] = useState(false);
  const [size, setSize] = useState(DEFAULT_SIZE);

  useEffect(() => {
    setSize(isHovered ? HOVERED_SIZE : DEFAULT_SIZE);
  }, [isHovered]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <line
        x1={size}
        y1={size}
        x2="0"
        y2="0"
        stroke={isHovered ? hoveredColor : color}
      />
      <line
        x1={size}
        y1="0"
        x2="0"
        y2={size}
        stroke={isHovered ? hoveredColor : color}
      />
    </svg>
  );
};

export default LinkDelete;
