import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { UserState } from '@app/models/user.model';
import { RootState } from '@app/stores/store';
import { urls } from '@app/ui/utils/urls';

const loggedPaths = [urls.purchase.url, urls.search.url, urls.myAlerts.url, urls.myReports.url];
const notLoggedPaths = [urls.registration.url];
const notSubscribedPaths = [urls.purchase.url];

const RouteChangeManager = () => {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);
  useEffect(() => {
    window.scrollTo(0, 0);
    if(userData.access && notLoggedPaths.includes(location.pathname)) {
      navigate(urls.home.url);
    }

    if(!userData.access && loggedPaths.includes(location.pathname)) {
      navigate(urls.home.url);
    }

    if(userData.plan_pro && notSubscribedPaths.includes(location.pathname)) {
      navigate(urls.home.url);
    }
  });

  return (null);
};

export default RouteChangeManager;