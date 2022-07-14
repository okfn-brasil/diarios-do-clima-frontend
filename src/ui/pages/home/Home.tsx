import { Grid } from '@mui/material';

import Data from './sections/data/Data';
import HelpUs from './sections/helpus/HelpUs';
import Lead from './sections/lead/Lead';
import MoreData from './sections/moreData/MoreData';
import WeOffer from './sections/weOffer/WeOffer';

const Home = () => {
  return (
    <Grid container spacing={0} className='Home'>
      <Lead />
      <Data />
      <WeOffer />
      <HelpUs />
      <MoreData />
    </Grid>
  );
};

export default Home;


