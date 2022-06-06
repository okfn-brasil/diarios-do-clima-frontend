import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from "@mui/material";
import ButtonSolidGreen from "../../components/button/ButtonGreen";
import ButtonSolidDarkBlue from "../../components/button/ButtonDarkBlue";
import { fontSora, fontRoboto, fontTitle3White, fontNormal2White } from "../../fonts";

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
                ...(isBig ? {
                    paddingTop: '80px',
                    paddingBottom: '80px',
                } : {
                    paddingTop: '62px',
                    paddingBottom: '69px',
                }),
            }}
        >
            <Grid className='textContainer' item xs={10} md={8}>
                <p style={{
                    ...fontSora,
                    ...fontTitle3White,
                    fontSize: isBig ? '22px' : '24px',
                    marginBottom: isBig ? '8px' : '16px',
                }}>Ajude o diário do clima a crescer e receba benefícios</p>
                <p style={{
                    ...fontNormal2White,
                    ...fontRoboto,
                    ...(isBig ? {
                        fontSize: '18px',
                        marginBottom: '24px',
                    } : {
                        fontSize: '16px',
                        marginBottom: '54px',
                    }),
                    maxWidth: '782px',
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