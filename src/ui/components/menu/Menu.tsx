import { Grid } from "@mui/material";
import MenuMobile from './menuMobile/MenuMobile';
import MenuDesktop from './menuDesktop/MenuDesktop';
import DiarioLogo from '/src/assets/images/logo.svg';
import DiarioLogoBlack from '/src/assets/images/logo-black.svg';
import { darkBlue } from '/src/ui/utils/colors';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { urls } from "../../utils/urls";
import LoginForm from "./loginForm/LoginForm";

interface PropsMenu {
  isDesktop: boolean;
}

const Menu = ({ isDesktop }: PropsMenu) => {
  const [searchParams] = useSearchParams();
  const [hasScrolled, setScrolled]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [showLogin, setLoginVisibility]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.removeEventListener('scroll', getScroll);
    window.addEventListener('scroll', getScroll);
    if(searchParams.get('login')) {
      showLoginForm(true);
    }
  }, []);

  const {isWhiteMenu, hideLinks} = Object.keys(urls).map(key => {
      let item = urls[key] as any;
      if(item.url === location.pathname) {
        return item
      }
  }).filter(item => !!item)[0];

  const getScroll = () => {
    const position = window.pageYOffset;
    setScrolled(position > 50);
  }
  
  const showLoginForm = (show: boolean) => {
    setLoginVisibility(show);
  }

  const getMenu = (isDesktop: boolean, isWhite: boolean, hideLinks: boolean) => {
    return hideLinks ? <></> : (isDesktop ? <MenuDesktop showLoginForm={showLoginForm} isWhite={isWhite} /> : 
    <MenuMobile showLoginForm={showLoginForm} isWhite={isWhite} />)
  }

  const defaultHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    position: hideLinks ? 'relative' : 'sticky',
    height: '80px',
    top: 0,
    paddingTop: 0,
    backgroundColor: hasScrolled ? darkBlue : '',
    zIndex: 999,
  };

  const invertedHeaderStyle: React.CSSProperties = {
    ...defaultHeaderStyle,
    backgroundColor: 'white',
  };

  return (
    <>
      { showLogin ? 
        <LoginForm showLoginForm={showLoginForm} isDesktop={isDesktop}></LoginForm> 
        : <></>
      }
      <Grid container className="container" sx={isWhiteMenu ? invertedHeaderStyle : defaultHeaderStyle}>
        <Grid item xs={0} sm={1}></Grid>
        <Grid
          item container
          justifyContent='space-between'
          alignItems='center'
          xs={12} sm={10}>
          <Link to="/"><img style={{width: isDesktop ? '180px' : '160px'}} src={isWhiteMenu ? DiarioLogoBlack : DiarioLogo} alt='Logo do Diario do Clima' /></Link>
          {getMenu(isDesktop, isWhiteMenu, hideLinks)}
        </Grid>
      </Grid>
    </>
  );
}

export default Menu;