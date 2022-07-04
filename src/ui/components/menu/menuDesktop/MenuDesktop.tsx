import { Link } from 'react-router-dom';
import ButtonGreen from '/src/ui/components/button/ButtonGreen';
import ButtonOutlined from '/src/ui/components/button/ButtonOutlined';
import { fontNormal1WhiteMenu, fontRoboto } from '/src/ui/utils/fonts';

import './MenuDesktop.scss';
import { darkBlue } from '/src/ui/utils/colors';
import { useSelector } from 'react-redux';
import { RootState } from '/src/stores/store';
import LoggedMenu from '../loggedMenu/LoggedMenu';
import { UserState } from '/src/stores/user.store';
import { urls } from '/src/ui/utils/urls';

interface PropsMenuDesktop {
  isWhite: boolean;
  showLoginForm: any;
}

const MenuDesktop = ({isWhite, showLoginForm}: PropsMenuDesktop) => {
  const userData: UserState = useSelector((state: RootState) => state.user);
  const linkStyle: React.CSSProperties = {
    cursor: 'pointer',
    marginRight: '24px',
    letterSpacing: '0.8px',
    color: isWhite ? darkBlue : 'white'
  };

  const onShowLoginForm = () => {
    showLoginForm(true);
  }

  return (
    <div className='menu'
      style={{
        ...fontNormal1WhiteMenu,
        ...fontRoboto,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Link to=''>
        <span className='hover-animation' style={linkStyle}>Diario do Clima PRO</span>
      </Link>
      <Link to=''>
        <span className='hover-animation' style={linkStyle}>Relatorios</span>
      </Link>
      <Link to={urls.about.url}>
        <span className='hover-animation' style={linkStyle}>Sobre o Diário do Clima</span>
      </Link>
      { userData.access ? 
        <LoggedMenu isWhite={isWhite} sx={{marginLeft: '4px'}}></LoggedMenu> :
        <>
          <Link to='/cadastro'>
            <ButtonGreen sx={{
              marginRight: '16px',
              fontSize: 14,
            }}>
              Começar a buscar
            </ButtonGreen>
          </Link>

          <Link to='' onClick={onShowLoginForm}>
            <ButtonOutlined sx={{
              fontSize: 14,
              color: isWhite ? darkBlue : 'white'
            }}>
              Iniciar Sessão
            </ButtonOutlined>
          </Link>
        </>
      }
    </div>
  );
}

export default MenuDesktop;
