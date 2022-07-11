import { Grid } from "@mui/material";
import MenuMobile from './menuMobile/MenuMobile';
import MenuDesktop from './menuDesktop/MenuDesktop';
import DiarioLogo from '@app/assets/images/logo.svg';
import DiarioLogoBlack from '@app/assets/images/logo-black.svg';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { UrlModel, urls } from "@app/ui/utils/urls";
import LoginForm from "./loginForm/LoginForm";
import { useSelector } from "react-redux";
import { UserState } from '@app/models/user.model';
import { RootState } from "@app/stores/store";
import './Menu.scss';

const Menu = () => {
  const userData: UserState = useSelector((state: RootState) => state.user);
  const [searchParams] = useSearchParams();
  const [hasScrolled, setScrolled]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [showLogin, setLoginVisibility]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.removeEventListener('scroll', getScroll);
    window.addEventListener('scroll', getScroll);
    if(searchParams.get('login') && !userData.access) {
      showLoginForm(true);
    }
  }, []);

  const {isWhiteMenu, hideLinks, customColor} = Object.keys(urls).map(key => {
      let item = urls[key] as UrlModel;
      if(item.url === location.pathname) {
        return item
      }
  }).filter(item => !!item)[0] || {} as UrlModel;

  const getScroll = () => {
    const position = window.pageYOffset;
    setScrolled(position > 50);
  }
  
  const showLoginForm = (show: boolean) => {
    setLoginVisibility(show);
  }

  return (
    <>
      { showLogin ? 
        <LoginForm showLoginForm={showLoginForm}></LoginForm> 
        : <></>
      }
      <Grid 
        container
        justifyContent='center'
        className={`container header ${isWhiteMenu ? 'inverted' : ''} ${hideLinks ? 'hide-links': ''}`} 
        sx={{backgroundColor: hasScrolled ? (customColor || 'rgba(23, 32, 48, 1)') : ''}}
      >
        <Grid
          item container
          justifyContent='space-between'
          alignItems='center'
          xs={12} sm={10}
        >
          <Link to="/"><img src={isWhiteMenu ? DiarioLogoBlack : DiarioLogo} alt='Logo do Diario do Clima' /></Link>
          <div>
            <div className='only-desktop'><MenuDesktop showLoginForm={showLoginForm} isWhite={isWhiteMenu  as boolean} /> </div>
            <div className='only-mobile'><MenuMobile showLoginForm={showLoginForm} isWhite={isWhiteMenu as boolean} /></div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Menu;