import { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { CheckBoxFilter } from '@app/models/filters.model';
import GazettesService from '@app/services/gazettes';
import HelpIcon from '@app/ui/components/helpIcon/HelpIcon';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

import '../themeFilter/ThemeFilter.scss';

interface ThemeFilterProps {
  entityFilter?: Record<string, boolean | null >;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EntityFilter = ({onChange, entityFilter}: ThemeFilterProps) => {
  const gazzetesService = new GazettesService();
  const [entities, setEntities] = useState<CheckBoxFilter>({} as CheckBoxFilter);
  const [showMoreEntities, setShowMoreEntities] : [boolean, Dispatch<boolean>] = useState(false);

  useEffect(() => {
    gazzetesService.getEntities().then(response => {
      const entitiesObj: CheckBoxFilter = {};
      (response as string[]).forEach(key => {
        entitiesObj[key] = null;
      });
      setEntities(entitiesObj);
    }).catch(() => {
      setEntities({});
    });
  }, []);

  return (
    <>
      { (entities && Object.keys(entities).length) ?
        <section className='section-filter-class theme-filter'>
          <h3 className='h3-class'>
            {TEXTS.searchPage.filters.themeTitle} <HelpIcon />
          </h3>
          <p>{TEXTS.searchPage.filters.themeSubtitle}</p>
          <div>
            <FormGroup>
              {Object.keys(entities as Record<string, boolean | null >)
                .sort((a, b) => a.localeCompare(b))
                .sort((entityA, entityB) => { 
                  const items: CheckBoxFilter = entityFilter || entities;
                  return (entities[entityA] === items[entityB])? 0 : items[entityA]? -1 : 1;
                })
                .map((key: string, index: number) => {
                  const item = !!((entityFilter || entities)[key]);
                  if (item || index < 4 || showMoreEntities) {
                    return (<FormControlLabel 
                      key={key}
                      label={key}
                      control={<Checkbox 
                        checked={!!item} 
                        name={key} 
                        onChange={onChange} 
                      />} 
                    />);
                
                  } else {
                    return <span key={key}></span>;
                  }
                })
              }
            </FormGroup>
            <div onClick={() => setShowMoreEntities(!showMoreEntities)} className='blue-link hover-animation show-more'>Mostrar {showMoreEntities ? 'menos' : 'mais'}</div>
          </div>
        </section> :
        <></>
      }
    </>
  );
};

export default EntityFilter;
