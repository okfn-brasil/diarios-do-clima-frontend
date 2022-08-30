import { Option } from '@app/models/forms.model';
import CitiesService from '@app/services/cities';
import HelpIcon from '@app/ui/components/helpIcon/HelpIcon';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { SelectChangeEvent } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SelectWithSearch from '../../forms/selectWithSearch/SelectWithSearch';

interface LocationFilterProps {
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
}

const LocationFilter = ({value, onChange}: LocationFilterProps) => {
  const [citiesList, setCitiesList]: [Option[], Dispatch<SetStateAction<Option[]>>] = useState([] as Option[]);
  const citiesService = new CitiesService();

  useEffect(() => {
    citiesService.getAll().then(response => {
      const newCities = response.data.cities.map(city => { return {
        value: city.territory_id,
        label: `${city.territory_name} (${city.state_code})`,
      }});
      setCitiesList(newCities);
    });
  }, []);

  return (
    <>
      <section className='section-filter-class'>  
        <h3 className='h3-class'>
          {TEXTS.searchPage.filters.locationTitle}
          <HelpIcon/>
        </h3>
        { citiesList && citiesList.length ? 
          <SelectWithSearch
            name='location'
            options={citiesList}
            placeholder={TEXTS.searchPage.filters.locationLabel} 
            value={value}
            onChange={onChange} 
           />
          : <></>
        }
      </section>
    </>
  );
};

export default LocationFilter;
