import { Grid } from '@mui/material';

import './Data.scss';

interface PropsDataLabel {
  data: string;
  featured: string;
  label: string;
}

const DataLabel = ({ data, featured, label }: PropsDataLabel) => {

  return (
    <span>
      <p className='number-title'>
        {data}
      </p>
      <p className='paragraph-class only-desktop'>
        <b>{featured}</b>{label}
      </p>

      <div className='only-mobile'>
        <div className='data-label'>
          <span><b>{featured}</b></span>
          <p className='mobile-text'>
            <span>{label}</span>
          </p>
        </div>
      </div>
    </span>
  );
};

const Data = () => {
  return (
    <Grid item container xs={12} className='vertical-spacing-container data-section'>
      <Grid item xs={12}>
        <h3 className='h3-class'>Dados confiáveis baseados no querido diário</h3>
      </Grid>
      <Grid item container xs={12} justifyContent='center'>
        <Grid item md={4} xs={12}>
          <DataLabel data='21' featured='cidades' label=' já estão disponíveis para realizar buscas' />
        </Grid>
        <Grid item md={4} xs={12}>
          <DataLabel data='139mil' featured='diários oficiais' label=' encontrados pela busca até o momento' />
        </Grid>
        <Grid item md={4} xs={12}>
          <DataLabel data='2420' featured='cidades' label=' estarão disponíveis em breve' />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Data;
