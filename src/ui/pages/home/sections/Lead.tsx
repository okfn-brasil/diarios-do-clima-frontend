import { Grid } from "@mui/material";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import backgroundImage from '@app/assets/images/home/lead.background.png';
import deviceImage from '@app/assets/images/home/lead.device.png';
import ButtonGreen from '@app/ui/components/button/ButtonGreen';
import { fontTitle1White, fontSubTitle, fontSora, fontRoboto } from '@app/ui/utils/fonts';
import { green } from '@app/ui/utils/colors';
import { urls } from "@app/ui/utils/urls";
import LinkManager from "@app/ui/components/linkManager/LinkManager";

const Lead = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <Grid container
      className='top-space'
      sx={{
        fontSize: 14,
        backgroundImage: `linear-gradient(to right, rgba(34, 23, 48, 0.88), rgba(33, 57, 139, 0.88)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        color: 'white',
      }}>
      <Grid item container xs={12} sx={{
        marginBottom: '100px',
        marginTop: '92px',
      }}>
        <Grid item xs={12} lg={6}
          sx={isDesktop ? {
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
              marginTop: isDesktop ? '45px' : '0px',
            }}>
              Encontre um <span style={{ color: isDesktop ? '' : green }}>ato ambiental</span>
            </p>
            <p style={{
              ...fontSubTitle,
              ...fontRoboto,
              marginTop: isDesktop ? '16px' : '0px',
            }}>
              O diário do Clima filtra as informações dos diários oficiais para você descobrir o que precisa mais fácil e rapidamente
            </p>
            <LinkManager to={urls.registration.url}>
              <ButtonGreen sx={{
                minWidth: '200px',
                ...(!isDesktop && { marginBottom: '80px' }),
              }}>
                Começar a buscar
              </ButtonGreen>
            </LinkManager>
        </Grid>
        <Grid item xs={12} lg={6} sx={{
          ...(!isDesktop && { marginBottom: '-110%', paddingLeft: '0px', paddingRight: '0px', }),
          display: 'flex',
          justifyContent: 'center',
        }}>
          <img src={deviceImage} style={{ maxHeight: '423px', maxWidth: '100%', }} alt='Exemplo de ui do diario do clima' />
        </Grid>
      </Grid>
    </Grid >
  );
}

export default Lead;