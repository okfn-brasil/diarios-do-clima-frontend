import { TEXTS } from '@app/ui/utils/portal-texts';
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
      <Grid item xs={12} className='container'>
        <h3 className='h3-class'>{TEXTS.home.data.title}</h3>
      </Grid>
      <Grid item container xs={12} justifyContent='center'>
        <Grid item md={4} xs={12}>
          <DataLabel data={TEXTS.home.data.label.city.data} featured={TEXTS.home.data.label.city.featured} label={TEXTS.home.data.label.city.label} />
        </Grid>
        <Grid item md={4} xs={12}>
          <DataLabel data={TEXTS.home.data.label.diaries.data} featured={TEXTS.home.data.label.diaries.featured} label={TEXTS.home.data.label.diaries.label} />
        </Grid>
        <Grid item md={4} xs={12}>
          <DataLabel data={TEXTS.home.data.label.citiesMore.data} featured={TEXTS.home.data.label.citiesMore.featured} label={TEXTS.home.data.label.citiesMore.label}/>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Data;
