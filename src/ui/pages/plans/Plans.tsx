import { Grid } from '@mui/material';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import { Link } from 'react-router-dom';
import LinkManager from '@app/ui/components/linkManager/LinkManager';
import { urls } from '@app/ui/utils/urls';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import CheckIcon from '@mui/icons-material/Check';
import HyperLink from '@app/ui/components/hyperLink/HyperLink';
import FAQItem from './FaqItem/FaqItem';
import './Plans.scss';

const Plans = () => {
  return (
    <div className='plan-page'>
      <Grid container item className='container top-space' sm={12} justifyContent='center'>
        <Grid container item sm={8} >
          <div className='vertical-spacing-container plan-header'>
            <div className='green-title'>
              Diário do Clima PRO
            </div>
            <h2 className='h2-style'>
              Acesse todos os benefícios e nos ajude a crescer
            </h2>
            <LinkManager to={urls.purchase.url}>
              <ButtonGreen>
                Iniciar teste grátis
              </ButtonGreen>
            </LinkManager>
            <p className='paragraph-style sub-title'>
              Teste sem custos por 7 dias • Depois, R$00,00/mês
            </p>
            <p className='paragraph-style'>
              Enviaremos um lembrete 2 dias antes do período de teste terminar e você pode cancelar a qualquer momento
            </p>
          </div>
        </Grid>
      </Grid>
      <Grid container item className='container' sm={12} justifyContent='center'>
        <Grid item sm={8} className='vertical-spacing-container plans'>
          <h2 className='h2-style'>Assinatura</h2>
          <p className='desc-style'>Tenha nas mãos todas as informações que você precisa sobre políticas ambientais.</p>
          
          <Grid container justifyContent='space-between'>
            <div className='card-plan'>
              <h4 className='card-title'>Básico</h4>
              <p className='card-desc'>Para pessoas ou organizações que estão apenas começando a explorar sobre as políticas ambientais </p>
              <h1 className='card-price'>Grátis</h1>
              <div className='card-status'>Você já está utilizando esta versão.</div>
              <Link to={urls.search.url} className='hover-animation'>
                <ButtonOutlined classess='card-button'>
                  Começar a buscar
                </ButtonOutlined>
              </Link>
              <div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  Busca por palavra-chave ou CNPJ
                </div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  Busca avançada e/ou
                </div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  Filtro por município
                </div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  Visualização de resultados publicados nos últimos 3 meses
                </div>
              </div>
            </div>

            <div className='card-pro'>
              <h4 className='card-title'>PRO</h4>
              <p className='card-desc'>Para organizações que precisam das informações mais quentes sobre políticas ambientais</p>
              <h1 className='card-price'>R$0,00<span>/mês</span></h1>
              <Link to={urls.purchase.url} className='hover-animation'>
                <ButtonGreen classess='card-button'>
                  Começar teste grátis
                </ButtonGreen>
              </Link>
              <Grid container justifyContent='center' className='plan-pro-link'>
                <HyperLink link={urls.purchase.url}>
                  ou assinar agora
                </HyperLink>
              </Grid>
              <div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  Busca por palavra-chave ou CNPJ
                </div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  Busca avançada e/ou
                </div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  Filtro por município
                </div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  Visualização de resultados publicados nos últimos 3 meses
                </div>
                <div className='card-list-check-pro'>
                  <span className='check-icon'><CheckIcon className='pink-icon'/></span>
                  Visualização de resultados de <span className='underline'>todo o histórico disponível</span> no banco de dados
                </div>
                <div className='card-list-check-pro'>
                  <span className='check-icon'><CheckIcon className='pink-icon'/></span>
                  Filtro de busca por temas inteligentes
                </div>
                <div className='card-list-check-pro'>
                  <span className='check-icon'><CheckIcon className='pink-icon'/></span>
                  Criação de alertas com filtros e palavras-chaves personalizadas
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item sm={12} className='vertical-spacing-container gray-area' justifyContent='center' >
          <Grid item sm={8} className='container'>
            <h3 className='h3-style'>Encomende seu relatório</h3>
            <p className='paragraph-style'>Para organização que precisam de conteúdo centralizado e curado por especialistas sobre um determinado assunto</p>
            <Grid>
              <Link to=''>
                <ButtonGreen classess='button'>
                  Contactar vendas
                </ButtonGreen>
              </Link>
              <Link to=''>
                <ButtonOutlined classess='button button-gray'>
                  Simular custo
                </ButtonOutlined>
              </Link>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item sm={12} justifyContent='center' className='vertical-spacing-container'>
          <Grid item sm={8} className='container'>
            <h3 className='h3-style' >50% para organizações que não visam lucro</h3>
            <p className='paragraph-style'>Seu impacto é importante. O Diário do Clima apoia pessoas e organizações independentes que desejam utilizar nosso conteúdo para transformar a sociedade. Para se inscrever na lista de espera, preencha o formulário.</p>
            <Link to=''>
              <ButtonGreen>
                Solicitar desconto
              </ButtonGreen>
            </Link>
          </Grid>
        </Grid>

        <Grid container item sm={12} justifyContent='center' className='vertical-spacing-container'>
          <Grid item sm={8} className='container'>
            <h2 className='h2-style faq-title'>Perguntas frequentes</h2>
            <div>
              <FAQItem title='Como funciona a assinatura profissional do Diário do Clima?'>
                Para pessoas ou organizações que estão apenas começando a explorar sobre as políticas ambientais 
              </FAQItem>
              <FAQItem title='Quais formas de pagamento vocês aceitam?'>
                Para pessoas ou organizações que estão apenas começando a explorar sobre as políticas ambientais 
              </FAQItem>
              <FAQItem title='Quão seguro é o Diário do Clima?'>
                Para pessoas ou organizações que estão apenas começando a explorar sobre as políticas ambientais 
              </FAQItem>
              <FAQItem title='Como eu cancelo minha assinatura do Diário do Clima?'>
                Para pessoas ou organizações que estão apenas começando a explorar sobre as políticas ambientais 
              </FAQItem>
              <FAQItem title='O diário do clima oferece desconto?'>
                Para pessoas ou organizações que estão apenas começando a explorar sobre as políticas ambientais 
              </FAQItem>
            </div>
          </Grid>
        </Grid>
    </div>
  );
}

export default Plans;

