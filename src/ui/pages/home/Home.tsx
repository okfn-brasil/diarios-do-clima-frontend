import { Grid } from '@mui/material';
import Lead from './sections/lead/Lead';
import Data from './sections/data/Data';
import WeOffer from './sections/weOffer/WeOffer';
import HelpUs from './sections/helpus/HelpUs';
import MoreData from './sections/moreData/MoreData';

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
}

export default Home;


