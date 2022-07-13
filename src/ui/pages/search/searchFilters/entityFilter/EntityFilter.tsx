import SelectInput from "@app/ui/components/forms/select/Select";
import { SelectChangeEvent } from "@mui/material";


interface EntityFilterProps {
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
}

const EntityFilter = ({value, onChange}: EntityFilterProps) => {

  return (
    <>
      <section className='entity-filter'>
        <h3 className='h3-class'>Entes do governo</h3>
        <SelectInput
          options={[{value: 'x', label: 'x'},{value: 'y', label: 'y'}]} 
          placeholder='Selecione um ente' 
          value={value} 
          name='ente'
          onChange={onChange}
        />
      </section>
    </>
  );
};

export default EntityFilter;
