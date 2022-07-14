import { Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DiarioLogo from '@app/assets/images/logo.svg';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import { Link } from 'react-router-dom';
import { MouseEvent, MouseEventHandler } from 'react';
import { urls } from '@app/ui/utils/urls';
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
  }
  
  const onShowLoginForm = () => {
    showLoginForm(true);
    onClose({} as MouseEvent<SVGSVGElement>);
  }

  return (
    <div className='menu-overlay'>
      <Grid item container onClick={closeMenu}>
        <Grid item xs={12} className='logo-area'>
          <img src={DiarioLogo} alt='Logo do Diario do Clima' />
          <CloseIcon className='close-icon' onClick={onClose} />
        </Grid>
        { isLoggedIn ? <div className='menu-item'><Link to={urls.search.url}>Buscar</Link></div> : <></>}
        <div className='menu-item'><Link to={urls.plans.url}>Diário do clima PRO</Link></div>
        <div className='menu-item'><Link to={urls.reports.url}>Relatórios</Link></div>
        <div className='menu-item'><Link to={urls.about.url}>Sobre o Diário do Clima</Link></div>
        { isLoggedIn ? <></> :
          <>
            <Grid item xs={12} className='buttons-area'>
              <Link to={urls.registration.url}>
                <ButtonGreen classess='buttons'>
                  Começar a buscar
                </ButtonGreen>
              </Link>
            </Grid>
            <Grid  onClick={onShowLoginForm} item xs={12} className='buttons-area'>
              <ButtonOutlined classess='buttons outlined'>
                Iniciar sessão
              </ButtonOutlined>
            </Grid>
          </>
        }
      </Grid>
      <div className='links-area'>
        <span className='mobile-menu-link'>Fale conosco</span>
        <span className='mobile-menu-link'>
          <Link to={urls.terms.url} >Termos e condições</Link>
        </span>
      </div>
    </div>
  );
}

export default MenuMobileOverlay;
