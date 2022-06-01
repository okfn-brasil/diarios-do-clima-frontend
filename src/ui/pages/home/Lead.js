import { Grid } from "@mui/material";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import backgroundImage from '../../../assets/images/home/lead.background.png';
import deviceImage from '../../../assets/images/home/lead.device.png';
import CookieAlert from './CookieAlert';
import { useState } from "react";
import DiarioLogo from '../../../assets/images/logo.svg';
import ButtonGreen from '../../components/button/ButtonGreen';
import ButtonOutlined from '../../components/button/ButtonOutlined';

function MenuBig() {
    return (
        <Grid
            item container xs={10}
            alignItems="center"
            justifyContent="space-between"
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
function MenuSmall() {
    return (
        <span>small</span>
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
                    {isBig ? MenuBig() : MenuSmall()}
                </Grid>
            </Grid>
            <Grid item container xs={12} sx={{ marginBottom: '100px', marginTop: '50px', }}>
                <Grid item container xs={12} lg={6} justifyContent="center" alignItems="center">
                    <Grid item xs={10} lg={6}>
                        <h1>Encontre um ato ambiental</h1>
                        <p>O diário do Clima filtra as informações dos diários oficiais para você descobrir o que precisa mais fácil e rapidamente</p>
                        <ButtonGreen sx={{ minWidth: '200px', }}>
                            Começar a buscar
                        </ButtonGreen>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={6} sx={{
                    ...(!isBig && { marginBottom: '-110%', }),
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <img src={deviceImage} style={{ maxHeight: '423px', }} alt="Exemplo de ui do diario do clima" />
                </Grid>
            </Grid>
        </Grid>

    );
}

export default Lead;