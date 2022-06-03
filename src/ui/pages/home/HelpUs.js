import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from "@mui/material";
import ButtonSolidGreen from "../../components/button/ButtonGreen";
import ButtonSolidDarkBlue from "../../components/button/ButtonDarkBlue";
import { fontTitle3White, fontNormal2White } from "../../fonts";

import './HelpUs.css';

function HelpUs() {
    const theme = useTheme();
    const isBig = useMediaQuery(theme.breakpoints.up('lg'));
    return (
        <Grid item container xs={12}
            justifyContent='center'
            sx={{
                color: 'white',
                backgroundColor: 'rgba(62, 109, 194, 1)',
                paddingTop: '80px',
                paddingBottom: '80px',                
            }}
        >
            <Grid className='textContainer' item xs={10} md={8}>
                <p style={{
                    ...fontTitle3White,
                    marginBottom: '8px',
                }}>Ajude o diário do clima a crescer e receba benefícios</p>
                <p style={{
                    ...fontNormal2White,
                    maxWidth: '782px',
                    marginBottom: '24px',
                }}>Tenha em mãos todas as informações que você e sua equipe precisam sobre políticas públicas ambientais</p>
            </Grid>

            <Grid item xs={10} md={8}>

                <ButtonSolidGreen sx={{
                    marginRight: isBig ? '16px' : null,
                    marginBottom: isBig ? null : '16px',
                    minWidth: isBig ? null : '100%',
                    fontSize: 16,                    
                }}>
                    Quero apoiar assinando
                </ButtonSolidGreen>


                <ButtonSolidDarkBlue sx={{
                    minWidth: isBig ? null : '100%',
                }}>
                    Começar a buscar grátis
                </ButtonSolidDarkBlue>

            </Grid>
        </Grid>
    );
}

export default HelpUs;