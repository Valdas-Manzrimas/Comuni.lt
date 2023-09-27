import { useState, useEffect } from 'react';
import Landing from '../../Landing';
import AboutUs from '../../About';
import Services from '../../Services';
import Resume from '../../Resume';
import Portfolio from '../../Portfolio';
import Testimonials from '../../Testimonials';
import Contact from '../../Contact';
import { commonConfig } from '../../../config/commonConfig';
import { Tooltip } from '../../utils/Tooltip';
import classicHeader from '../../ClassicHeader';
import PreLoader from '../../Preloader';

function Home() {
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const darkTheme = commonConfig.darkTheme;

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setisLoading(false);
    }, 1000);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const checkScrollTop = () => {
    let scrollTopBtn = document.getElementById('back-to-top');

    if (scrollTopBtn) {
      if (
        document.body.scrollTop > 400 ||
        document.documentElement.scrollTop > 400
      ) {
        setScrollTopVisible(true);
      } else {
        setScrollTopVisible(false);
      }
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', checkScrollTop);
  }

  const handleNavClick = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {isLoading && <PreLoader></PreLoader>}
      <div>
        <Landing
          classicHeader={classicHeader}
          darkTheme={darkTheme}
          handleNavClick={handleNavClick}
        ></Landing>
        <AboutUs classicHeader={classicHeader} darkTheme={darkTheme}></AboutUs>
        <Services
          classicHeader={classicHeader}
          darkTheme={darkTheme}
        ></Services>
        <Resume classicHeader={classicHeader} darkTheme={darkTheme}></Resume>
        <Portfolio
          classicHeader={classicHeader}
          darkTheme={darkTheme}
        ></Portfolio>
        <Testimonials
          classicHeader={classicHeader}
          darkTheme={darkTheme}
        ></Testimonials>
        <Contact classicHeader={classicHeader} darkTheme={darkTheme}></Contact>
      </div>
      {/* back to top */}
      <Tooltip text='Back to Top' placement='left'>
        <span
          id='back-to-top'
          className='rounded-circle'
          style={{ display: scrollTopVisible ? 'inline' : 'none' }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <i className='fa fa-chevron-up'></i>
        </span>
      </Tooltip>
    </>
  );
}

export default Home;
