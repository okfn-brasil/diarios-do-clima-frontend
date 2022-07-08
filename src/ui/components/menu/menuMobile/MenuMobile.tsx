import { useState } from "react";
import MenuIcon from '@app/assets/images/icons/menu.svg';
import MenuBlackIcon from '@app/assets/images/icons/menu-black.svg';
import MenuMobileOverlay from "../menuMobileOverlay/MenuMobileOverlay";
import { useSelector } from "react-redux";
import { RootState } from "@app/stores/store";
import LoggedMenu from "../loggedMenu/LoggedMenu";
import { UserState } from '@app/models/user.model';
import './MenuMobile.scss';

interface PropsMenuMobile {
  isWhite: boolean;
  showLoginForm: (e: boolean) => void;
}

const MenuMobile = ({isWhite, showLoginForm}: PropsMenuMobile) => {
  const userData: UserState = useSelector((state: RootState) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className='menu-mobile'>
      { userData.access ? <LoggedMenu isWhite={isWhite}></LoggedMenu> : null }
      <span className='icon-area'>
        <img src={isWhite ? MenuBlackIcon : MenuIcon} alt='menu icon' onClick={() => setShowMenu(true)}/>
        {showMenu && <MenuMobileOverlay isLoggedIn={!!userData.access} showLoginForm={showLoginForm} onClose={()=>setShowMenu(false)}/>}
      </span>
    </div>
  );
}

export default MenuMobile;