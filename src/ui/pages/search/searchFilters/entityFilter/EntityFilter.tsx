import SelectInput from '@app/ui/components/forms/select/Select';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { SelectChangeEvent } from '@mui/material';


interface EntityFilterProps {
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
}

const EntityFilter = ({value, onChange}: EntityFilterProps) => {

  return (
    <>
      <section className='entity-filter'>
        <h3 className='h3-class'>{TEXTS.searchPage.filters.entityTitle}</h3>
        <SelectInput
          options={[{value: 'x', label: 'x'},{value: 'y', label: 'y'}]} 
          placeholder={TEXTS.searchPage.filters.entityLabel} 
          value={value} 
          name='ente'
          onChange={onChange}
        />
      </section>
    </>
  );
};

export default EntityFilter;
