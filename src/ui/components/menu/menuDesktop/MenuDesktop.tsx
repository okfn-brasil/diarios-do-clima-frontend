import { Link } from 'react-router-dom';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import { useSelector } from 'react-redux';
import { RootState } from '@app/stores/store';
import LoggedMenu from '../loggedMenu/LoggedMenu';
import { UserState } from '@app/models/user.model';
import { urls } from '@app/ui/utils/urls';
import './MenuDesktop.scss';

interface PropsMenuDesktop {
  isWhite: boolean;
  showLoginForm: (e: boolean) => void;
}

const MenuDesktop = ({isWhite, showLoginForm}: PropsMenuDesktop) => {
  const userData: UserState = useSelector((state: RootState) => state.user);
  const onShowLoginForm = () => {
    showLoginForm(true);
  }

  return (
    <div className='menu-desktop'>
      <Link to={urls.plans.url}>
        <span className={`hover-animation menu-desktop-link ${isWhite ? 'dark-blue-link' : ''}`}>Diario do Clima PRO</span>
      </Link>
      <Link to={urls.reports.url}>
        <span className={`hover-animation menu-desktop-link ${isWhite ? 'dark-blue-link' : ''}`}>Relatórios</span>
      </Link>
      <Link to={urls.about.url}>
        <span className={`hover-animation menu-desktop-link ${isWhite ? 'dark-blue-link' : ''}`}>Sobre o Diário do Clima</span>
      </Link>
      { userData.access ? 
        <LoggedMenu isWhite={isWhite} classess='logged-menu' ></LoggedMenu> :
        <>
          <Link to='/cadastro'>
            <ButtonGreen classess='font-small-button'>
              Começar a buscar
            </ButtonGreen>
          </Link>

          <div onClick={onShowLoginForm}>
            <ButtonOutlined classess={`font-small-button ${isWhite ? 'dark-blue-link' : ''}`}>
              Iniciar Sessão
            </ButtonOutlined>
          </div>
        </>
      }
    </div>
  );
}

export default MenuDesktop;
