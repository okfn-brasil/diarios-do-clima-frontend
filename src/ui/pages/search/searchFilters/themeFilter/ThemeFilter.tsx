import { ChangeEvent, Dispatch, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Theme } from '@app/models/filters.model';
import HelpIcon from '@app/ui/components/helpIcon/HelpIcon';
import ProFlag from '@app/ui/components/proFlag/ProFlag';
import { urls } from '@app/ui/utils/urls';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

import './ThemeFilter.scss';
import { TEXTS } from '@app/ui/utils/portal-texts';

interface ThemeFilterProps {
  options: Theme;
  hasProPlan: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ThemeFilter = ({onChange, options, hasProPlan}: ThemeFilterProps) => {
  const navigate: NavigateFunction = useNavigate();
  const [showMoreThemes, setShowMoreThemes] : [boolean, Dispatch<boolean>] = useState(false);

  const checkIfShowMore = () => {
    let min = 3;
    Object.keys(options).forEach((option, index) => {
      if(options[option] && index >= min) {
        min = index + 1;
      }
    });
    return showMoreThemes ? 20 : min;
  };

  return (
    <>
      <section className='section-filter-class theme-filter' onClick={() => !hasProPlan ? navigate(urls.becomePro.url) : null}>
        <h3 className='h3-class'>
            {TEXTS.searchPage.filters.themeTitle} <HelpIcon />
          <ProFlag spaceBottom={2} show={!hasProPlan}/>
        </h3>
        <p>{TEXTS.searchPage.filters.themeSubtitle}</p>
        <div>
          <FormGroup>
            {Object.keys(options as Theme).splice(0, checkIfShowMore()).map((key: string) => {
              return (<FormControlLabel 
                key={key} 
                disabled={!hasProPlan}
                control={<Checkbox 
                  checked={!!(options)[key]} 
                  name={key} 
                  onChange={(e) => {hasProPlan ? onChange(e) : {};}} 
                />} 
                label={key} 
              />);}
            )}
          </FormGroup>
          <button onClick={() => setShowMoreThemes(!showMoreThemes)} className='blue-link hover-animation show-more'>Mostrar {showMoreThemes ? 'menos' : 'mais'}</button>
        </div>
      </section>
    </>
  );
};

export default ThemeFilter;
