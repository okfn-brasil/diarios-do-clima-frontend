import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from "@mui/material";
import ButtonSolidGreen from "/src/ui/components/button/ButtonGreen";
import ButtonSolidDarkBlue from "/src/ui/components/button/ButtonDarkBlue";
import { fontSora, fontRoboto, fontTitle3White, fontNormal2White } from "/src/ui/utils/fonts";
import { Link } from 'react-router-dom';
import { urls } from '/src/ui/utils/urls';

import './HelpUs.scss';

const HelpUs = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    return (
        <Grid item container xs={12}
            justifyContent='center'
            sx={{
                color: 'white',
                backgroundColor: 'rgba(62, 109, 194, 1)',
                ...(isDesktop ? {
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
                    fontSize: isDesktop ? '22px' : '24px',
                    marginBottom: isDesktop ? '8px' : '16px',
                }}>Ajude o diário do clima a crescer e receba benefícios</p>
                <p style={{
                    ...fontNormal2White,
                    ...fontRoboto,
                    ...(isDesktop ? {
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
                    marginRight: isDesktop ? '16px' : '',
                    marginBottom: isDesktop ? '' : '16px',
                    minWidth: isDesktop ? '' : '100%',
                    fontSize: 16,
                }}>
                    Quero apoiar assinando
                </ButtonSolidGreen>


                <Link to={urls.registration.url}>
                  <ButtonSolidDarkBlue sx={{
                      minWidth: isDesktop ? '' : '100%',
                  }}>
                      Começar a buscar grátis
                  </ButtonSolidDarkBlue>
                </Link>

            </Grid>
        </Grid>
    );
}

export default HelpUs;