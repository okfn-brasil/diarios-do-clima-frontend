import { Dispatch, useState } from 'react';
import { Link, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import userWhiteIcon from '@app/assets/images/icons/person-white.svg';
import userBlackIcon from '@app/assets/images/icons/person.svg';
import { userReset } from '@app/stores/user.store';
import { urls } from '@app/ui/utils/urls';
import { useDispatch } from 'react-redux';
import './LoggedMenu.scss';

interface PropsLoggedMenu {
  isWhite: boolean;
  classess?: string;
}

const LoggedMenu = ({isWhite, classess}: PropsLoggedMenu) => {
  const navigate: NavigateFunction = useNavigate();
  const routerLocation = useLocation();
  const dispatch = useDispatch();
  const [isShowingDropdown, setDropDownVisibility] : [boolean, Dispatch<boolean>] = useState(false);

  const closeMenu = () => {
    setTimeout(() => {
      setDropDownVisibility(false);
    }, 100);
  }

  const showMenu = () => {
    setDropDownVisibility(true)
  }

  const signOut = () => {
    dispatch(userReset())
    if(routerLocation.pathname !== '/'){
      navigate(urls.home.url);
    }
  }

  return (
    <div className={`user-menu ${classess}`}>
      <button 
        className='hover-animation menu-img' 
        onClick={showMenu} 
        onBlur={closeMenu}
      >
        <img src={isWhite ? userBlackIcon : userWhiteIcon}/>
      </button>
      {isShowingDropdown ? <div className='dropdown-menu' onMouseLeave={closeMenu}>
        <div className='links'>
          <Link to='' className='hover-animation'><div>Minha conta</div></Link>
          <Link to='' className='hover-animation'><div>Meus relatórios</div></Link>
          <Link to='' className='hover-animation'><div>Alertas salvos</div></Link>
        </div>
        <hr className='thin-line'/>
        <div onClick={signOut} className='links hover-animation'>
          <Link to='' className='hover-animation'><div>Deslogar</div></Link>
        </div>
      </div> : <></> }
    </div>
  );
}

export default LoggedMenu;