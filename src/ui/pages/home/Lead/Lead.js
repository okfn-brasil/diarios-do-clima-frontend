import { Grid } from "@mui/material";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import backgroundImage from '../../../../assets/images/home/lead.background.png';
import deviceImage from '../../../../assets/images/home/lead.device.png';
import CookieAlert from '../CookieAlert';
import { useState } from "react";
import DiarioLogo from '../../../../assets/images/logo.svg';
import ButtonGreen from '../../../components/button/ButtonGreen';
import ButtonOutlined from '../../../components/button/ButtonOutlined';
import { fontTitle1White, fontSubTitle, fontNormal1WhiteMenu } from '../../../fonts';

import MenuMobile from './MenuMobile';

function MenuBig() {
    return (
        <Grid
            item container xs={10}
            alignItems="center"
            justifyContent="space-between"
            sx={{
                ...fontNormal1WhiteMenu,
            }}
        >
            <span>
                Diario do Clima PRO
            </span>
            <span>
                Relatorios
            </span>
            <span>
                Sobre o Diário do Clima
            </span>
            <ButtonGreen sx={{
                minWidth: '100px',
            }}>
                Começar a buscar
            </ButtonGreen>
            <ButtonOutlined sx={{
                minWidth: '100px',
            }}>
                Iniciar Sessão
            </ButtonOutlined>
        </Grid>
    );
}


function Lead() {
    var [showAlert, setShowAlert] = useState(true);
    const theme = useTheme();
    const isBig = useMediaQuery(theme.breakpoints.up('lg'));
    return (
        <Grid container
            sx={{
                fontSize: 14,
                backgroundImage: `linear-gradient(to right, rgba(34, 23, 48, 0.88), rgba(33, 57, 139, 0.88)), url(${backgroundImage})`,
                backgroundSize: 'cover',
                color: 'white',
            }}>
            <CookieAlert show={showAlert} onClick={() => setShowAlert(false)} />
            <Grid
                item container
                xs={12} sx={{
                    paddingTop: '16px',
                }}
                alignItems="center"
            >
                <Grid item xs={6} lg={4} sx={{ paddingLeft: isBig ? '130px' : '26px', }}>
                    <img src={DiarioLogo} alt="Logo do Diario do Clima" />
                </Grid>
                <Grid item container xs={6} lg={8}>
                    {isBig ? <MenuBig /> : <MenuMobile />}
                </Grid>
            </Grid>
            <Grid item container xs={12} sx={{ marginBottom: '100px', marginTop: '50px', }}>
                <Grid item xs={12} lg={6}
                    sx={isBig ? {
                        paddingLeft: '230px',
                    } : {
                        paddingLeft: '26px',
                        paddingRight: '26px',
                    }}
                >
                    <p style={fontTitle1White}>
                        Encontre um ato ambiental
                    </p>
                    <p style={fontSubTitle}>O diário do Clima filtra as informações dos diários oficiais para você descobrir o que precisa mais fácil e rapidamente</p>
                    <ButtonGreen sx={{
                        minWidth: '200px',
                        ...(!isBig && { marginBottom: '80px' }),
                    }}>
                        Começar a buscar
                    </ButtonGreen>
                </Grid>
                <Grid item xs={12} lg={6} sx={{
                    ...(!isBig && { marginBottom: '-110%', }),
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <img src={deviceImage} style={{ maxHeight: '423px', }} alt="Exemplo de ui do diario do clima" />
                </Grid>
            </Grid>
        </Grid >

    );
}

export default Lead;