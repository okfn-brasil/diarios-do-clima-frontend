import { Grid } from '@mui/material';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { fontSora, fontRoboto, fontTitle3Black, fontTitle1Green, fontNormal2Black } from '/src/ui/utils/fonts';

interface PropsDataLabel {
  data: string;
  featured: string;
  label: string;
  isDesktop: boolean;
  labelSmall: string;
}

const DataLabel = ({ data, featured, label, isDesktop, labelSmall }: PropsDataLabel) => {
  const text = isDesktop ? (
    <p style={{ ...fontNormal2Black, ...fontRoboto, fontSize: '18px', textAlign: 'center', margin: 0, }}>
      <b>{featured}</b>{label}
    </p>
  ) : (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <p style={{ margin: 0, }}><b>{featured}</b></p>
      <p style={{ ...fontNormal2Black, ...fontRoboto, fontSize: '16px', textAlign: 'center', margin: 0, width: '100%', }}>
        {isDesktop ? label : labelSmall}
      </p>
    </div>
  );
  return (
    <span>
      <p style={{
        ...fontTitle1Green,
        ...fontSora,
        textAlign: 'center',
        margin: 0,
        paddingBottom: 0,
        paddingTop: 28,
        lineHeight: '65px',
      }}>
        {data}
      </p>
      {text}
    </span>
  );
}

const Data = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Grid item container xs={12} sx={{
      ...(isDesktop ? {
          paddingTop: '80px',
          paddingBottom: '80px',
          paddingLeft: '128px',
          paddingRight: '128px',
      } : {
          paddingTop: '380px',
          paddingBottom: '80px',
          paddingLeft: '16px',
          paddingRight: '16px',
      }),
    }} >
      <Grid item xs={12}>
        <p style={{
          ...fontTitle3Black,
          ...fontSora,
          ...(isDesktop ? {
              fontSize: '22px',
          } : {
              fontSize: '24px',
          }),
          textAlign: 'center',
          margin: 0,
        }}>
          Dados confiáveis baseados no querido diário
        </p>
      </Grid>
      <Grid item container xs={12} justifyContent='center'>
        <Grid item md={4} xs={12}>
          <DataLabel isDesktop={isDesktop} data='21' featured='cidades' labelSmall=' já estão disponíveis' label=' já estão disponíveis para realizar buscas' />
        </Grid>
        <Grid item md={4} xs={12}>
          <DataLabel isDesktop={isDesktop} data='139mil' featured='diários oficiais' labelSmall=' encontrados pela busca até o momento' label=' encontrados pela busca até o momento' />
        </Grid>
        <Grid item md={4} xs={12}>
          <DataLabel isDesktop={isDesktop} data='2420' featured='cidades' labelSmall=' estão a caminho' label=' estarão disponíveis em breve' />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Data;
