import { Grid } from '@mui/material';
import badge from '@app/assets/images/icons/badge.svg';
import homeWork from '@app/assets/images/icons/home_work.svg';
import { Link } from 'react-router-dom';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import SimulationForm from './simulation/Simulation';
import './Reports.scss';

const ReportsPage = () => {
    return (
      <div className='reports-page'>
        <Grid container item className='container top-space header-area' sm={12} justifyContent='center'>
          <Grid container item sm={8}>
            <div className='vertical-spacing-container'>
              <div className='h2-class'>
                Relatórios de análises aprofundadas do Diário do Clima
              </div>
              <p className='paragraph-class'>
                Informações qualificadas, baseadas nos diários oficiais e curadas por profissionais. Mais resultados e insights do que a interface do Diário do Clima oferece.
              </p>
              <Link to=''>
                <ButtonGreen >
                  Simular o custo
                </ButtonGreen>
              </Link>
            </div>
          </Grid>
        </Grid>
        <Grid container item className='container icons-area' sm={12} justifyContent='center'>
          <Grid container item sm={8} className='vertical-spacing-container' justifyContent='space-between'>
            <div className='icon-wrapper'>
              <div className='icon-class'>
                <img src={badge} alt='icone de crachá'/>
              </div>
              <div className='icon-text'>
                <div className='icon-wrapper-title'>Para profissionais de pesquisa e consultores</div>
                <div className='icon-wrapper-sub-title'>Obtenha uma visão geral e abrangente sobre um tema</div>
              </div>
            </div>
            <div className='icon-wrapper'>
              <div className='icon-class'>
                <img src={homeWork} alt='icone de prédios'/>
              </div>
              <div className='icon-text'>
                <div className='icon-wrapper-title'>Para organizações</div>
                <div className='icon-wrapper-sub-title'>Obtenha dados e insights para tomar melhores decisões</div>
              </div>
            </div>
          </Grid>
        </Grid>

        
        <Grid container item className='container gray-area' sm={12} justifyContent='center'>
          <Grid container item sm={8} className='vertical-spacing-container'>
            <Grid container justifyContent='space-between'>
              <div className='report-card-class'>
                <h3 className='h3-class'>Nome do relatório de exemplo</h3>
                <p className='card-paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel accumsan massa, vitae bibendum turpis. Phasellus venenatis nunc in nisl lacinia, sed consequat nunc lobortis. Ut pellentesque, ligula fermentum imperdiet posuere, magna lorem sodales massa, ac posuere tortor magna vel quam. Nunc eu feugiat tellus, et luctus magna. Proin sodales tempus ultricies. Fusce tristique metus vitae enim egestas, fringilla imperdiet nulla ultrices. Nullam sed lacus ac erat ultricies hendrerit. Nulla sit amet sem dolor. Donec eros est, sagittis non metus ut, tempus facilisis sem.</p>
                <Link to='' className='hover-animation'>
                  <ButtonGreen classess='card-button'>
                    Ver relatório
                  </ButtonGreen>
                </Link>
              </div>
              <div className='report-card-class'>
                <h3 className='h3-class'>Nome do relatório de exemplo</h3>
                <p className='card-paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel accumsan massa, vitae bibendum turpis. Phasellus venenatis nunc in nisl lacinia, sed consequat nunc lobortis. Ut pellentesque, ligula fermentum imperdiet posuere, magna lorem sodales massa, ac posuere tortor magna vel quam. Nunc eu feugiat tellus, et luctus magna. Proin sodales tempus ultricies. Fusce tristique metus vitae enim egestas, fringilla imperdiet nulla ultrices. Nullam sed lacus ac erat ultricies hendrerit. Nulla sit amet sem dolor. Donec eros est, sagittis non metus ut, tempus facilisis sem.</p>
                <Link to='' className='hover-animation'>
                  <ButtonGreen classess='card-button'>
                    Ver relatório
                  </ButtonGreen>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item className='container gray-area' justifyContent='center' sm={12}>
          <Grid container item sm={8} className='vertical-spacing-container' justifyContent='center'>
            <SimulationForm />
          </Grid>
        </Grid>

        <Grid container item className='container doubts' sm={12} justifyContent='center'>
          <Grid item sm={8} className='vertical-spacing-container'>
            <h3 className='h3-class-sx-margin'>Dúvidas?</h3>
            <p className='paragraph-class'>Quer saber mais sobre os dados em seu relatório? 
              <Link to=''><span className='hover-animation'> Entre em contato </span></Link> 
              para receber dicas para melhor interpretar e compreender as suas principais descobertas. Nossos especialistas estão prontos para ajudá-lo com insights profundos para melhor apresentar e revelar as conclusões de seu relatório personalizado.
            </p>
          </Grid>
        </Grid>
      </div>
    );
}

export default ReportsPage;

