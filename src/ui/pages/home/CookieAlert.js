import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { fontNormal1White } from '../../fonts';


function CookieAlert({ show, onClick, }) {
    const opacity = show ? 1 : 0;

    return (
        <Grid item xs={12} style={{
            backgroundColor: 'black',
            opacity: opacity,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '128px',
            paddingTop: '19.5px',
            paddingBottom: '19.5px',
        }}>
            <span style={{ ...fontNormal1White, }}>
                Nós utilizamos cookies essenciais para o site funcionar e alguns adicionais para entender como você utiliza o Diário do Clima. Mais detalhes nos Termos.
            </span>
            <CloseIcon onClick={onClick} sx={{
                fontNormal1White,
                color: 'white',
                float: 'right',
                marginRight: '140px',
            }} />
        </Grid>
    );
}

export default CookieAlert;

