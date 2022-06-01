import { Grid } from '@mui/material';
import Lead from './Lead';
import Data from './Data';
import WeOffer from './WeOffer';
import HelpUs from './HelpUs';
import MoreData from './MoreData';
import Footer from './Footer';


function Home() {
    return (
        <Grid container spacing={0} className="Home">
            <Lead />
            <Data />
            <WeOffer />
            <HelpUs />
            <MoreData />
            <Footer />
        </Grid>
    );
}

export default Home;


