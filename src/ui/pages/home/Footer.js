import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from "@mui/material";
import { Fragment } from 'react';
import DiarioLogo from '../../../assets/images/logo.svg';

function FooterXS() {
    return (
        <Fragment>
            <Grid item xs={12} >Assinatura PRO</Grid>
            <Grid item xs={12} >Relatórios de análises aprofundadas</Grid>
            <Grid item xs={12} >Sobre o diário do clima</Grid>
            <Grid item xs={12} >Termos e condições</Grid>
        </Fragment>
    );
}

function FooterMD() {
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

function Footer() {
    const theme = useTheme();
    const isNotXS = useMediaQuery(theme.breakpoints.up('sm'));
    const EE = isNotXS ? FooterMD() : FooterXS();
    return (
        <Grid item container
            xs={12}
            alignItems='center'
            sx={{
                backgroundColor: 'rgba(23, 32, 48, 100);',
                paddingTop: '60px',
                paddingBottom: '80px',
                paddingLeft: '130px',
                color: 'white',                
            }}
        >
            <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', }}>
                <img src={DiarioLogo} alt="Logo do Diario do Clima" />
            </Grid>
            {EE}
        </Grid>
    );
}

export default Footer;