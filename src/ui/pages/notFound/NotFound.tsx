import { Link } from 'react-router-dom';
import ImageNotFound from '@app/assets/images/computer-registration.svg';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import './NotFound.scss';

const NotFound = () => {

  return (
    <div className='not-found-page'>
      <Grid container item className='container top-space' sm={12} justifyContent='center'>
        <Grid container item sm={8}>
          <div className='vertical-spacing-container'>
            <div className='green-title'>
              {TEXTS.notFound.title}
            </div>
            <div className='h2-class'>
              {TEXTS.notFound.subTitle}
            </div>
            <p className='paragraph-class'>
              {TEXTS.notFound.text}
            </p>
          </div>
        </Grid>
      </Grid>
      <Grid className='container vertical-spacing-container' container item sm={12}  justifyContent='center'>
        <Grid item sm={8} container justifyContent='space-between'>
          <Grid item sm={4}>
            <img src={ImageNotFound} alt='imagem - pagina não encontrada'/>
          </Grid>
          <Grid item sm={7}>
            <div className='h3-class'>{TEXTS.notFound.links}</div>
            <div className='links-utils'>
              <div className='hover-animation'><Link to={urls.search.url}>Busque diários </Link></div>
              <div className='hover-animation'><Link to={urls.registration.url}>Criar uma conta</Link></div>
              <div className='hover-animation'><Link to={urls.reports.url}>Relatórios de análise</Link></div>
              <div className='hover-animation'><Link to={urls.plans.url}>Assinatura PRO</Link></div>
              <div className='hover-animation'><Link to={urls.about.url}>Sobre o diário do clima</Link></div>
              <div className='hover-animation'><Link to={urls.about.url}>Sobre o diário do clima</Link></div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
