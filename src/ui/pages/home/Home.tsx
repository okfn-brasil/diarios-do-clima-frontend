import { Grid } from '@mui/material';
import Lead from './sections/Lead';
import Data from './sections/Data';
import WeOffer from './sections/WeOffer';
import HelpUs from './sections/helpus/HelpUs';
import MoreData from './sections/MoreData';

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


