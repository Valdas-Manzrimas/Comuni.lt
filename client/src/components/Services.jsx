import React from 'react';

const Services = ({ classicHeader, darkTheme }) => {
  // services details
  const services = [
    {
      desc: 'Bartering is based on a simple concept: Two individuals negotiate to determine the relative value of their goods and services and offer them to one another in an even exchange. It is the oldest form of commerce, dating back to a time before hard currency even existed.',
      icon: 'fas fa-palette',
    },
    {
      desc: 'While the current senior generation bartered with the limited goods they had on hand (i.e., produce and livestock) or services they could personally render (i.e., carpentry and tailoring) to someone they knew, today most Americans have access to a nearly unlimited source of potential bartering partners through the internet.',
      icon: 'fas fa-desktop',
    },
    {
      desc: 'Virtually any item or service can be bartered if the parties involved agree to the terms of the trade. Individuals, companies, and countries can all benefit from such cashless exchanges, particularly if they are lacking hard currency to obtain goods and services.',
      icon: 'fas fa-pencil-ruler',
    },
    {
      desc: 'Bartering allows individuals to trade items that they own but are not using for items that they need, while keeping their cash on hand for expenses that cannot be paid through bartering, such as a mortgage, medical bills, and utilities.',
      icon: 'fas fa-paint-brush',
    },
    {
      desc: 'Bartering can have a psychological benefit because it can create a deeper personal relationship between trading partners than a typical monetized transaction. Bartering can also help people build professional networks and market their businesses.',
      icon: 'fas fa-chart-area',
    },
    {
      desc: 'On a broader level, bartering can result in the optimal allocation of resources by exchanging goods in quantities that represent similar values. Bartering can also help economies achieve equilibrium, which occurs when demand equals supply.',
      icon: 'fas fa-bullhorn',
    },
  ];

  return (
    <section
      id='services'
      className={'section ' + (darkTheme ? 'bg-dark-2' : 'bg-light')}
    >
      <div className={'container ' + (classicHeader ? '' : 'px-lg-5')}>
        {/* Heading */}
        <div className='position-relative d-flex text-center mb-5'>
          <h2
            className={
              'text-24  text-uppercase fw-600 w-100 mb-0 ' +
              (darkTheme ? 'text-white-50  opacity-1' : 'text-light  opacity-4')
            }
          >
            Bartering
          </h2>
          <p
            className={
              'text-9  fw-600 position-absolute w-100 align-self-center lh-base mb-0 ' +
              (darkTheme ? 'text-white' : 'text-dark')
            }
          >
            What is barter?
            <span className='heading-separator-line border-bottom border-3 border-primary d-block mx-auto' />
          </p>
        </div>
        {/* Heading end*/}
        {/* content start */}
        <div className='row'>
          <div className='col-lg-11 mx-auto'>
            <div className='row'>
              {services.length > 0 &&
                services.map((service, index) => (
                  <div className='col-md-6' key={index}>
                    <div className='featured-box style-3 mb-5'>
                      <div
                        className={
                          'featured-box-icon text-primary  shadow-sm rounded ' +
                          (darkTheme ? 'bg-dark-1' : 'bg-white')
                        }
                      >
                        <i className={service.icon} />
                      </div>
                      <h3 className={darkTheme ? 'text-white' : ''}>
                        {service.name}
                      </h3>
                      <p
                        className={'mb-0 ' + (darkTheme ? 'text-white-50' : '')}
                      >
                        {service.desc}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* content end */}
      </div>
    </section>
  );
};

export default Services;
