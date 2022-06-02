import { Grid } from "@mui/material";
import { useState } from "react";
import MenuIcon from '../../../../assets/images/home/icons/menu.svg';
import MenuMobileOverlay from "./MenuMobileOverlay";

function MenuMobile() {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <Grid
            item xs={12}
            sx={{
                display: 'flex',
                justifyContent: 'right'
            }}>
            <img src={MenuIcon} alt="menu icon"
                onClick={() => setShowMenu(true)}
                style={{
                    width: '14px',
                    height: '18px',
                    paddingRight: '20px',
                }} />
            {showMenu && <MenuMobileOverlay onClose={()=>setShowMenu(false)}/>}
        </Grid>
    );
}

export default MenuMobile;