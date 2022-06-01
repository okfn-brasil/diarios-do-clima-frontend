import { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Box } from "@mui/material";
import { fontTitle3Black } from '../../fonts';
import Link from '../../components/Link';
import ButtonGreen from '../../components/button/ButtonGreen';

import HistoryLogo from '../../../assets/images/home/icons/history.svg';
import AlertsLogo from '../../../assets/images/home/icons/alerts.svg';
import ThemeLogo from '../../../assets/images/home/icons/theme.svg';

import HistoryLead from '../../../assets/images/home/weoffer.history.svg';
import AlertsLead from '../../../assets/images/home/weoffer.alerts.svg';
import ThemeLead from '../../../assets/images/home/weoffer.theme.svg';


function UnderlinText({
    children,
    padding = '2px',
    color = 'rgba(127, 227, 137, 1)',
    width = '4px',
    style,
}) {
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


function Option({ id, selectedId, label, sideLabel = true, icon, onClick }) {
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
                marginRight: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <img src={icon} alt="logo" style={{
                    width: '20px',
                    height: '20px',
                }} />
            </Box>
            <UnderlinText padding="4px" style={{
                ...(!isSelected && { borderBottomColor: 'rgba(0, 0, 0, 0)' }),
            }}>{label}</UnderlinText>
        </Grid>

    );
}

function getLeadImage(index) {
    if (index === 1)
        return HistoryLead;

    if (index === 2)
        return ThemeLead;

    if (index === 3)
        return AlertsLead;

    return HistoryLead;
}

function WeOffer() {
    const [selectedId, setSelectedId] = useState(1);
    const theme = useTheme();
    const isBig = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Grid item container xs={12}
            style={{
                backgroundColor: 'rgba(246, 248, 251, 1)',
                paddingTop: '80px',
                paddingLeft: isBig ? '125px' : '24px',
                paddingRight: isBig ? '125px' : '24px',
                marginTop: 0,
                paddingBottom: '80px',
            }}
        >
            <Grid item container xs={12} justifyContent='center'>
                <p style={{
                    ...fontTitle3Black,
                    paddingTop: 0,
                    marginTop: 0,
                    paddingBottom: '60px',
                    marginBottom: 0,
                }}>
                    O que oferecemos no <span style={{ color: 'rgba(82, 206, 95, 1)' }}>Diário do Clima PRO</span>
                </p>
            </Grid>
            <Grid item container xs={12}>
                <Grid item container xs={12} md={3} justifyContent='space-between'>
                    <Option sideLabel={isBig} id={1} onClick={() => setSelectedId(1)} icon={HistoryLogo} label="HISTÓRICO" selectedId={selectedId} />
                    <Option sideLabel={isBig} id={2} onClick={() => setSelectedId(2)} icon={ThemeLogo} label="TEMAS" selectedId={selectedId} />
                    <Option sideLabel={isBig} id={3} onClick={() => setSelectedId(3)} icon={AlertsLogo} label="ALERTAS" selectedId={selectedId} />
                </Grid>
                <Grid item xs={12} md={5}>
                    <img src={getLeadImage(selectedId)} alt="visual representation of option"
                        style={{

                            height: '320px',
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <h3 style={{
                        paddingTop: 0,
                        paddingBottom: 8,
                    }}>Acesse todo o histórico de resultados</h3>
                    <p style={{
                        paddingTop: 0,
                        paddingBottom: 24,
                    }}>Veja tudo o que já foi publicado, além dos três últimos meses, sobre políticas públicas ambientais</p>
                    <div style={{
                        paddingTop: 0,
                        paddingBottom: 19,
                    }}>
                        <ButtonGreen sx={{
                            minWidth: isBig ? null : '100%',
                        }}>
                            Teste grátis por 7 dias
                        </ButtonGreen>
                    </div>
                    <Link style={{
                        padding: 0,
                    }}>
                        Saiba mais sobre a assinatura
                    </Link>
                </Grid>
            </Grid>
        </Grid >
    );
}

export default WeOffer;
