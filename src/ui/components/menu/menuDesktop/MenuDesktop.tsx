import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserState } from '@app/models/user.model';
import { RootState } from '@app/stores/store';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import LoggedMenu from '@app/ui/components/menu/loggedMenu/LoggedMenu';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';

import './MenuDesktop.scss';

interface PropsMenuDesktop {
  isWhite: boolean;
  showLoginForm: (e: boolean) => void;
}

const MenuDesktop = ({isWhite, showLoginForm}: PropsMenuDesktop) => {
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);
  const onShowLoginForm = () => {
    showLoginForm(true);
  };

  return (
    <div className='menu-desktop'>
      <Link to={urls.plans.url}>
        <span className={`hover-animation menu-desktop-link ${isWhite ? 'dark-blue-link' : ''}`}>{TEXTS.menu.pro}</span>
      </Link>
      <Link to={urls.reports.url}>
        <span className={`hover-animation menu-desktop-link ${isWhite ? 'dark-blue-link' : ''}`}>{TEXTS.menu.reports}</span>
      </Link>
      <Link to={urls.about.url}>
        <span className={`hover-animation menu-desktop-link ${isWhite ? 'dark-blue-link' : ''}`}>{TEXTS.menu.about}</span>
      </Link>
      { userData.access ? 
        <LoggedMenu isWhite={isWhite} classes='logged-menu' ></LoggedMenu> :
        <>
          <Link to={urls.registration.url}>
            <ButtonGreen classes='font-small-button'>
              {TEXTS.menu.buttonSearch}
            </ButtonGreen>
          </Link>

          <div onClick={onShowLoginForm}>
            <ButtonOutlined classes={`font-small-button ${isWhite ? 'dark-blue-link' : ''}`}>
              {TEXTS.menu.buttonSession}
            </ButtonOutlined>
          </div>
        </>
      }
    </div>
  );
};

export default MenuDesktop;
