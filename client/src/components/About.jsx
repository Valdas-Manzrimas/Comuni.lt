import React from 'react';
import resumeFile from '../documents/resume.pdf';
const AboutUs = ({ classicHeader, darkTheme }) => {
  return (
    <section id='about' className={'section ' + (darkTheme ? 'bg-dark-1' : '')}>
      <div className={'container ' + (classicHeader ? '' : 'px-lg-5')}>
        {/* Heading */}
        <div className='position-relative d-flex text-center mb-5'>
          <h2
            className={
              'text-24  text-uppercase fw-600 w-100 mb-0 ' +
              (darkTheme ? 'text-light opacity-1' : 'text-light opacity-4')
            }
          >
            About barter
          </h2>
          <p
            className={
              'text-9 text-dark fw-600 position-absolute w-100 align-self-center lh-base mb-0 ' +
              (darkTheme ? 'text-white' : 'text-dark')
            }
          >
            Why choose bartering?
            <span className='heading-separator-line border-bottom border-3 border-primary d-block mx-auto' />
          </p>
        </div>
        {/* Heading end*/}
        <div className='row gy-5'>
          {/* About me content start */}
          <div className='col-lg-7 col-xl-8 text-center text-lg-start'>
            <h2
              className={
                'text-7 fw-600 mb-3 ' + (darkTheme ? 'text-white' : '')
              }
            >
              Features of <span className='text-primary'>bartering</span>
            </h2>
            <ul className={darkTheme ? 'text-white-50' : ''}>
              <li>
                There is a demand focus for things of a different kind.{' '}
                <ul>
                  <li>
                    Most often, parties trade goods and services for goods or
                    services that differ from what they are willing to forego.
                  </li>
                </ul>
              </li>
              <li>
                The parties of the barter transaction are both equal and free.{' '}
                <ul>
                  <li>
                    Neither party has advantages over the other, and both are
                    free to leave the trade at any point in time.
                  </li>
                </ul>
              </li>
            </ul>
            <a
              href='https://en.wikipedia.org/wiki/Barter'
              className='text-primary'
            >
              LINK -->!!! Barter system !!!
            </a>
            <p className={darkTheme ? 'text-white-50' : ''}>
              Since direct barter does not require payment in money, it can be
              utilized when money is in short supply, when there is little
              information about the credit worthiness of trade partners, or when
              there is a lack of trust between those trading. Barter is an
              option to those who cannot afford to store their small supply of
              wealth in money, especially in hyperinflation situations where
              money devalues quickly.[14]
            </p>
          </div>
          {/* About me content end */}
        </div>
        {/* projects rewards counting start */}
        <div
          className={
            'brands-grid separator-border mt-5 ' +
            (darkTheme ? 'separator-border-light' : '')
          }
        >
          <div className='row'>
            <div className='col-6 col-md-3'>
              <div className='featured-box text-center'>
                <h4
                  className={
                    'text-12  mb-0 ' +
                    (darkTheme ? 'text-white-50' : 'text-muted')
                  }
                >
                  <span>10</span>+
                </h4>
                <p className={'mb-0 ' + (darkTheme ? 'text-light' : '')}>
                  Years Experiance
                </p>
              </div>
            </div>
            <div className='col-6 col-md-3'>
              <div className='featured-box text-center'>
                <h4
                  className={
                    'text-12  mb-0 ' +
                    (darkTheme ? 'text-white-50' : 'text-muted')
                  }
                >
                  <span>250</span>+
                </h4>
                <p className={'mb-0 ' + (darkTheme ? 'text-light' : '')}>
                  Happy Clients
                </p>
              </div>
            </div>
            <div className='col-6 col-md-3'>
              <div className='featured-box text-center'>
                <h4
                  className={
                    'text-12  mb-0 ' +
                    (darkTheme ? 'text-white-50' : 'text-muted')
                  }
                >
                  <span>650</span>+
                </h4>
                <p className={'mb-0 ' + (darkTheme ? 'text-light' : '')}>
                  Projects Done
                </p>
              </div>
            </div>
            <div className='col-6 col-md-3'>
              <div className='featured-box text-center'>
                <h4
                  className={
                    'text-12  mb-0 ' +
                    (darkTheme ? 'text-white-50' : 'text-muted')
                  }
                >
                  <span>38</span>
                </h4>
                <p className={'mb-0 ' + (darkTheme ? 'text-light' : '')}>
                  Get Awards
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* projects rewards counting end */}
      </div>
    </section>
  );
};

export default AboutUs;
