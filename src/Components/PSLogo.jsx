import React from 'react';

const PSLogo = ({ size = 40 }) => {
  const scale = size / 40; // Base size is 40px
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="20" cy="20" r="20" fill="#1a1f2e" />
      
      {/* Triangle - Top */}
      <g transform={`translate(20, 7) scale(${scale * 0.7})`}>
        <path 
          d="M-5 3L0 -5L5 3Z" 
          stroke="#08BFB5" 
          strokeWidth="2.5" 
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      
      {/* Square - Left */}
      <g transform={`translate(8, 20) scale(${scale * 0.6})`}>
        <rect 
          x="-4" 
          y="-4" 
          width="8" 
          height="8" 
          stroke="#D98CB2" 
          strokeWidth="2.5" 
          fill="none"
        />
      </g>
      
      {/* Circle - Right */}
      <g transform={`translate(32, 20) scale(${scale * 0.6})`}>
        <circle 
          cx="0" 
          cy="0" 
          r="4.5" 
          stroke="#D65C5C" 
          strokeWidth="2.5" 
          fill="none"
        />
      </g>
      
      {/* Cross - Bottom */}
      <g transform={`translate(20, 33) scale(${scale * 0.6})`}>
        <path 
          d="M-4 -4L4 4M4 -4L-4 4" 
          stroke="#8290BA" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default PSLogo;
