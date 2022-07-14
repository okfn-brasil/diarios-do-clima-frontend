import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import CookieAlert from '@app/ui/components/cookieAlert/CookieAlert';
import Footer from '@app/ui/components/footer/Footer';
import Home from '@app/ui/pages/home/Home';

import { UserResponseModel } from './models/user.model';
import AccountService, { checkPlan } from './services/accounts';
import { userUpdate } from './stores/user.store';
import Menu from './ui/components/menu/Menu';
import RouteChangeManager from './ui/components/routeChangeManager/RouteChangeManager';
import AboutPage from './ui/pages/about/About';
import BecomePro from './ui/pages/becomePro/BecomePro';
import Plans from './ui/pages/plans/Plans';
import Purchase from './ui/pages/purchase/Purchase';
import Registration from './ui/pages/registration/registration';
import ReportsPage from './ui/pages/reports/Reports';
import Search from './ui/pages/search/Search';
import StartSearch from './ui/pages/startSearch/StartSearch';
import TermsPage from './ui/pages/terms/Terms';
import { tokenKeys } from './ui/utils/storage-utils';
import { urls } from './ui/utils/urls';

const App = () => {
  const dispatch = useDispatch();
  const accountService = new AccountService();
  const [showCookieAlert, setShowCookieAlert] = useState(!localStorage.getItem(tokenKeys.cookies));

  useEffect(() => {
    if(localStorage.getItem(tokenKeys.access)) {
      accountService.getUserData().then(
        (response: UserResponseModel) => {
          dispatch(userUpdate({
            id: response.id,
            email: response.email,
            full_name: response.full_name,
            plan_pro: checkPlan(response),
          }));
        });
    }
  }, []);

  const hideCookieAlert = () => {
    localStorage.setItem(tokenKeys.cookies, 'closed');
    setShowCookieAlert(false);
  };

  return (
    <div>
      <Router>
        <RouteChangeManager />
        <Fragment>
          {showCookieAlert && <CookieAlert onClick={hideCookieAlert} />}
          <Menu />
          <Routes>
            <Route path={urls.home.url} element={<Home />} />
            <Route path={urls.registration.url} element={<Registration />} />
            <Route path={urls.becomePro.url} element={<BecomePro />} />
            <Route path={urls.startSearch.url} element={<StartSearch />} />
            <Route path={urls.terms.url} element={<TermsPage />} />
            <Route path={urls.about.url} element={<AboutPage />} />
            <Route path={urls.reports.url} element={<ReportsPage />} />
            <Route path={urls.purchase.url} element={<Purchase />} />
            <Route path={urls.plans.url} element={<Plans />} />
            <Route path={urls.search.url} element={<Search />} />
          </Routes>
          <Footer />
        </Fragment>
      </Router>
    </div>
  );
};

export default App;
