import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Route } from '../types';
import { NavbarProps } from '../types';

const Navbar = (props: NavbarProps) => {

  // to handle conditional rendering of panels
  // tried Browser Router initially but did not seem to work; may have something to do with having no endpoints
  const handleClick = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    props.setCurrentlyOpen(target.id);
  };

  return(
    <nav>
      <button id="dashboard"
      onClick={handleClick}
      className={props.currentlyOpen === 'dashboard' ? 'active' : ''}>
        Dashboard
      </button>
      
      <button id="querylog" 
      onClick={handleClick} 
      className={props.currentlyOpen === 'querylog' ? 'active' : ''}>
        Query Log
      </button>
    </nav>
  )
};

export default Navbar;