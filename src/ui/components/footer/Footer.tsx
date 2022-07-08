import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from "@mui/material";
import { Fragment } from 'react';
import DiarioLogo from '@app/assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { urls } from '@app/ui/utils/urls';
import './Footer.scss';

const FooterXS = () => {
  return (
    <Fragment>
      <Grid item xs={12} className='footer-xs-item hover-animation first-xs' ><Link to={urls.about.url}>Sobre o diário do clima</Link></Grid>
      <Grid item xs={12} className='footer-xs-item hover-animation' ><Link to={urls.reports.url}>Relatórios de análises aprofundadas</Link></Grid>
      <Grid item xs={12} className='footer-xs-item hover-animation' ><Link to={urls.plans.url}>Assinatura PRO</Link></Grid>
      <Grid item xs={12} className='footer-xs-item hover-animation' ><Link to={urls.terms.url}>Termos e condições</Link></Grid>
    </Fragment>
  );
}

const FooterMD = () => {
  return (
    <Grid
      item container
      className='footer-md'
      md={8}
      xs={12}
      justifyContent='space-between'
    >
      <Link to={urls.plans.url}><span>Assinatura PRO</span></Link>
      <Link to={urls.reports.url}><span>Relatórios de análises aprofundadas</span></Link>
      <Link to={urls.about.url}><span>Sobre o diário do clima</span></Link>
      <Link to={urls.terms.url}><span>Termos e condições</span></Link>
    </Grid>
  );
}

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
}

export default Footer;