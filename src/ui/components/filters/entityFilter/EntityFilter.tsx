import { Dispatch, useEffect, useState } from 'react';
import GazettesService from '@app/services/gazettes';
import SelectInput from '@app/ui/components/forms/select/Select';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { SelectChangeEvent } from '@mui/material';
import { AxiosResponse } from 'axios';


interface EntityFilterProps {
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
}

const EntityFilter = ({value, onChange}: EntityFilterProps) => {
  const gazzetesService = new GazettesService();
  const [entities, setEntities] : [string[], Dispatch<string[]>] = useState([] as string[]);

  useEffect(() => {
    gazzetesService.getEntities().then((response: AxiosResponse | string[]) => {
      setEntities(response as string[]);
    }).catch(() => {
      setEntities([]);
    });
  }, []);

  return (
    <>
      { entities && entities.length ?
        <section className='entity-filter'>
          <h3 className='h3-class'>{TEXTS.searchPage.filters.entityTitle}</h3>
          <SelectInput
            options={entities.map(entity => {
              return {
                value: entity,
                label: entity,
              };
            })} 
            placeholder={TEXTS.searchPage.filters.entityLabel} 
            value={value} 
            name='ente'
            onChange={onChange}
          />
        </section> :
        <></>
      }
    </>
  );
};

export default EntityFilter;
