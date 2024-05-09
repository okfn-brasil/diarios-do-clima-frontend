import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import DiariosLogo from '@app/assets/images/logo.svg';
import DiariosLogoBlack from '@app/assets/images/logo-black.svg';
import { UserState } from '@app/models/user.model';
import { RootState } from '@app/stores/store';
import ForgotPassowrd from '@app/ui/pages/forgotPassword/ForgotPassword';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { UrlModel, urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import LoginForm from './loginForm/LoginForm';
import MenuDesktop from './menuDesktop/MenuDesktop';
import MenuMobile from './menuMobile/MenuMobile';

import './Menu.scss';

const Menu = () => {
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);
  const [searchParams] = useSearchParams();
  const [hasScrolled, setScrolled]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [showLogin, setLoginVisibility]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [showForgotModal, setForgotModalVisibility]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.removeEventListener('scroll', getScroll);
    window.addEventListener('scroll', getScroll);
    if(searchParams.get('login') && !userData.access) {
      showLoginForm(true);
    }
  }, []);

  const {isWhiteMenu, hideLinks, customColor} = Object.keys(urls).map(key => {
    const item = urls[key] as UrlModel;
    if(item.url === location.pathname || (item.urlWithoutParam && location.pathname.includes(item.urlWithoutParam))) {
      return item;
    }
  }).filter(item => !!item)[0] || {} as UrlModel;

  const getScroll = () => {
    const position = window.pageYOffset;
    setScrolled(position > 50);
  };
  
  const showLoginForm = (show: boolean) => {
    setLoginVisibility(show);
  };

  return (
    <>
      { showLogin ? 
        <LoginForm onClickForgot={() => setForgotModalVisibility(true)} showLoginForm={showLoginForm}></LoginForm> 
        : <></>
      }
      { showForgotModal ? 
        <ForgotPassowrd onClickClose={() => setForgotModalVisibility(false)}/>
        : <></>
      }
      <Grid 
        container
        justifyContent='center'
        className={`container header ${isWhiteMenu ? 'inverted' : ''} ${hideLinks ? 'hide-links': ''}`} 
        sx={{backgroundColor: hasScrolled ? (customColor || 'rgba(12, 24, 10, 1)') : ''}}
      >
        <Grid
          item container
          justifyContent='space-between'
          alignItems='center'
          xs={12} sm={10}
        >
          <Link to='/'><img src={isWhiteMenu ? DiariosLogoBlack : DiariosLogo} alt={TEXTS.menu.logoImageAlt} /></Link>
          <div>
            <div className='only-desktop'><MenuDesktop showLoginForm={showLoginForm} isWhite={isWhiteMenu  as boolean} /> </div>
            <div className='only-mobile'><MenuMobile showLoginForm={showLoginForm} isWhite={isWhiteMenu as boolean} /></div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Menu;
