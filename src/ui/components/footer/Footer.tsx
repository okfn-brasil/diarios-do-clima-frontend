import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from "@mui/material";
import { Fragment } from 'react';
import DiarioLogo from '@app/assets/images/logo.svg';
import { fontNormal1WhiteBold, fontSora } from '@app/ui/utils/fonts';
import { gray, darkBlue } from '@app/ui/utils/colors';
import { Link } from 'react-router-dom';
import { urls } from '@app/ui/utils/urls';

const FooterXS = () => {
  const baseSx = {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
    paddingBottom: '16px',
    color: 'white',        
  };
  return (
    <Fragment>
      <Grid item xs={12} sx={{ ...baseSx, paddingTop: '56px', }} ><Link to={urls.about.url}>Sobre o diário do clima</Link></Grid>
      <Grid item xs={12} sx={{ ...baseSx, }} ><Link to={urls.reports.url}>Relatórios de análises aprofundadas</Link></Grid>
      <Grid item xs={12} sx={{ ...baseSx, }} ><Link to={urls.plans.url}>Assinatura PRO</Link></Grid>
      <Grid item xs={12} sx={{ ...baseSx, }} ><Link to={urls.terms.url}>Termos e condições</Link></Grid>
    </Fragment>
  );
}

const FooterMD = () => {
  return (
    <Grid
      item container
      md={8}
      xs={12}
      justifyContent='space-between'
      sx={{
        paddingRight: '128px',
      }}
    >
      <Link to={urls.plans.url}><span style={{color: gray}}>Assinatura PRO</span></Link>
      <Link to={urls.reports.url}><span style={{color: gray}}>Relatórios de análises aprofundadas</span></Link>
      <Link to={urls.about.url}><span style={{color: gray}}>Sobre o diário do clima</span></Link>
      <Link to={urls.terms.url}><span style={{color: gray}}>Termos e condições</span></Link>
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
      sx={{
        ...fontNormal1WhiteBold,          
        ...fontSora,      
        backgroundColor: darkBlue,
        paddingTop: '60px',
        paddingBottom: '80px',
        paddingLeft: isDesktop ? '130px' : '26px',
        color: gray,
      }}
    >
      <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', }}>
        <img src={DiarioLogo} style={{width: isDesktop ? '180px' : '160px'}} alt='Logo do Diario do Clima' />
      </Grid>
      {isDesktop ? <FooterMD /> : <FooterXS />}
    </Grid>
  );
}

export default Footer;