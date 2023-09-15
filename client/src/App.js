import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import ClassicHeader from './components/ClassicHeader';
import { commonConfig } from './config/commonConfig';
import TermsAndConditions from './components/TermsAndConditions';
import Disclaimer from './components/Disclaimer';
import Login from './components/pages/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';

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

              <Route path='/login' element={<Login />} />
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
