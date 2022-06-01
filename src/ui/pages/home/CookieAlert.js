import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { fontNormal1White } from '../../fonts';

const bigStyle = {
    paddingLeft: '128px',
    paddingRight: '140px',
};

const smallStyle = {
    paddingLeft: '24px',
    paddingRight: '30px',
};

function CookieAlert({ show, onClick, }) {
    const opacity = show ? 1 : 0;
    const theme = useTheme();
    const isBig = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Grid item xs={12} style={{
            backgroundColor: 'black',
            opacity: opacity,
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

