import { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { FiltersState, Theme } from '@app/models/filters.model';
import GazettesService from '@app/services/gazettes';
import { RootState } from '@app/stores/store';
import HelpIcon from '@app/ui/components/helpIcon/HelpIcon';
import ProFlag from '@app/ui/components/proFlag/ProFlag';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

import './ThemeFilter.scss';

interface ThemeFilterProps {
  hasProPlan: boolean;
  themesFilter?: Theme;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ThemeFilter = ({onChange, hasProPlan, themesFilter}: ThemeFilterProps) => {
  const navigate: NavigateFunction = useNavigate();
  const gazzetesService = new GazettesService();
  const [themes, setThemes] : [Theme, Dispatch<Theme>] = useState({} as Theme);

  useEffect(() => {
    gazzetesService.getThemes().then(response => {
      const themesObj: Theme = {};
      (response as string[]).forEach(key => {
        themesObj[key] = null;
      });
      setThemes(themesObj);
    }).catch(() => {
      setThemes({});
    });
  }, []);
  
  return (
    <>
      { (themes && Object.keys(themes).length) ?
        <section className='section-filter-class theme-filter' onClick={() => !hasProPlan ? navigate(urls.becomePro.url) : null}>
          <h3 className='h3-class'>
            {TEXTS.searchPage.filters.themeTitle} <HelpIcon />
            <ProFlag spaceBottom={2} show={!hasProPlan}/>
          </h3>
          <p>{TEXTS.searchPage.filters.themeSubtitle}</p>
          <div>
            <FormGroup>
              {Object.keys(themes as Theme).map((key: string) => {
                return (<FormControlLabel 
                  key={key} 
                  disabled={!hasProPlan}
                  control={<Checkbox 
                    checked={!!((themesFilter || themes) as Theme)[key]} 
                    name={key} 
                    onChange={(e) => {hasProPlan ? onChange(e) : {};}} 
                  />} 
                  label={key} 
                />);}
              )}
            </FormGroup>
          </div>
        </section> :
        <></>
      }
    </>
  );
};

export default ThemeFilter;
