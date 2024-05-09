import { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CheckBoxFilter } from '@app/models/filters.model';
import GazettesService from '@app/services/gazettes';
import HelpIcon from '@app/ui/components/helpIcon/HelpIcon';
import ProFlag from '@app/ui/components/proFlag/ProFlag';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

import './ThemeFilter.scss';

interface ThemeFilterProps {
  hasProPlan: boolean;
  themesFilter?: CheckBoxFilter;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ThemeFilter = ({onChange, hasProPlan, themesFilter}: ThemeFilterProps) => {
  const navigate: NavigateFunction = useNavigate();
  const gazzetesService = new GazettesService();
  const [themes, setThemes] = useState<CheckBoxFilter>({} as CheckBoxFilter);
  const [showMoreThemes, setShowMoreThemes] : [boolean, Dispatch<boolean>] = useState(false);

  useEffect(() => {
    gazzetesService.getThemes().then(response => {
      const themesObj: CheckBoxFilter = {};
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
            {TEXTS.searchPage.filters.themeTitle} 
            <HelpIcon 
              tooltip={
              <div>
                Cada excerto de diário oficial disponível no Diários do Clima é classificado quanto a um subtema. Cada subtema foi escolhido pela nossa equipe de especialistas e endereçam os principais tópicos encontrados em diários oficiais municipais. No entanto, a lista de subtemas e os excertos associados a cada um podem variar mediante melhorias no filtro temático. 
              </div>}
            />
            <ProFlag spaceBottom={2} margin={38} show={!hasProPlan}/>
          </h3>
          <p>{TEXTS.searchPage.filters.themeSubtitle}</p>
          <div>
            <FormGroup>
              {Object.keys(themes as CheckBoxFilter)
                .sort((a, b) => a.localeCompare(b))
                .sort((themeA, themeB) => { 
                  const items: CheckBoxFilter = themesFilter || themes;
                  return (themes[themeA] === items[themeB])? 0 : items[themeA]? -1 : 1;
                })
                .map((key: string, index: number) => {
                  const item = !!((themesFilter || themes)[key]);
                  if (item || index < 4 || showMoreThemes) {
                    return (<FormControlLabel 
                      key={key} 
                      disabled={!hasProPlan}
                      label={key}
                      control={<Checkbox 
                        checked={!!item} 
                        name={key} 
                        onChange={(e) => {hasProPlan ? onChange(e) : {};}} 
                      />} 
                    />);
                
                  } else {
                    return <span key={key}></span>;
                  }
                })
              }
            </FormGroup>
            <div onClick={() => setShowMoreThemes(!showMoreThemes)} className='blue-link hover-animation show-more'>Mostrar {showMoreThemes ? 'menos' : 'mais'}</div>
          </div>
        </section> :
        <></>
      }
    </>
  );
};

export default ThemeFilter;
