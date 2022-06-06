import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from "@mui/material";
import { Fragment } from 'react';
import DiarioLogo from '../../../assets/images/logo.svg';
import { fontNormal1WhiteBold, fontSora } from '../../fonts';
import { gray, darkBlue } from '../../colors';

function FooterXS() {
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
    const isBig = useMediaQuery(theme.breakpoints.up('lg'));
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
                paddingLeft: isBig ? '130px' : '26px',
                color: gray,
            }}
        >
            <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', }}>
                <img src={DiarioLogo} alt="Logo do Diario do Clima" />
            </Grid>
            {isBig ? <FooterMD /> : <FooterXS />}
        </Grid>
    );
}

export default Footer;