import { Grid } from '@mui/material';
import { fontRoboto, fontSora } from '@app/ui/utils/fonts';
import { blue, darkBlue, lightGray3 } from '@app/ui/utils/colors';
import { h3Style, paragraphStyle } from '@app/ui/utils/generalStyles';
import badge from '@app/assets/images/icons/badge.svg';
import homeWork from '@app/assets/images/icons/home_work.svg';
import { Link } from 'react-router-dom';
import ButtonSolidGreen from '@app/ui/components/button/ButtonGreen';
import SimulationForm from './simulation/Simulation';

interface PropsReportsPage{
  isDesktop: boolean;
}

const ReportsPage = ({isDesktop}: PropsReportsPage) => {
    return (
      <>
        <Grid container item className='container' sm={12} justifyContent='center' style={{backgroundColor: darkBlue, marginTop: '-80px'}}>
          <Grid container item sm={8} style={{paddingTop: isDesktop ? '80px' : '56px'}}>
            <div style={{margin: isDesktop ? '80px 0' : '56px 0', color: 'white'}}>
              <div style={{...fontSora, fontSize: '38px', fontWeight: 600, lineHeight: '48px', margin: '8px 0',}}>
                Relatórios de análises aprofundadas do Diário do Clima
              </div>
              <p style={{...paragraphStyle, color: 'white'}}>
                Informações qualificadas, baseadas nos diários oficiais e curadas por profissionais. Mais resultados e insights do que a interface do Diário do Clima oferece.
              </p>
              <Link to=''>
                <ButtonSolidGreen >
                  Simular o custo
                </ButtonSolidGreen>
              </Link>
            </div>
          </Grid>
        </Grid>
        <Grid container item className='container' sm={12} justifyContent='center' style={{backgroundColor: blue}}>
          <Grid container item sm={8} style={{padding: isDesktop ? '80px 0' : '56px 0', color: 'white', justifyContent: 'space-between'}}>
            <div style={{...iconWrapper, width: isDesktop ? 'calc(50% - 12px)' : '100%', marginBottom: isDesktop? '' : '24px'}}>
              <div style={iconStyle}>
                <img style={{width: '45%'}} src={badge} alt='icone de crachá'/>
              </div>
              <div style={{width: 'calc(100% - 80px)'}}>
                <div style={iconWrapperTitle}>Para profissionais de pesquisa e consultores</div>
                <div style={iconWrapperSubTitle}>Obtenha uma visão geral e abrangente sobre um tema</div>
              </div>
            </div>
            <div style={{...iconWrapper, width: isDesktop ? 'calc(50% - 12px)' : '100%'}}>
              <div style={iconStyle}>
                <img style={{width: '45%'}} src={homeWork} alt='icone de prédios'/>
              </div>
              <div style={{width: 'calc(100% - 80px)'}}>
                <div style={iconWrapperTitle}>Para organizações</div>
                <div style={iconWrapperSubTitle}>Obtenha dados e insights para tomar melhores decisões</div>
              </div>
            </div>
          </Grid>
        </Grid>

        
        <Grid container item className='container' sm={12} justifyContent='center' style={{backgroundColor: lightGray3}}>
          <Grid container item sm={8} style={{padding: isDesktop ? '80px 0' : '56px 0 32px'}}>
            <Grid container justifyContent='space-between'>
              <div style={isDesktop ? reportCardStyle : reportCardMobileStyle}>
                <h3 style={h3Style}>Nome do relatório de exemplo</h3>
                <p style={cardParagraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel accumsan massa, vitae bibendum turpis. Phasellus venenatis nunc in nisl lacinia, sed consequat nunc lobortis. Ut pellentesque, ligula fermentum imperdiet posuere, magna lorem sodales massa, ac posuere tortor magna vel quam. Nunc eu feugiat tellus, et luctus magna. Proin sodales tempus ultricies. Fusce tristique metus vitae enim egestas, fringilla imperdiet nulla ultrices. Nullam sed lacus ac erat ultricies hendrerit. Nulla sit amet sem dolor. Donec eros est, sagittis non metus ut, tempus facilisis sem.</p>
                <Link to='' className='hover-animation'>
                  <ButtonSolidGreen sx={{width: '100%'}}>
                    Ver relatório
                  </ButtonSolidGreen>
                </Link>
              </div>
              <div style={isDesktop ? reportCardStyle : reportCardMobileStyle}>
                <h3 style={h3Style}>Nome do relatório de exemplo</h3>
                <p style={cardParagraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel accumsan massa, vitae bibendum turpis. Phasellus venenatis nunc in nisl lacinia, sed consequat nunc lobortis. Ut pellentesque, ligula fermentum imperdiet posuere, magna lorem sodales massa, ac posuere tortor magna vel quam. Nunc eu feugiat tellus, et luctus magna. Proin sodales tempus ultricies. Fusce tristique metus vitae enim egestas, fringilla imperdiet nulla ultrices. Nullam sed lacus ac erat ultricies hendrerit. Nulla sit amet sem dolor. Donec eros est, sagittis non metus ut, tempus facilisis sem.</p>
                <Link to='' className='hover-animation'>
                  <ButtonSolidGreen sx={{width: '100%'}}>
                    Ver relatório
                  </ButtonSolidGreen>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item className='container' justifyContent='center' sm={12} style={{backgroundColor: lightGray3}}>
          <Grid container item sm={8} style={{padding: isDesktop ? '80px 0' : '56px 0'}} justifyContent='center'>
            <SimulationForm />
          </Grid>
        </Grid>

        <Grid container item className='container' sm={12} justifyContent='center'>
          <Grid item sm={8} style={{padding: isDesktop ? '80px 0' : '56px 0'}}>
            <h3 style={{...h3Style, margin: '0'}}>Dúvidas?</h3>
            <p style={{...paragraphStyle, margin: '8px 0 0'}}>Quer saber mais sobre os dados em seu relatório? 
              <Link to=''><span style={{color: blue}} className='hover-animation'> Entre em contato </span></Link> 
              para receber dicas para melhor interpretar e compreender as suas principais descobertas. Nossos especialistas estão prontos para ajudá-lo com insights profundos para melhor apresentar e revelar as conclusões de seu relatório personalizado.
            </p>
          </Grid>
        </Grid>
      </>
    );
}

export default ReportsPage;

const iconStyle: React.CSSProperties = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: darkBlue,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const iconWrapper: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center'
}

const iconWrapperTitle: React.CSSProperties = {
  ...fontRoboto,
  fontSize: '20px',
  lineHeight: '25px',
  paddingLeft: '24px',
}

const iconWrapperSubTitle: React.CSSProperties = {
  ...fontRoboto,
  marginTop: '8px',
  fontSize: '14px',
  lineHeight: '16px',
  paddingLeft: '24px',
}

const reportCardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '18px 24px 40px',
  width: 'calc(50% - 12px - 48px)'
}

const reportCardMobileStyle: React.CSSProperties = {
  ...reportCardStyle,
  width: 'calc(100% - 48px)',
  marginBottom: '24px',
}

const cardParagraph: React.CSSProperties = {
  margin: '8px 0 24px',
}