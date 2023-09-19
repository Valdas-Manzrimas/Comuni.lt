import React from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const Landing = ({ classicHeader, darkTheme, handleNavClick }) => {
  return (
    <section id='landing'>
      <div className='hero-wrap'>
        <div className='hero-mask opacity-8 bg-dark' />

        {/* ---------------image background------------------ */}
        <div
          className='hero-bg parallax'
          style={{ backgroundImage: 'url("images/intro-bg.jpg")' }}
        ></div>

        <div className='hero-content section d-flex min-vh-100'>
          <div className='container my-auto'>
            <div className='row'>
              <div className='col-12 text-center'>
                <p className='text-7 fw-500 text-white mb-2 mb-md-3'>Welcome</p>
                <h2 className='text-16 fw-600 text-white mb-2 mb-md-3'>
                  <Typewriter
                    options={{
                      strings: [
                        'This is a BARTER page',
                        'Here you can exchange',
                        'Products or services',
                        'With others',
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </h2>
                <p className='text-5 text-light mb-4'>
                  Where the money is not a need
                </p>
                <Link
                  to='/login'
                  className='btn btn-outline-primary rounded-pill shadow-none mt-2'
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Sign in
                </Link>
                {/* <a
                  href='/register'
                  className='btn btn-outline-primary rounded-pill shadow-none mt-2'
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Sign up
                </a> */}
              </div>
            </div>
          </div>
          <a
            href='#about'
            className='scroll-down-arrow text-white smooth-scroll'
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about');
            }}
          >
            <span className='animated'>
              <i className='fa fa-chevron-down' />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Landing;
