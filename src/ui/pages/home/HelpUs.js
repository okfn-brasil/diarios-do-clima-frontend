import { Grid } from "@mui/material";
import ButtonSolidGreen from "../../components/button/ButtonGreen";
import ButtonSolidDarkBlue from "../../components/button/ButtonDarkBlue";
import { fontTitle3White, fontNormal2White } from "../../fonts";


function HelpUs() {
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
            <Grid item xs={8}>
                <p style={fontTitle3White}>Ajude o diário do clima a crescer e receba benefícios</p>
                <p style={fontNormal2White}>Tenha em mãos todas as informações que você e sua equipe precisam sobre políticas públicas ambientais</p>
            </Grid>
            <Grid item xs={8}>

                <ButtonSolidGreen
                    sx={{ marginRight: '16px', }}
                >
                    Quero apoiar assinando
                </ButtonSolidGreen>

                <ButtonSolidDarkBlue >
                    Começar a buscar grátis
                </ButtonSolidDarkBlue>
            </Grid>
        </Grid>
    );
}

export default HelpUs;