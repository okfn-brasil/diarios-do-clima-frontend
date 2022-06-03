import { useState } from "react";
import { Grid } from '@mui/material';
import CookieAlert from './CookieAlert';
import Lead from './Lead/Lead';
import Data from './Data';
import WeOffer from './WeOffer';
import HelpUs from './HelpUs';
import MoreData from './MoreData';
import Footer from './Footer';

function Home() {
    var [showCookieAlert, setShowCookieAlert] = useState(true);
    console.log(showCookieAlert);
    return (
        <Grid container spacing={0} className="Home">
            {showCookieAlert && <CookieAlert onClick={() => setShowCookieAlert(false)} />}
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


