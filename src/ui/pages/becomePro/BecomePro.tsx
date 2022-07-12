import { Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import { Link } from 'react-router-dom';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import { urls } from '@app/ui/utils/urls';
import './BecomePro.scss';

const BecomePro = () => {
  return (
    <Grid container className='container become-pro vertical-spacing-container'>
      <Grid item container xs={0} sm={3}></Grid>
      <Grid item xs={12} sm={6}>
        <div className='h3-class'>
          Torne-se assinante do <span className='green-h3'>Diário do Clima PRO</span>
        </div>
        <p className='subtitle'>Ao assinar, você nos ajuda a desenvolver esse projeto sem fins lucrativos e tem acesso aos benefícios do Diário do Clima PRO</p>
        <p className='subtitle text-space'>O seu cadastro básico inclui:</p>
        <div className='check-group'>
          <div className='check-item'>
            <span className='check-icon'><CheckIcon color='disabled'/></span> Acesso limitado ao conteúdo
          </div>
        </div>
        <hr className='check-group thin-line'/>
        <div className='check-group'>
          <p className='subtitle'>A assinatura PRO inclui:</p>
          <div className='check-item'>
            <span className='check-icon'><CheckIcon className='green-icon'/></span> Visualização de resultados de todo o histórico disponível no banco de dados
          </div>
          <div className='check-item'>
            <span className='check-icon'><CheckIcon className='green-icon'/></span> Filtro de busca por temas inteligentes
          </div>
          <div className='check-item'>
            <span className='check-icon'><CheckIcon className='green-icon'/></span> Criação de alertas com filtros e palavras-chaves personalizadas
          </div>
        </div>
        <div className='button-area'>
          <Link to={urls.purchase.url}><ButtonGreen classess='card-button'>Quero assinar</ButtonGreen></Link>
          <Link to={urls.startSearch.url}><ButtonOutlined classess='card-button button-gray'>Continuar sem assinatura</ButtonOutlined></Link>
        </div>
      </Grid>
    </Grid>
  );
}

export default BecomePro;
