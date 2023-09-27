// App.js
import './App.scss';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import ClassicHeader from './components/ClassicHeader';
import { commonConfig } from './config/commonConfig';
import TermsAndConditions from './components/TermsAndConditions';
import Disclaimer from './components/Disclaimer';
import Login from './components/pages/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Landing from './components/Landing';

function App() {
  const classicHeader = commonConfig.classicHeader;
  const darkTheme = commonConfig.darkTheme;

  return (
    <>
      <div
        style={{ position: 'relative' }}
        className={classicHeader ? '' : 'side-header'}
      >
        <div id='main-wrapper'>
          <ClassicHeader></ClassicHeader>

          <div id='content' role='main'>
            <Routes>
              <Route path='/' element={<Home />} />

              <Route
                path='/login'
                element={
                  <Landing
                    children={<Login darkTheme={darkTheme} />}
                    darkTheme={darkTheme}
                  />
                }
              />
            </Routes>
          </div>
          <Footer classicHeader={classicHeader} darkTheme={darkTheme}></Footer>
        </div>

        <TermsAndConditions darkTheme={darkTheme}></TermsAndConditions>
        <Disclaimer darkTheme={darkTheme}></Disclaimer>
      </div>
    </>
  );
}

export default App;
