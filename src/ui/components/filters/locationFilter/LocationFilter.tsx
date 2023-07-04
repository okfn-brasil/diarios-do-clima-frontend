import { Option } from '@app/models/forms.model';
import CitiesService from '@app/services/cities';
import HelpIcon from '@app/ui/components/helpIcon/HelpIcon';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SelectWithSearch from '../../forms/selectWithSearch/SelectWithSearch';

interface LocationFilterProps {
  value: string;
  onChange: (name: string, value: Option[]) => void;
}

const LocationFilter = ({value, onChange}: LocationFilterProps) => {
  const [citiesList, setCitiesList]: [Option[], Dispatch<SetStateAction<Option[]>>] = useState([] as Option[]);
  const citiesService = new CitiesService();

  useEffect(() => {
    citiesService.getAll().then(response => {
      const newCities = response.data.cities.map(city => { return {
        value: city.territory_id,
        label: `${city.territory_name} (${city.state_code})`,
      }}).sort((a, b) => a.label.localeCompare(b.label));
      setCitiesList(newCities);
    });
  }, []);

  return (
    <>
      <section className='section-filter-class'>  
        <h3 className='h3-class'>
          {TEXTS.searchPage.filters.locationTitle}
          <HelpIcon 
            tooltip={
            <div>
              O Diário do Clima está integrado ao Querido Diário, ferramenta que monitora os diários oficiais de dezenas de municípios e está em constante evolução. Veja a lista completa de cidades em: <a target='_blank' href='https://queridodiario.ok.org.br/cidades-disponiveis'>queridodiario.ok.org.br/cidades-disponiveis</a>
            </div>}
          />
        </h3>
        { citiesList && citiesList.length ? 
          <SelectWithSearch
            showAlways={true}
            name='territory_id'
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
