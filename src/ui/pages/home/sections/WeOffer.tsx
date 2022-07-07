import { MouseEventHandler, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Box } from "@mui/material";
import { fontTitle3Black, fontNormal2Black, fontNormal2BlackBold, fontSora, fontRoboto } from '@app/ui/utils/fonts';
import HyperLink from '@app/ui/components/hyperLink/HyperLink';
import ButtonGreen from '@app/ui/components/button/ButtonGreen';

import HistoryLogo from '@app/assets/images/home/icons/history.svg';
import AlertsLogo from '@app/assets/images/home/icons/alerts.svg';
import ThemeLogo from '@app/assets/images/home/icons/theme.svg';

import HistoryLead from '@app/assets/images/home/weoffer.history.svg';
import AlertsLead from '@app/assets/images/home/weoffer.alerts.svg';
import ThemeLead from '@app/assets/images/home/weoffer.theme.svg';
import { lightGray3, lightGreen } from '@app/ui/utils/colors';
import LinkManager from '@app/ui/components/linkManager/LinkManager';
import { urls } from '@app/ui/utils/urls';

interface PropsUnderlinText {
  children?: JSX.Element | string;
  padding?: string;
  color?: string;
  width?: string;
  style?: React.CSSProperties;
}

const UnderlinText =({
  children,
  padding = '2px',
  color = lightGreen,
  width = '4px',
  style,
}: PropsUnderlinText) => {
  return (
    <span style={{
      borderBottomColor: color,
      borderBottomWidth: width,
      borderBottomStyle: 'solid',
      paddingBottom: padding,
      ...style,
    }}>
      {children}
    </span>
  );
}

interface PropsOption {
  id: number;
  selectedId: number;
  label: string;
  sideLabel: boolean;
  icon: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Option = ({ id, selectedId, label, sideLabel = true, icon, onClick }: PropsOption) => {
  const isSelected = selectedId === id;

  return (
    <Grid item xs={3} md={12}
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...(!sideLabel && {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }),
        paddingBottom: '24px',
      }}>
      <Box style={{
        width: '68px',
        height: '68px',
        backgroundColor: 'rgba(23, 32, 48, 1)',
        borderRadius: '100%',
        marginRight: sideLabel ? '16px' : '',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: sideLabel ? '' : '14px',
      }}>
        <img src={icon} alt='logo' style={{
          width: '20px',
          height: '20px',
        }} />
      </Box>
      <UnderlinText padding={sideLabel ? '4px' : '6px'} style={{
        cursor: 'pointer',
        transition: '0.4s',
        ...fontSora,
        fontWeight: 600,
        paddingTop: '5px',
        ...(!isSelected && { borderBottomColor: 'rgba(0, 0, 0, 0)' }),
      }}>{label}</UnderlinText>
    </Grid>
  );
}

const getLeadImage = (index: number) => {
  if (index === 1)
    return HistoryLead;

  if (index === 2)
    return ThemeLead;

  if (index === 3)
    return AlertsLead;

  return HistoryLead;
}

const WeOffer = () => {
  const [selectedId, setSelectedId] = useState(1);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Grid item container xs={12}
      style={{
        backgroundColor: 'rgba(246, 248, 251, 1)',
        paddingTop: '80px',
        paddingLeft: isDesktop ? '125px' : '24px',
        paddingRight: isDesktop ? '125px' : '24px',
        marginTop: 0,
        paddingBottom: '80px',
      }}
    >
      <Grid item container xs={12} justifyContent='center'>
        <p style={{
          ...fontTitle3Black,
          ...fontSora,
          paddingTop: 0,
          marginTop: 0,
          paddingBottom: isDesktop ? '56px' : '39px',
          fontSize: isDesktop ? '22px' : '24px',
          marginBottom: 0,
          textAlign: 'center',
        }}>
          O que oferecemos no <span style={{ color: 'rgba(82, 206, 95, 1)' }}>Diário do Clima PRO</span>
        </p>
      </Grid>
      <Grid item container xs={12}>
        <Grid item container xs={12} md={3} justifyContent={isDesktop ? 'flex-start' : 'space-between'}>
          <Option sideLabel={isDesktop} id={1} onClick={() => setSelectedId(1)} icon={HistoryLogo} label='HISTÓRICO' selectedId={selectedId} />
          <Option sideLabel={isDesktop} id={2} onClick={() => setSelectedId(2)} icon={ThemeLogo} label='TEMAS' selectedId={selectedId} />
          <Option sideLabel={isDesktop} id={3} onClick={() => setSelectedId(3)} icon={AlertsLogo} label='ALERTAS' selectedId={selectedId} />
        </Grid>
        <Grid item xs={12} md={5} sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <img src={getLeadImage(selectedId)} alt='visual representation of option'
            style={{
              backgroundColor: lightGray3,
              paddingTop: '80px',
              paddingLeft: isDesktop ? '125px' : '24px',
              paddingRight: isDesktop ? '125px' : '24px',
              marginTop: 0,
              paddingBottom: '80px',
              maxWidth: '100%',
              maxHeight: isDesktop ? '320px' : '196px',
              marginBottom: isDesktop ? '' : '14px',
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <h3 style={{
            ...fontNormal2BlackBold,
            ...fontSora,
            margin: 0,
            paddingTop: 0,
            paddingBottom: 8,
          }}>Acesse todo o histórico de resultados</h3>
          <p style={{
            ...fontNormal2Black,
            ...fontRoboto,
            margin: 0,
            paddingTop: 0,
            paddingBottom: 24,
          }}>
            Veja tudo o que já foi publicado, além dos três últimos meses, sobre políticas públicas ambientais</p>
          <div style={{
            paddingTop: 0,
            paddingBottom: 18,
          }}>
            
            <LinkManager to={urls.purchase.url}>
              <ButtonGreen sx={{
                minWidth: isDesktop ? '' : '100%',
              }}>
                Teste grátis por 7 dias
              </ButtonGreen>
            </LinkManager>
          </div>
          <HyperLink link={urls.purchase.url} sx={{
            ...fontRoboto,
            padding: 0,
          }}>
            Saiba mais sobre a assinatura
          </HyperLink>
        </Grid>
      </Grid>
    </Grid >
  );
}

export default WeOffer;
