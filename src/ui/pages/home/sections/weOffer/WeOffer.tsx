import { MouseEventHandler, useState } from 'react';
import { Grid, Box } from "@mui/material";
import HistoryLogo from '@app/assets/images/home/icons/history.svg';
import AlertsLogo from '@app/assets/images/home/icons/alerts.svg';
import ThemeLogo from '@app/assets/images/home/icons/theme.svg';
import HistoryLead from '@app/assets/images/home/weoffer.history.svg';
import AlertsLead from '@app/assets/images/home/weoffer.alerts.svg';
import ThemeLead from '@app/assets/images/home/weoffer.theme.svg';
import HyperLink from '@app/ui/components/hyperLink/HyperLink';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import LinkManager from '@app/ui/components/linkManager/LinkManager';
import { urls } from '@app/ui/utils/urls';
import './WeOffer.scss';

interface PropsUnderlinText {
  children?: JSX.Element | string;
  className?: string;
}

const UnderlinText =({
  children,
  className,
}: PropsUnderlinText) => {
  return (
    <span className={className}>
      {children}
    </span>
  );
}

interface PropsOption {
  id: number;
  selectedId: number;
  label: string;
  icon: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Option = ({ id, selectedId, label, icon, onClick }: PropsOption) => {
  const isSelected = selectedId === id;

  return (
    <Grid item xs={3} md={12} container alignItems='center' className='tab-grid'onClick={onClick}>
      <Box className='tab-area'>
        <img src={icon} alt='logo'/>
      </Box>
      <UnderlinText className={isSelected ? 'tab-selected' : 'tab-default'}>{label}</UnderlinText>
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
  return (
    <Grid container className='we-offer container gray-area' justifyContent='center'>
      <Grid item container xs={10} className='vertical-spacing-container'>
        <Grid item container xs={12} justifyContent='center'>
          <h3 className='h3-style'>
            O que oferecemos no <span className='green-h3'>Diário do Clima PRO</span>
          </h3>
        </Grid>
        <Grid item container xs={12}>
          <Grid item container xs={12} md={3} justifyContent='space-between'>
            <Option id={1} onClick={() => setSelectedId(1)} icon={HistoryLogo} label='HISTÓRICO' selectedId={selectedId} />
            <Option id={2} onClick={() => setSelectedId(2)} icon={ThemeLogo} label='TEMAS' selectedId={selectedId} />
            <Option id={3} onClick={() => setSelectedId(3)} icon={AlertsLogo} label='ALERTAS' selectedId={selectedId} />
          </Grid>
          <Grid item container justifyContent='center' xs={12} md={5}>
            <img src={getLeadImage(selectedId)} className='central-img' alt='visual representation of option'/>
          </Grid>
          <Grid item xs={12} md={4} className='call-to-action'>
            <h3 className='h3-style'>Acesse todo o histórico de resultados</h3>
            <p className='paragraph-style'>
              Veja tudo o que já foi publicado, além dos três últimos meses, sobre políticas públicas ambientais</p>
            <div>
              
              <LinkManager to={urls.purchase.url}>
                <ButtonGreen classess='call-to-action-button'>
                  Teste grátis por 7 dias
                </ButtonGreen>
              </LinkManager>
            </div>
            <HyperLink link={urls.purchase.url}>
              Saiba mais sobre a assinatura
            </HyperLink>
          </Grid>
        </Grid>
      </Grid >
    </Grid>
  );
}

export default WeOffer;
