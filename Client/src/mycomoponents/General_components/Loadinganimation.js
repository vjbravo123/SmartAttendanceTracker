import React from 'react';
import '../../css/Genral_components/LoadingAnimation.css'; // Replace with the appropriate path to your CSS file

const LoadingAnimation = () => (
  <div className="loading-animation">
    <div className="spinner"></div>
    <span className='spann'>Loading...</span>
  </div>
);

export default LoadingAnimation;
