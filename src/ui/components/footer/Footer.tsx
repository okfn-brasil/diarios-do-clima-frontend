import { Link } from 'react-router-dom';
import DiarioLogo from '@app/assets/images/logo.svg';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import './Footer.scss';

const Footer = () => {
  return (
    <Grid 
      container
      justifyContent='center'
      className='footer font-sora container'
    >
      <Grid container item sm={10} justifyContent='space-between' alignItems='center'>
        <img src={DiarioLogo} alt='Logo do Diario do Clima' />
        <div className='footer-links'>
          
          <div className='footer-link'><Link to={urls.plans.url}>{TEXTS.footer.pro}</Link></div>
          <div className='footer-link'><Link to={urls.reports.url}>{TEXTS.footer.reports}</Link></div>
          <div className='footer-link'><Link to={urls.about.url}>{TEXTS.footer.about}</Link></div>
          <div className='footer-link'><Link to={urls.terms.url}>{TEXTS.footer.termsAndConditions}</Link></div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Footer;