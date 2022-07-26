import HyperLink from '@app/ui/components/hyperLink/HyperLink';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import './MoreData.scss';

const MoreData = () => {
  return (
    <Grid item container xs={12} className='vertical-spacing-container more-data' justifyContent='center'>
      <Grid item xs={10} md={8}>
        <h3 className='h3-class-sx-margin'>
          {TEXTS.home.moreData.title}
        </h3>
        <p className='paragraph-class'>
          {TEXTS.home.moreData.subtitle}
        </p>
        <HyperLink link={urls.reports.url}>
          {TEXTS.home.moreData.linkAboutReports}
        </HyperLink>
      </Grid>
    </Grid>
  );
};

export default MoreData;