import selectArrow from '@app/assets/images/icons/arrow-down.svg';
import { FormControl, Input, InputLabel, SelectChangeEvent } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import './SelectWithSearch.scss';

interface Option {
  value: string;
  label: string;
  isSelected?: boolean;
  isDisabled?: boolean;
}

interface PropsSelect{
  placeholder?: string;
  value: string | string[];
  name: string;
  showAlways?: boolean;
  onChange?: (name: string, value: Option[]) => void;
  onChangeSelect?: (e: SelectChangeEvent) => void;
  options: Option[];
  label?: string;
  classes?: string;
  resetField?: number;
}

const SelectIcon = () => {
  return (
    <img style={{width: '16px'}} src={selectArrow} />
  );
};

const SelectWithSearch = ({value, resetField, label, classes, showAlways, onChange, onChangeSelect, name, options, placeholder}: PropsSelect) => {
  const [inputValue, setInputValue]: [string, Dispatch<SetStateAction<string>>] = useState('' as string);
  const [showMenu, setShowMenu]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [selectedOption, setSelectedOption]: [Option, Dispatch<SetStateAction<Option>>] = useState(
    options.find(option => option.value === value) as Option || { label: '', value: '' }
  );
  const [selectedOptions, setSelectedOptions]: [Option[], Dispatch<SetStateAction<Option[]>>] = useState([] as Option[]);

  useEffect(() => {
    setInputValue('');
    setSelectedOption({ label: '', value: '' });
  }, [resetField])

  useEffect(() => {
    if(value && options.length) {
      const currValue = options.filter(option => value.includes(option.value));
      setSelectedOptions(currValue);
    }
  }, [value])

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue as string);
    if (inputValue.length >= 3 || showAlways) {
      setShowMenu(true);
    }
    if(onChangeSelect) {
      onChangeSelect({target: {name: name, value: ''}} as SelectChangeEvent);
    } else if(onChange){
      onChange(name, selectedOptions);
    }
  }

  const onClickOption = (option: Option) => {
    setInputValue('');
    setSelectedOption(option);
    if(!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    if(onChangeSelect) {
      onChangeSelect({target: {name: name, value: option.label}} as SelectChangeEvent);
    } else if(onChange){
      onChange(name, [...selectedOptions, option]);
    }
    setShowMenu(false);
  }

  const onBlur = () => {
    setTimeout(() => {
      setShowMenu(false);
    }, 250);
  }

  const onClick = () => {
    if (inputValue.length >= 3 || showAlways) {
      setShowMenu(true);
    }
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.code === 'Backspace' && selectedOption.value) {
      setInputValue('');
    }

    setSelectedOption({ label: '', value: '' } as Option);
  }

  const removeCity = (label: string) => {
    const newSelectedOptions = selectedOptions.filter(item => item.label !== label);
    setSelectedOptions(newSelectedOptions);
    if(onChange) {
      onChange(name, newSelectedOptions);
    }
  }

  return (
    <FormControl onKeyUp={onKeyUp} fullWidth className={`form-select select-with-search ${classes}`}>
      {label ? <InputLabel id={`${name}-select`}>{label}</InputLabel> : <></>}
      <SelectIcon />
      {onChange ?
        <div  className='seleted-citites'>
          {selectedOptions.map(item => <div key={item.value} className='selected-city' onClick={() => removeCity(item.label)}>
            {item.label} <span>X</span>
            </div>)}
        </div>
        : <></>
      }
      <Input
        placeholder={placeholder}
        onClick={onClick}
        onBlur={onBlur}
        autoComplete="off"
        value={inputValue}
        name={name} 
        onChange={onChangeInput} 
      />
      {showMenu ? 
        <div className='select-menu'>
          {options.filter(option => (inputValue.length >=3 || showAlways) && option.label.toLowerCase().includes(inputValue.toLowerCase()) && !selectedOptions.includes(option))
            .map(option => <div key={option.value} onClick={() => onClickOption(option)} className='option'>{option.label}</div>)}
        </div>
        : <></>
      }
    </FormControl>
  );
};

export default SelectWithSearch;