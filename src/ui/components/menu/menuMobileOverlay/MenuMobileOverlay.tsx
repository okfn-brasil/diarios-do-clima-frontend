import { MouseEvent, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import DiariosLogo from '@app/assets/images/logo.svg';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';

import './MenuMobileOverlay.scss';

interface PropsMenuMobileOverlay {
  onClose: MouseEventHandler<SVGSVGElement>;
  showLoginForm: (e: boolean) => void;
  isLoggedIn: boolean;
}

const MenuMobileOverlay = ({ onClose, showLoginForm, isLoggedIn }: PropsMenuMobileOverlay)  => {
  const closeMenu = () => {
    setTimeout(() => {
      onClose({} as MouseEvent<SVGSVGElement>);
    }, 100);
  };
  
  const onShowLoginForm = () => {
    showLoginForm(true);
    onClose({} as MouseEvent<SVGSVGElement>);
  };

  return (
    <div className='menu-overlay'>
      <Grid item container onClick={closeMenu}>
        <Grid item xs={12} className='logo-area'>
          <img src={DiariosLogo} alt='Logo do Diários do Clima' />
          <CloseIcon className='close-icon' onClick={onClose} />
        </Grid>
        { isLoggedIn ? <div className='menu-item'><Link to={urls.search.url}>{TEXTS.menu.search}</Link></div> : <></>}
        <div className='menu-item'><Link to={urls.plans.url}>{TEXTS.menu.pro}</Link></div>
        <div className='menu-item'><Link to={urls.reports.url}>{TEXTS.menu.reports}</Link></div>
        <div className='menu-item'><Link to={urls.about.url}>{TEXTS.menu.about}</Link></div>
        { isLoggedIn ? <></> :
          <>
            <Grid item xs={12} className='buttons-area'>
              <Link to={urls.registration.url}>
                <ButtonGreen classes='buttons'>
                  {TEXTS.menu.buttonSearch}
                </ButtonGreen>
              </Link>
            </Grid>
            <Grid  onClick={onShowLoginForm} item xs={12} className='buttons-area'>
              <ButtonOutlined classes='buttons outlined'>
                {TEXTS.menu.buttonSession}
              </ButtonOutlined>
            </Grid>
          </>
        }
      </Grid>
      <div className='links-area'>
        <span className='mobile-menu-link'>
          <a href={`mailto:${TEXTS.contactEmail}`}>{TEXTS.menu.contactUs}</a>
        </span>
        <span className='mobile-menu-link'>
          <Link to={urls.terms.url} >{TEXTS.menu.termsAndConditions}</Link>
        </span>
      </div>
    </div>
  );
};

export default MenuMobileOverlay;
