import { Grid } from '@mui/material';
import ButtonGreen from '/src/ui/components/button/ButtonGreen';
import { Link } from 'react-router-dom';
import { fontRoboto, fontSora } from '/src/ui/utils/fonts';
import { darkBlue, darkGray1, gray2, gray5, green } from '../../utils/colors';
import { h2Style, paragraphStyle } from '../../utils/generalStyles';
import LinkManager from '../../components/linkManager/LinkManager';
import { urls } from '../../utils/urls';
import ButtonOutlined from '../../components/button/ButtonOutlined';
import CheckIcon from '@mui/icons-material/Check';
import HyperLink from '../../components/hyperLink/HyperLink';

interface PropsPlans {
  isDesktop: boolean;
}

const Plans = ({isDesktop}: PropsPlans) => {
  return (
    <div className='plan-page'>
      <Grid container item className='container' sm={12} justifyContent='center' style={{backgroundColor: darkBlue, marginTop: '-80px'}}>
        <Grid container item sm={8} style={{paddingTop: isDesktop ? '80px' : '56px'}}>
          <div style={{margin: isDesktop ? '80px 0' : '56px 0', color: 'white'}}>
            <div style={{...fontSora, lineHeight: '18px', fontWeight: 600, fontSize: '14px', color: green}}>
              Diário do Clima PRO
            </div>
            <h2 style={{...h2Style, color: 'white', margin: '16px 0',}}>
              Acesse todos os benefícios e nos ajude a crescer
            </h2>
            <LinkManager to={urls.purchase.url}>
              <ButtonGreen>
                Iniciar teste grátis
              </ButtonGreen>
            </LinkManager>
            <p style={{...paragraphStyle, color: 'white', fontSize: '20px', lineHeight: '25px', marginBottom: '8px', marginTop: '33px'}}>
              Teste sem custos por 7 dias • Depois, R$00,00/mês
            </p>
            <p style={{...paragraphStyle, color: 'white', margin: 0}}>
              Enviaremos um lembrete 2 dias antes do período de teste terminar e você pode cancelar a qualquer momento
            </p>
          </div>
        </Grid>
      </Grid>
      <Grid container item className='container' sm={12} justifyContent='center'>
        <Grid item sm={8} style={{padding: isDesktop ? '80px 0' : '56px 0'}}>
          <h2 style={{...h2Style, margin: '0'}}>Assinatura</h2>
          <p style={{...paragraphStyle, fontSize: '20px', lineHeight: '25px', color: gray5, margin: '8px 0 0'}}>Tenha nas mãos todas as informações que você precisa sobre políticas ambientais.</p>
          
          <Grid container justifyContent='space-between'>
            <div style={isDesktop ? cardStyle : cardStyleMobile}>
              <h4 style={cardTitle}>Básico</h4>
              <p style={cardDesc}>Para pessoas ou organizações que estão apenas começando a explorar sobre as políticas ambientais </p>
              <h1 style={cardPrice}>Grátis</h1>
              <div style={cardStatus}>Você já está utilizando esta versão.</div>
              <Link to={urls.search.url} className='hover-animation'>
                <ButtonOutlined sx={cardButton}>
                  Começar a buscar
                </ButtonOutlined>
              </Link>
              <div>
                <div style={cardListCheck}>
                  <span style={checkIcon}><CheckIcon color='disabled'/></span>
                  Busca por palavra-chave ou CNPJ
                </div>
                <div style={cardListCheck}>
                  <span style={checkIcon}><CheckIcon color='disabled'/></span>
                  Busca avançada e/ou
                </div>
                <div style={cardListCheck}>
                  <span style={checkIcon}><CheckIcon color='disabled'/></span>
                  Filtro por município
                </div>
                <div style={cardListCheck}>
                  <span style={checkIcon}><CheckIcon color='disabled'/></span>
                  Visualização de resultados publicados nos últimos 3 meses
                </div>
              </div>
            </div>

            <div style={isDesktop ? cardStyle : cardStyleMobile}>
              <h4 style={cardTitle}>PRO</h4>
              <p style={cardDesc}>Para organizações que precisam das informações mais quentes sobre políticas ambientais</p>
              <h1 style={cardPrice}>R$0,00<span>/mês</span></h1>
              <Link to={urls.purchase.url} className='hover-animation'>
                <ButtonGreen sx={{...cardButton, color: darkBlue, marginBottom: '20px'}}>
                  Começar teste grátis
                </ButtonGreen>
              </Link>
              <Grid container justifyContent='center' sx={{marginBottom: '28px'}}>
                <HyperLink link={urls.purchase.url}>
                  ou assinar agora
                </HyperLink>
              </Grid>
              <div>
                <div style={cardListCheck}>
                  <span style={checkIcon}><CheckIcon color='disabled'/></span>
                  Busca por palavra-chave ou CNPJ
                </div>
                <div style={cardListCheck}>
                  <span style={checkIcon}><CheckIcon color='disabled'/></span>
                  Busca avançada e/ou
                </div>
                <div style={cardListCheck}>
                  <span style={checkIcon}><CheckIcon color='disabled'/></span>
                  Filtro por município
                </div>
                <div style={cardListCheck}>
                  <span style={checkIcon}><CheckIcon color='disabled'/></span>
                  Visualização de resultados publicados nos últimos 3 meses
                </div>
                <div style={cardListCheckPro}>
                  <span style={checkIconPro}><CheckIcon color='success'/></span>
                  Visualização de resultados de <span style={{textDecoration: 'underline'}}>todo o histórico disponível</span> no banco de dados
                </div>
                <div style={cardListCheckPro}>
                  <span style={checkIconPro}><CheckIcon color='success'/></span>
                  Filtro de busca por temas inteligentes
                </div>
                <div style={cardListCheckPro}>
                  <span style={checkIconPro}><CheckIcon color='success'/></span>
                  Criação de alertas com filtros e palavras-chaves personalizadas
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Plans;

const cardStyle: React.CSSProperties = {
  width: 'calc(50% - 12px - 48px)',
  border: '1px solid ' + gray2,
  padding: '40px 24px',
  marginTop: '24px',
}

const cardStyleMobile: React.CSSProperties = {
  ...cardStyle,
  width: 'calc(100% - 48px)',
}


const cardTitle: React.CSSProperties = {
  margin: '0 0 8px', fontSize: '22px', lineHeight: '28px', color: darkBlue
}

const cardDesc: React.CSSProperties = {
  ...paragraphStyle,
  color: darkGray1,
  margin: '0'
}

const cardPrice: React.CSSProperties = {
  ...h2Style,
  ...fontRoboto,
  color: darkGray1,
  fontWeight: 0,
  margin: '22px 0 14px'
}

const cardStatus: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '16px',
  color: gray5
}

const cardButton: React.CSSProperties = {
  color: gray5, width: '100%', margin: '16px 0 25px'
}

const cardListCheck: React.CSSProperties = {
  position: 'relative',
  ...paragraphStyle,
  color: gray5,
  paddingLeft: '40px'
}

const cardListCheckPro: React.CSSProperties = {
  ...cardListCheck,
  fontSize: '16px',
  lineHeight: '18px',
  fontWeight: 600,
}

const checkIcon: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
}

const checkIconPro: React.CSSProperties = {
  ...checkIcon,
  top: '-3px',
}