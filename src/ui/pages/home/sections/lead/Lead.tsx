import backgroundImage from '@app/assets/images/home/lead.background.png';
import deviceImage from '@app/assets/images/home/lead.device.png';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import LinkManager from '@app/ui/components/linkManager/LinkManager';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import './Lead.scss';

const Lead = () => {
  return (
    <Grid container className='top-space lead-session'
      sx={{
        background: `url(${backgroundImage})`,
      }}>
      <Grid item container xs={12} className='banner-content' alignItems='center'>
        <Grid item xs={12} lg={6} className='banner-container'>
          <p className='title'>
            {TEXTS.home.lead.title}
          </p>
          <p className='description'>
            {TEXTS.home.lead.subtitle}
          </p>
          <LinkManager to={urls.registration.url}>
            <ButtonGreen classess='start-search'>
              {TEXTS.home.lead.buttonTitle}
            </ButtonGreen>
          </LinkManager>
        </Grid>
        <Grid className='image-area' container justifyContent='center' item xs={12} lg={6}>
          <img src={deviceImage} alt={TEXTS.home.lead.deviceImageAlt} />
        </Grid>
      </Grid>
    </Grid >
  );
};

export default Lead;