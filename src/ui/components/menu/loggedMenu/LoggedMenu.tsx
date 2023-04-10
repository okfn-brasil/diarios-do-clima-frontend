import { Dispatch, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import userBlackIcon from '@app/assets/images/icons/person.svg';
import userWhiteIcon from '@app/assets/images/icons/person-white.svg';
import { userReset } from '@app/stores/user.store';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';

import './LoggedMenu.scss';

interface PropsLoggedMenu {
  isWhite: boolean;
  classes?: string;
}

const LoggedMenu = ({isWhite, classes}: PropsLoggedMenu) => {
  const navigate: NavigateFunction = useNavigate();
  const routerLocation = useLocation();
  const dispatch = useDispatch();
  const [isShowingDropdown, setDropDownVisibility] : [boolean, Dispatch<boolean>] = useState(false);

  const closeMenu = () => {
    setTimeout(() => {
      setDropDownVisibility(false);
    }, 300);
  };

  const showMenu = () => {
    setDropDownVisibility(true);
  };

  const signOut = () => {
    dispatch(userReset());
    setTimeout(() => {
      if(routerLocation.pathname !== '/'){
        navigate(urls.home.url);
      }
    }, 200);
  };

  return (
    <div className={`user-menu ${classes}`}>
      <button 
        className='hover-animation menu-img' 
        onClick={showMenu} 
        onBlur={closeMenu}
      >
        <img src={isWhite ? userBlackIcon : userWhiteIcon}/>
      </button>
      {isShowingDropdown ? <div className='dropdown-menu' onMouseLeave={closeMenu}>
        <div className='links'>
          <Link to={urls.userInfo.url} className='hover-animation'><div>{TEXTS.loggedMenu.myAccount}</div></Link>
          <Link to={urls.myReports.url} className='hover-animation'><div>{TEXTS.loggedMenu.myReports}</div></Link>
          <Link to={urls.myAlerts.url} className='hover-animation'><div>{TEXTS.loggedMenu.myAlerts}</div></Link>
        </div>
        <hr className='thin-line'/>
        <div onClick={signOut} className='links hover-animation'>
          <a className='hover-animation'><div>{TEXTS.loggedMenu.singOut}</div></a>
        </div>
      </div> : <></> }
    </div>
  );
};

export default LoggedMenu;