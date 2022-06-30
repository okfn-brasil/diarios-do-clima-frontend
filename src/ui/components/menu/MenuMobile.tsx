import { useState } from "react";
import MenuIcon from '/src/assets/images/icons/menu.svg';
import MenuBlackIcon from '/src/assets/images/icons/menu-black.svg';
import MenuMobileOverlay from "./MenuMobileOverlay";
import { useSelector } from "react-redux";
import { RootState } from "/src/stores/store";

interface PropsMenuMobile {
  isWhite: boolean;
  showLoginForm: any
}

const MenuMobile = ({isWhite, showLoginForm}: PropsMenuMobile) => {
    const userData = useSelector((state: RootState) => state.user);
    const [showMenu, setShowMenu] = useState(false);
    return (
        <span
            style={{
                display: 'flex',
                justifyContent: 'right'
            }}>
            <img src={isWhite ? MenuBlackIcon : MenuIcon} alt='menu icon'
                onClick={() => setShowMenu(true)}
                style={{
                    width: '14px',
                    height: '18px',
                    paddingRight: '20px',
                }} />
            {showMenu && <MenuMobileOverlay showLoginForm={showLoginForm} onClose={()=>setShowMenu(false)}/>}
        </span>
    );
}

export default MenuMobile;