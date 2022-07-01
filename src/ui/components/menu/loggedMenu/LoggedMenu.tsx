
import { Link } from 'react-router-dom';
import userWhiteIcon from '/src/assets/images/icons/person-white.svg';
import userBlackIcon from '/src/assets/images/icons/person.svg';
import './LoggedMenu.scss';
import { darkBlue } from '/src/ui/utils/colors';
import { fontSora } from '/src/ui/utils/fonts';
import { Dispatch, useState } from 'react';
import { userReset } from '/src/stores/user.store';
import { useDispatch } from 'react-redux';

interface PropsLoggedMenu {
  isWhite: boolean;
  sx?: React.CSSProperties,
}

const LoggedMenu = ({isWhite, sx}: PropsLoggedMenu) => {
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
  }

  return (
    <div className='user-menu' style={sx}>
      <button 
        className='hover-animation' 
        style={{ width: '16px', height: '16px', border: 'none', backgroundColor: 'unset', padding: '0' }} 
        onClick={showMenu} 
        onBlur={closeMenu}
      >
        <img style={{width: '100%', height: '100%'}} src={isWhite ? userBlackIcon : userWhiteIcon}/>
      </button>
      {isShowingDropdown ? <div className='dropdown-menu' onMouseLeave={closeMenu}>
        <div className='links' style={{padding: '0px 32px', marginTop: '20px'}}>
          <Link to='' className='hover-animation'><div style={linkStyle}>Minha conta</div></Link>
          <Link to='' className='hover-animation'><div style={linkStyle}>Meus relatórios</div></Link>
          <Link to='' className='hover-animation'><div style={linkStyle}>Alertas salvos</div></Link>
        </div>
        <hr style={{borderTop: 'none', marginTop: '12px'}}/>
        <div onClick={signOut} className='links hover-animation' style={{padding: '12px 32px'}}>
          <div style={linkStyle}>Deslogar</div>
        </div>
      </div> : <></> }
    </div>
  );
}

export default LoggedMenu;

const linkStyle: React.CSSProperties = {
  ...fontSora,
  color: darkBlue,
  padding: '12px',
  fontWeight: '600',
}