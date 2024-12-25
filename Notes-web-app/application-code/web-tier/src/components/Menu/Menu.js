// Menu.js
import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';
import { Link } from "react-router-dom";

const Menu = ({ open, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  return (
      <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
        <nav>
          <ul>
            <li>
              <Link to="/" tabIndex={tabIndex}>
                <span role="img" aria-label="home">🏠</span>
                Home
              </Link>
            </li>

            {isLoggedIn && (
                <li>
                  <Link to="/Notes" tabIndex={tabIndex}>
                    <span role="img" aria-label="notes">📋</span>
                    My Notes
                  </Link>
                </li>
            )}

            {!isLoggedIn && (
                <li>
                  <Link to="/login" tabIndex={tabIndex}>
                    <span role="img" aria-label="login">🔐</span>
                    Login
                  </Link>
                </li>
            )}

            {isLoggedIn && (
                <li>
                  <Link
                      to="/"
                      tabIndex={tabIndex}
                      onClick={() => {
                        localStorage.setItem('isLoggedIn', false);
                        window.location.href = '/';
                      }}
                  >
                    <span role="img" aria-label="logout">🔓</span>
                    Logout
                  </Link>
                </li>
            )}
          </ul>
        </nav>
      </StyledMenu>
  );
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;