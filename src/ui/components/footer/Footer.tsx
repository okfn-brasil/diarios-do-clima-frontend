import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import DiarioLogo from '@app/assets/images/logo.svg';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from '@mui/material';

import './Footer.scss';

const FooterXS = () => {
  return (
    <Fragment>
      <Grid item xs={12} className='footer-xs-item hover-animation first-xs' ><Link to={urls.about.url}>{TEXTS.footer.about}</Link></Grid>
      <Grid item xs={12} className='footer-xs-item hover-animation' ><Link to={urls.reports.url}>{TEXTS.footer.reports}</Link></Grid>
      <Grid item xs={12} className='footer-xs-item hover-animation' ><Link to={urls.plans.url}>{TEXTS.footer.pro}</Link></Grid>
      <Grid item xs={12} className='footer-xs-item hover-animation' ><Link to={urls.terms.url}>{TEXTS.footer.termsAndConditions}</Link></Grid>
    </Fragment>
  );
};

const FooterMD = () => {
  return (
    <Grid
      item container
      className='footer-md'
      md={8}
      xs={12}
      justifyContent='space-between'
    >
      <Link to={urls.plans.url}><span>{TEXTS.footer.pro}</span></Link>
      <Link to={urls.reports.url}><span>{TEXTS.footer.reports}</span></Link>
      <Link to={urls.about.url}><span>{TEXTS.footer.about}</span></Link>
      <Link to={urls.terms.url}><span>{TEXTS.footer.termsAndConditions}</span></Link>
    </Grid>
  );
};

const Footer = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <Grid item container
      xs={12}
      alignItems='center'
      className='footer font-sora'
    >
      <Grid item xs={12} md={4} container alignItems='center'>
        <img src={DiarioLogo} alt='Logo do Diario do Clima' />
      </Grid>
      {isDesktop ? <FooterMD /> : <FooterXS />}
    </Grid>
  );
};

export default Footer;