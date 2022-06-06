import { Grid } from "@mui/material";
import MenuMobile from './MenuMobile';
import MenuDesktop from './MenuDesktop';
import DiarioLogo from '../../../../../assets/images/logo.svg';

function Menu({ isBig }) {
    return (
        <Grid
            item container
            alignItems="center"
            xs={12} sx={{
                paddingTop: '16px',
                paddingLeft: isBig ? '130px' : '24px',
                paddingRight: isBig ? '130px' : '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
            <img src={DiarioLogo} alt="Logo do Diario do Clima" />
            {isBig ? <MenuDesktop /> : <MenuMobile />}
        </Grid>
    );
}

export default Menu;