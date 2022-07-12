import { Grid } from '@mui/material';
import backgroundImage from '@app/assets/images/home/lead.background.png';
import deviceImage from '@app/assets/images/home/lead.device.png';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import LinkManager from '@app/ui/components/linkManager/LinkManager';
import { urls } from '@app/ui/utils/urls';
import './Lead.scss';

const Lead = () => {
  return (
    <Grid container className='top-space lead-session'
      sx={{
        background: `linear-gradient(to right, rgba(34, 23, 48, 0.88), rgba(33, 57, 139, 0.88)), url(${backgroundImage})`,
      }}>
      <Grid item container xs={12} className='banner-content'>
        <Grid item xs={12} lg={6} className='banner-container'>
            <p className='title'>
              Encontre um <span>ato ambiental</span>
            </p>
            <p className='description'>
              O diário do Clima filtra as informações dos diários oficiais para você descobrir o que precisa mais fácil e rapidamente
            </p>
            <LinkManager to={urls.registration.url}>
              <ButtonGreen classess='start-search'>
                Começar a buscar
              </ButtonGreen>
            </LinkManager>
        </Grid>
        <Grid className='image-area' container justifyContent='center' item xs={12} lg={6}>
          <img src={deviceImage} alt='Exemplo de ui do diario do clima' />
        </Grid>
      </Grid>
    </Grid >
  );
}

export default Lead;