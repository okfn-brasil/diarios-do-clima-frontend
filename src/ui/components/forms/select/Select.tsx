import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import selectArrow from '@app/assets/images/icons/arrow-down.svg';

interface Option {
  value: string;
  label: string;
  isSelected?: boolean;
  isDisabled?: boolean;
}

interface PropsSelect{
  placeholder?: string;
  value: string;
  label?: string;
  name: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  options: Option[];
  required?: boolean;
  classes?: string;
}

const selectIcon = () => {
  return (
    <img style={{width: '16px'}} src={selectArrow} />
  )
}

const SelectInput = ({value, required, classes, onChange, name, label, options, placeholder}: PropsSelect) => {
  return (
    <FormControl fullWidth className={`form-select ${classes}`}>
      {label ? <InputLabel id={`${name}-select`}>{label}</InputLabel> : <></>}
      <Select 
        required={required} 
        variant='standard' 
        IconComponent={selectIcon} 
        labelId={`${name}-select`} 
        value={value} 
        name={name} 
        onChange={onChange} 
      >
        {[(placeholder ? {value: '0', label: placeholder, isSelected: true, isDisabled: true} : null), 
          ...options]
          .filter(item => !!item)
          .map(option => <MenuItem key={option?.value} value={option?.value}>{option?.label}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

export default SelectInput;