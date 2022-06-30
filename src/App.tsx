import Menu from "./ui/components/menu";
import Home from "./ui/pages/home/Home";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Registration from '/src/ui/pages/registration/Registration';
import CookieAlert from '/src/ui/components/cookieAlert/CookieAlert';
import Footer from '/src/ui/components/footer/Footer';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useState } from "react";
import { urls } from "./ui/utils/urls";
import BecomePro from "./ui/pages/becomePro/BecomePro";
import StartSearch from "./ui/pages/startSearch/StartSearch";

const App = () => {
  let [showCookieAlert, setShowCookieAlert] = useState(!sessionStorage.getItem('cookieAlertClosed'));
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const hideCookieAlert = () => {
    sessionStorage.setItem('cookieAlertClosed', 'closed');
    setShowCookieAlert(false);
  }

  return (
    <div>
        
      <Router>
        {showCookieAlert && <CookieAlert onClick={hideCookieAlert} />}
        <Menu isDesktop={isDesktop}/>
        <Routes>
          <Route path={urls.home.url} element={<Home />} />
          <Route path={urls.registration.url} element={<Registration />} />
          <Route path={urls.becomePro.url} element={<BecomePro isDesktop={isDesktop} />} />
          <Route path={urls.startSearch.url} element={<StartSearch isDesktop={isDesktop} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
