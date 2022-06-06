import { Grid } from "@mui/material";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import backgroundImage from '../../../../assets/images/home/lead.background.png';
import deviceImage from '../../../../assets/images/home/lead.device.png';
import ButtonGreen from '../../../components/button/ButtonGreen';
import { fontTitle1White, fontSubTitle, fontSora, fontRoboto } from '../../../fonts';
import { green } from '../../../colors';
import Menu from './Menu';




function Lead() {
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
            <Menu isBig={isBig} />
            <Grid item container xs={12} sx={{
                marginBottom: '100px',
                marginTop: isBig ? '80px' : '92px',
            }}>
                <Grid item xs={12} lg={6}
                    sx={isBig ? {

                        paddingLeft: '230px',
                    } : {
                        paddingLeft: '26px',
                        paddingRight: '26px',
                    }}
                >
                    <p style={{
                        ...fontTitle1White,
                        ...fontSora,
                        margin: 0,
                        marginTop: isBig ? '45px' : '0px',
                    }}>
                        Encontre um <span style={{
                            color: isBig ? null : green,
                        }}>ato ambiental</span>
                    </p>
                    <p style={{
                        ...fontSubTitle,
                        ...fontRoboto,
                        marginTop: isBig ? '16px' : '0px',
                    }}>
                        O diário do Clima filtra as informações dos diários oficiais para você descobrir o que precisa mais fácil e rapidamente
                    </p>
                    <ButtonGreen sx={{
                        minWidth: '200px',
                        ...(!isBig && { marginBottom: '80px' }),
                    }}>
                        Começar a buscar
                    </ButtonGreen>
                </Grid>
                <Grid item xs={12} lg={6} sx={{
                    ...(!isBig && { marginBottom: '-110%', paddingLeft: '0px', paddingRight: '0px', }),
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <img src={deviceImage} style={{ maxHeight: '423px', maxWidth: '100%',}} alt="Exemplo de ui do diario do clima" />
                </Grid>
            </Grid>
        </Grid >

    );
}

export default Lead;