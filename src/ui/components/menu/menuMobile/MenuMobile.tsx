import { useState } from "react";
import MenuIcon from '@app/assets/images/icons/menu.svg';
import MenuBlackIcon from '@app/assets/images/icons/menu-black.svg';
import MenuMobileOverlay from "../menuMobileOverlay/MenuMobileOverlay";
import { useSelector } from "react-redux";
import { RootState } from "@app/stores/store";
import LoggedMenu from "../loggedMenu/LoggedMenu";
import { UserState } from "@app/stores/user.store";

interface PropsMenuMobile {
  isWhite: boolean;
  showLoginForm: any
}

const MenuMobile = ({isWhite, showLoginForm}: PropsMenuMobile) => {
  const userData: UserState = useSelector((state: RootState) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div style={{display: 'flex'}}>
      { userData.access ? <LoggedMenu isWhite={isWhite}></LoggedMenu> : null }
      <span
        style={{
          display: 'flex',
          justifyContent: 'right',
          width: '18px',
          padding: '0 24px',
        }}>
        <img src={isWhite ? MenuBlackIcon : MenuIcon} alt='menu icon'
          onClick={() => setShowMenu(true)}
          style={{
              width: '100%',
          }} />
        {showMenu && <MenuMobileOverlay isLoggedIn={!!userData.access} showLoginForm={showLoginForm} onClose={()=>setShowMenu(false)}/>}
      </span>
    </div>
  );
}

export default MenuMobile;