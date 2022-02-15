import React from 'react';
import './index.css'

const Header: React.FC = () => {
  return (
    <>
      <div className='navigation'>
        {/* <div className='banner'>
          <img src={banner} alt='banner'/>
        </div> */}
        <div className='inciter'>
          <h1>Inciter Tech</h1>
          <h2>Food Services</h2>
        </div>
      </div>
    </>
  );
}

export default Header;