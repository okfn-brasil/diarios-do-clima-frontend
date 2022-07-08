import { Grid } from "@mui/material";
import ButtonSolidGreen from "@app/ui/components/button/ButtonGreen/ButtonGreen";
import ButtonSolidDarkBlue from "@app/ui/components/button/buttonDarkBlue/ButtonDarkBlue";
import LinkManager from '@app/ui/components/linkManager/LinkManager';
import { urls } from '@app/ui/utils/urls';
import './HelpUs.scss';

const HelpUs = () => {
  return (
    <Grid item container xs={12}
      justifyContent='center' className='vertical-spacing-container help-us'>
      <Grid className='textContainer' item xs={10} md={8}>
        <h3 className='h3-style help-us-title'>Ajude o diário do clima a crescer e receba benefícios</h3>
        <p className='paragraph-style'>Tenha em mãos todas as informações que você e sua equipe precisam sobre políticas públicas ambientais</p>
      </Grid>

      <Grid item xs={10} md={8} className='buttons'>
        <LinkManager to={urls.purchase.url}>
          <ButtonSolidGreen classess='button'>
            Quero apoiar assinando
          </ButtonSolidGreen>
        </LinkManager>

        <LinkManager to={urls.registration.url}>
          <ButtonSolidDarkBlue classess='button'>
            Começar a buscar grátis
          </ButtonSolidDarkBlue>
        </LinkManager>
      </Grid>
    </Grid>
  );
}

export default HelpUs;