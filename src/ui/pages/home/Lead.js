import { Grid } from "@mui/material";
import backgroundImage from '../../../assets/images/home/lead.background.png';
import deviceImage from '../../../assets/images/home/lead.device.png';
import CookieAlert from './CookieAlert';
import { useState } from "react";
import DiarioLogo from '../../../assets/images/logo.svg';
import ButtonGreen from '../../components/button/ButtonGreen';
import ButtonOutlined from '../../components/button/ButtonOutlined';


function Lead() {
    var [showAlert, setShowAlert] = useState(true);

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
                <Grid item xs={4} sx={{ paddingLeft: '130px', }}>
                    <img src={DiarioLogo} alt="Logo do Diario do Clima" />
                </Grid>
                <Grid item container xs={8}>
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
                </Grid>
            </Grid>
            <Grid item container xs={12} sx={{ marginBottom: '100px', marginTop: '50px', }}>
                <Grid item container xs={6} justifyContent="center" alignItems="center">
                    <Grid item xs={6}>
                        <h1>Encontre um ato ambiental</h1>
                        <p>O diário do Clima filtra as informações dos diários oficiais para você descobrir o que precisa mais fácil e rapidamente</p>
                        <ButtonGreen sx={{ minWidth: '200px', }}>
                            Começar a buscar
                        </ButtonGreen>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <img src={deviceImage} alt="Exemplo de ui do diario do clima" />
                </Grid>
            </Grid>
        </Grid>

    );
}

export default Lead;