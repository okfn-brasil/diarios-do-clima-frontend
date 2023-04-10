import ButtonSoliddark from '@app/ui/components/button/buttonDark/ButtonDark';
import ButtonSolidGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import LinkManager from '@app/ui/components/linkManager/LinkManager';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import './HelpUs.scss';

const HelpUs = () => {
  return (
    <Grid item container xs={12}
      justifyContent='center' className='vertical-spacing-container help-us'>
      <Grid className='textContainer' item xs={10} md={8}>
        <h3 className='h3-class-sx-margin help-us-title'>{TEXTS.home.helpUs.title}</h3>
        <p className='paragraph-class'>{TEXTS.home.helpUs.subtitle}</p>
      </Grid>

      <Grid item xs={10} md={8} className='buttons'>
        <LinkManager to={urls.purchase.url}>
          <ButtonSolidGreen classes='button'>
            {TEXTS.home.helpUs.buttonSubscribe}
          </ButtonSolidGreen>
        </LinkManager>

        <LinkManager to={urls.registration.url}>
          <ButtonSoliddark classes='button'>
            {TEXTS.home.helpUs.buttonStart}
          </ButtonSoliddark>
        </LinkManager>
      </Grid>
    </Grid>
  );
};

export default HelpUs;