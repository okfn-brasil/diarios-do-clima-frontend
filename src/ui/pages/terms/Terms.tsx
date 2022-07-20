import { TEXTS } from '@app/ui/utils/portal-texts';
import { Grid } from '@mui/material';

import './Terms.scss';

const TermsPage = () => {
  return (
    <Grid container item className='container terms' sm={12} justifyContent='center'>
      <Grid container item sm={8} className='vertical-spacing-container'>
        <div className='font-sora'>
          {TEXTS.termsPage.title}
        </div>

        {TEXTS.termsPage.section.map(section => 
          <div className='terms-section'>
            {section.titleSize === 'h4' ? <h4 className='h4-class'>{section.title}</h4> : <h3 className='h3-class'>{section.title}</h3>}
            {section.paragraphs.map(paragraph => <p className='paragraph-class'>{paragraph}</p>)}
            {section.list ? 
              <div className='list paragraph-class'>{section.list.map(paragraph => <p className='paragraph-class'>{paragraph}</p>)}</div>
              : null
            }
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default TermsPage;

