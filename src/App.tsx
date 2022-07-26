import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { UserResponseModel } from '@app/models/user.model';
import AccountService, { checkPlan } from '@app/services/accounts';
import { userUpdate } from '@app/stores/user.store';
import CookieAlert from '@app/ui/components/cookieAlert/CookieAlert';
import Footer from '@app/ui/components/footer/Footer';
import Menu from '@app/ui/components/menu/Menu';
import RouteChangeManager from '@app/ui/components/routeChangeManager/RouteChangeManager';
import AboutPage from '@app/ui/pages/about/About';
import BecomePro from '@app/ui/pages/becomePro/BecomePro';
import CnpjPage from '@app/ui/pages/cnpjPage/CnpjPage';
import Home from '@app/ui/pages/home/Home';
import MyAlerts from '@app/ui/pages/loggedArea/myAlerts/MyAlerts';
import MyReports from '@app/ui/pages/loggedArea/myReports/MyReports';
import UserInfo from '@app/ui/pages/loggedArea/userInfo/UserInfo';
import NotFound from '@app/ui/pages/notFound/NotFound';
import Plans from '@app/ui/pages/plans/Plans';
import Purchase from '@app/ui/pages/purchase/Purchase';
import Registration from '@app/ui/pages/registration/registration';
import ReportsPage from '@app/ui/pages/reports/Reports';
import Search from '@app/ui/pages/search/Search';
import StartSearch from '@app/ui/pages/startSearch/StartSearch';
import TermsPage from '@app/ui/pages/terms/Terms';
import { tokenKeys } from '@app/ui/utils/storage-utils';
import { urls } from '@app/ui/utils/urls';

const App = () => {
  const dispatch = useDispatch();
  const accountService = new AccountService();
  const [showCookieAlert, setShowCookieAlert] = useState(!localStorage.getItem(tokenKeys.cookies));

  useEffect(() => {
    if(localStorage.getItem(tokenKeys.access)) {
      accountService.getUserData().then(
        (response: UserResponseModel) => {
          dispatch(userUpdate({
            plan_pro: checkPlan(response),
            ...response
          }));
        });
    }
  }, []);

  const hideCookieAlert = () => {
    localStorage.setItem(tokenKeys.cookies, 'closed');
    setShowCookieAlert(false);
  };

  return ( // TO DO PAGINA DE CONTATO
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
            <Route path={urls.becomePro.url + '/:param'} element={<BecomePro />} />
            <Route path={urls.startSearch.url} element={<StartSearch />} />
            <Route path={urls.terms.url} element={<TermsPage />} />
            <Route path={urls.about.url} element={<AboutPage />} />
            <Route path={urls.reports.url} element={<ReportsPage />} />
            <Route path={urls.purchase.url} element={<Purchase />} />
            <Route path={urls.plans.url} element={<Plans />} />
            <Route path={urls.search.url} element={<Search />} />
            <Route path={urls.myReports.url} element={<MyReports />} />
            <Route path={urls.myAlerts.url} element={<MyAlerts />} />
            <Route path={urls.userInfo.url} element={<UserInfo />} />
            <Route path={urls.cnpjs.url} element={<CnpjPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Fragment>
      </Router>
    </div>
  );
};

export default App;
