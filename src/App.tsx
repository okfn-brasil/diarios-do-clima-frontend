import Menu from "./ui/components/menu";
import Home from "./ui/pages/home/Home";
import React, { Fragment, useEffect } from "react";
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
import { userUpdate } from "./stores/user.store";
import { tokenKeys } from "./ui/utils/storage-utils";
import RouteChangeManager from "./ui/components/routeChangeManager/RouteChangeManager";
import TermsPage from "./ui/pages/terms/Terms";
import AboutPage from "./ui/pages/about/About";
import ReportsPage from "./ui/pages/reports/Reports";

const App = () => {
  const dispatch = useDispatch();
  const accountService = new AccountService();
  let [showCookieAlert, setShowCookieAlert] = useState(!localStorage.getItem(tokenKeys.cookies));
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    if(localStorage.getItem(tokenKeys.access)) {
      accountService.getUserData(localStorage.getItem(tokenKeys.access) as string).then(
        (response: RegistrationResponse) => {
          dispatch(userUpdate({
            id: response.id,
            full_name: response.full_name,
            plan_pro: accountService.checkPlan(response),
          }));
      });
    }
  }, []);

  const hideCookieAlert = () => {
    localStorage.setItem(tokenKeys.cookies, 'closed');
    setShowCookieAlert(false);
  }

  return (
    <div>
      <Router>
        <RouteChangeManager />
        <Fragment>
          {showCookieAlert && <CookieAlert onClick={hideCookieAlert} />}
          <Menu isDesktop={isDesktop}/>
          <Routes>
            <Route path={urls.home.url} element={<Home />} />
            <Route path={urls.registration.url} element={<Registration />} />
            <Route path={urls.becomePro.url} element={<BecomePro isDesktop={isDesktop} />} />
            <Route path={urls.startSearch.url} element={<StartSearch isDesktop={isDesktop} />} />
            <Route path={urls.terms.url} element={<TermsPage isDesktop={isDesktop} />} />
            <Route path={urls.about.url} element={<AboutPage isDesktop={isDesktop} />} />
            <Route path={urls.reports.url} element={<ReportsPage isDesktop={isDesktop} />} />
          </Routes>
          <Footer />
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
