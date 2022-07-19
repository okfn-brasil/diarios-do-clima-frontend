import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { UserState } from '@app/models/user.model';
import { RootState } from '@app/stores/store';
import { urls } from '@app/ui/utils/urls';

const loggedPaths = [urls.purchase.url, urls.search.url, urls.myAlerts.url, urls.myReports.url, urls.userInfo.url];
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

    
    const script = window.document.getElementById('pagseguro-dist') as HTMLScriptElement;
    const scriptCheckout = window.document.getElementById('pagseguro-checkout') as HTMLScriptElement;
    if(location.pathname === urls.purchase.url) {
      script.src = 'https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js';
    
      scriptCheckout.src = 'https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js';
    }
  });

  return (null);
};

export default RouteChangeManager;