import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from "@mui/material";
import { Fragment } from 'react';
import DiarioLogo from '/src/assets/images/logo.svg';
import { fontNormal1WhiteBold, fontSora } from '/src/ui/utils/fonts';
import { gray, darkBlue } from '/src/ui/utils/colors';

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
            <Grid item xs={12} sx={{ ...baseSx, paddingTop: '56px', }} >Sobre o diário do clima</Grid>
            <Grid item xs={12} sx={{ ...baseSx, }} >Relatórios de análises aprofundadas</Grid>
            <Grid item xs={12} sx={{ ...baseSx, }} >Assinatura PRO</Grid>
            <Grid item xs={12} sx={{ ...baseSx, }} >Termos e condições</Grid>
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
            <span >Assinatura PRO</span>
            <span >Relatórios de análises aprofundadas</span>
            <span >Sobre o diário do clima</span>
            <span >Termos e condições</span>
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