import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';
import {
  Link
} from "react-router-dom";

const Menu = ({ open, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/" tabIndex={tabIndex} style={{outline:"none",border:"none"}}><div style={{paddingBottom : "2em", float:"left"}}><span aria-hidden="true">🏠</span> Home</div></Link>
            </li>
            {isLoggedIn && (
              <li>
              <Link to="/Notes" tabIndex={tabIndex} style={{outline:"none",border:"none"}}><div style={{paddingBottom : "2em", float:"left"}}><span aria-hidden="true">📋</span> My Notes</div></Link>
            </li>
            )}
            
            {!isLoggedIn && (
              <li>
                <Link to="/login" tabIndex={tabIndex} style={{outline:"none",border:"none"}}><div style={{paddingBottom : "2em", float:"left"}}><span aria-hidden="true">🔐</span> Login</div></Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to="/" tabIndex={tabIndex} style={{outline:"none",border:"none"}} ><div style={{paddingBottom : "2em", float:"left"}} onClick={() => { localStorage.setItem('isLoggedIn', false); window.location.href = '/'; }}><span aria-hidden="true">🔓</span> Logout</div></Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </StyledMenu>
  );
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;