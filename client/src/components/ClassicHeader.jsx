// ClassicHeader.jsx
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-scroll';
import { store, useAppDispatch, useAppSelector } from '../store/store';
import { logoutUser } from '../store/features/userSlice';

const ClassicHeader = ({ handleNavClick }) => {
  const [stickyHeader, setStickyHeader] = useState(false);
  const [isNavModalClose, setIsNavModalClose] = useState(true);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  useEffect(() => {
    console.log('Redux State:', currentUser);
  }, [currentUser]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const checkScrollTop = () => {
    let header = document.getElementsByClassName('primary-menu');

    if (header) {
      if (
        document.body.scrollTop > 180 ||
        document.documentElement.scrollTop > 180
      ) {
        setStickyHeader(true);
      } else {
        setStickyHeader(false);
      }
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', checkScrollTop);
  }

  return (
    <header id='header' className='sticky-top-slide'>
      {/* Navbar */}

      <nav
        className={
          'primary-menu navbar navbar-expand-lg navbar-dark bg-transparent border-bottom-0 sticky-top ' +
          (stickyHeader ? 'sticky-on' : '')
        }
      >
        <div className='container-fluid position-relative g-lg-4'>
          <div className='col-auto col-lg-2'>
            {/* Logo */}
            <Link
              smooth
              duration={500}
              style={{ cursor: 'pointer' }}
              className='logo'
              to='home'
              title='Barter site'
              onClick={(e) => {
                e.preventDefault();
                setIsNavModalClose(true);
              }}
            >
              {' '}
              <img src='images/logo-light.png' alt='Barter site' />{' '}
            </Link>
            {/* Logo End */}
          </div>
          <div className='col col-lg-8 navbar-accordion'>
            <button
              onClick={(e) => {
                setIsNavModalClose(!isNavModalClose);
              }}
              className={
                isNavModalClose
                  ? 'navbar-toggler ms-auto'
                  : 'navbar-toggler ms-auto show'
              }
              id='navbar-toggler'
              type='button'
            >
              <span />
              <span />
              <span />
            </button>
            <div
              id='header-nav'
              className={
                isNavModalClose
                  ? 'collapse navbar-collapse justify-content-center '
                  : 'show navbar-collapse justify-content-center'
              }
            >
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <Link
                    smooth
                    duration={500}
                    style={{ cursor: 'pointer' }}
                    spy
                    activeClass='active'
                    className='nav-link'
                    to='landing'
                    onClick={(e) => {
                      e.preventDefault();
                      setIsNavModalClose(true);
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    smooth
                    duration={500}
                    style={{ cursor: 'pointer' }}
                    spy
                    activeClass='active'
                    className='nav-link'
                    to='about'
                    onClick={(e) => {
                      e.preventDefault();
                      setIsNavModalClose(true);
                    }}
                  >
                    About
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    smooth
                    duration={500}
                    style={{ cursor: 'pointer' }}
                    spy
                    activeClass='active'
                    className='nav-link'
                    to='services'
                    onClick={(e) => {
                      e.preventDefault();
                      setIsNavModalClose(true);
                    }}
                  >
                    What I Do
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    smooth
                    duration={500}
                    style={{ cursor: 'pointer' }}
                    spy
                    activeClass='active'
                    className='nav-link'
                    to='resume'
                    onClick={(e) => {
                      e.preventDefault();
                      setIsNavModalClose(true);
                    }}
                  >
                    Resume
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    smooth
                    duration={500}
                    style={{ cursor: 'pointer' }}
                    spy
                    activeClass='active'
                    className='nav-link'
                    to='portfolio'
                    onClick={(e) => {
                      e.preventDefault();
                      setIsNavModalClose(true);
                    }}
                  >
                    Portfolio
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    smooth
                    duration={500}
                    style={{ cursor: 'pointer' }}
                    spy
                    activeClass='active'
                    className='nav-link'
                    to='testimonial'
                    onClick={(e) => {
                      e.preventDefault();
                      setIsNavModalClose(true);
                    }}
                  >
                    Client
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    smooth
                    duration={500}
                    style={{ cursor: 'pointer' }}
                    spy
                    activeClass='active'
                    className='nav-link'
                    to='contact'
                    onClick={(e) => {
                      e.preventDefault();
                      setIsNavModalClose(true);
                    }}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {currentUser && (
            <div className='navbar-accordion'>
              <span className='nav-link'>{currentUser.firstName}</span>
              <div className='dropdown'>
                <button
                  className='btn btn-primary dropdown-toggle btn-sm'
                  type='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Settings
                </button>
                <ul className='dropdown-menu'>
                  <li>
                    <a
                      className='dropdown-item'
                      href='/'
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {currentUser}
        </div>
      </nav>
      {console.log('navbar', store.getState())}
      {/* Navbar End */}
    </header>
  );
};

export default ClassicHeader;
