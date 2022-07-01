import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { fontRoboto, fontNormal1White } from '/src/ui/utils/fonts';
import { darkBlue } from '/src/ui/utils/colors';
import { MouseEventHandler } from 'react';

interface PropsCookieAlert {
  onClick: MouseEventHandler<SVGSVGElement>;
}

const CookieAlert = ({ onClick }: PropsCookieAlert) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Grid item xs={12} style={{
      backgroundColor: darkBlue,
      display: 'flex',
      flexDirection: isDesktop ? 'row' : 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '19.5px',
      paddingBottom: '19.5px',
      ...(isDesktop ? bigStyle : smallStyle),
    }}>
      <span style={{ ...fontNormal1White, ...fontRoboto, }}>
        Nós utilizamos cookies essenciais para o site funcionar e alguns adicionais para entender como você utiliza o Diário do Clima. Mais detalhes nos Termos.
      </span>
      <CloseIcon onClick={onClick} sx={{
        fontNormal1White,
        color: 'white',
        cursor: 'pointer',
        ...(!isDesktop && { paddingRight: '24px' }),
      }} />

    </Grid>
  );
}

export default CookieAlert;

const bigStyle = {
  paddingLeft: '130px',
  paddingRight: '130px',
};

const smallStyle = {
  paddingLeft: '24px',
  paddingRight: '24px',
};