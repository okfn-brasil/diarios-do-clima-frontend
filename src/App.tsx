import Menu from "./ui/components/menu";
import Home from "./ui/pages/home/Home";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Registration from './ui/pages/registration/registration';
import CookieAlert from '/src/ui/components/cookieAlert/CookieAlert';
import Footer from '/src/ui/components/footer/Footer';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useState } from "react";
import { urls } from "./ui/utils/urls";
import BecomePro from "./ui/pages/becomePro/BecomePro";
import StartSearch from "./ui/pages/startSearch/StartSearch";
import AccountService from "./services/accounts";
import { RegistrationResponse } from "./models/registration.model";
import { useDispatch } from "react-redux";
import { userUpdate, userReset } from "./stores/user.store";

const App = () => {
  const dispatch = useDispatch();
  const accountService = new AccountService();
  let [showCookieAlert, setShowCookieAlert] = useState(!localStorage.getItem('cookieAlertClosed'));
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  

  if(localStorage.getItem('tk')) {
    accountService.getUserData().then(
      (response: RegistrationResponse) => {
        dispatch(userUpdate({
          id: response.id,
          full_name: response.full_name,
          plan_pro: accountService.checkPlan(response),
        }));
    }).catch(err => {
      if(err == 401) {
        console.log(err)
        localStorage.removeItem('tk');
        dispatch(userReset());
      }
    });
  }

  const hideCookieAlert = () => {
    localStorage.setItem('cookieAlertClosed', 'closed');
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
