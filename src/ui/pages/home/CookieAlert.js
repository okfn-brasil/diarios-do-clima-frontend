import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { fontNormal1White } from '../../fonts';
import { darkBlue } from '../../colors';

const bigStyle = {
    paddingLeft: '130px',
    paddingRight: '130px',
};

const smallStyle = {
    paddingLeft: '24px',
    paddingRight: '24px',
};

function CookieAlert({ onClick, }) {    
    const theme = useTheme();
    const isBig = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Grid item xs={12} style={{
            backgroundColor: darkBlue,            
            display: 'flex',
            flexDirection: isBig ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '19.5px',
            paddingBottom: '19.5px',
            ...(isBig ? bigStyle : smallStyle),
        }}>

            <span style={{ ...fontNormal1White, }}>
                Nós utilizamos cookies essenciais para o site funcionar e alguns adicionais para entender como você utiliza o Diário do Clima. Mais detalhes nos Termos.
            </span>
            <CloseIcon onClick={onClick} sx={{
                fontNormal1White,
                color: 'white',
                ...(!isBig && { paddingRight: '24px' }),
            }} />

        </Grid>
    );
}

export default CookieAlert;

