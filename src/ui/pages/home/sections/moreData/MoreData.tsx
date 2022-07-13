import HyperLink from '@app/ui/components/hyperLink/HyperLink';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import './MoreData.scss';

const MoreData = () => {
  return (
    <Grid item container xs={12} className='vertical-spacing-container more-data' justifyContent='center'>
      <Grid item xs={10} md={8}>
        <h3 className='h3-class-sx-margin'>
          Mais dados. Mais insights
        </h3>
        <p className='paragraph-class'>
          Informações curadas por profissionais e baseadas nos diários oficiais para ajudar pesquisadores, consultores e organizações a estarem a par dos últimos acontecimentos.
        </p>
        <HyperLink link={urls.reports.url}>
          Saiba mais sobre os relatórios
        </HyperLink>
      </Grid>
    </Grid>
  );
};

export default MoreData;