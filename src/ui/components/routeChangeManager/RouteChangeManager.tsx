import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { urls } from '../../utils/urls';
import { RootState } from '/src/stores/store';
import { UserState } from '/src/stores/user.store';

const loggedPaths = [urls.becomePro.url, urls.startSearch.url];
const notLoggedPaths = [urls.registration.url];

const RouteChangeManager = () => {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const userData: UserState = useSelector((state: RootState) => state.user);
  useEffect(() => {
    window.scrollTo(0, 0);
    if(userData.access && notLoggedPaths.includes(location.pathname)) {
      navigate(urls.home.url);
    }

    if(!userData.access && loggedPaths.includes(location.pathname)) {
      navigate(urls.home.url);
    }
  });

  return (null);
}

export default RouteChangeManager;