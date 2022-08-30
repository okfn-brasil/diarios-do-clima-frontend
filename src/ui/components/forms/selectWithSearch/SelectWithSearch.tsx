import selectArrow from '@app/assets/images/icons/arrow-down.svg';
import { FormControl, Input, InputLabel, SelectChangeEvent } from '@mui/material';
import { ChangeEvent, Dispatch, KeyboardEventHandler, SetStateAction, useEffect, useState } from 'react';
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
  onChange: (e: SelectChangeEvent<string>) => void;
  options: Option[];
  label?: string;
  classes?: string;
}

const SelectIcon = () => {
  return (
    <img style={{width: '16px'}} src={selectArrow} />
  );
};

const SelectWithSearch = ({value, label, classes, onChange, name, options, placeholder}: PropsSelect) => {
  const [inputValue, setInputValue]: [string, Dispatch<SetStateAction<string>>] = useState('' as string);
  const [showMenu, setShowMenu]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [selectedOption, setSelectedOption]: [Option, Dispatch<SetStateAction<Option>>] = useState(
    options.find(option => option.value === value) as Option || { label: '', value: '' }
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue as string);
    if (inputValue.length >= 3) {
      setShowMenu(true);
    }
    
    onChange({target: {name: name, value: ''}} as SelectChangeEvent);
  }

  const onClickOption = (option: Option) => {
    setInputValue('');
    setSelectedOption(option);
    setShowMenu(false);
    onChange({target: {name: name, value: option.value}} as SelectChangeEvent);
  }

  const onBlur = () => {
    setTimeout(() => {
      setShowMenu(false);
    }, 100);
  }

  const onClick = () => {
    if (inputValue.length >= 3) {
      setShowMenu(true);
    }
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.code === 'Backspace' && selectedOption.value) {
      setInputValue('');
    }

    setSelectedOption({ label: '', value: '' } as Option);
  }

  return (
    <FormControl onKeyUp={onKeyUp} fullWidth className={`form-select select-with-search ${classes}`}>
      {label ? <InputLabel id={`${name}-select`}>{label}</InputLabel> : <></>}
      <SelectIcon />
      <Input
        placeholder={placeholder}
        onClick={onClick}
        onBlur={onBlur}
        autoComplete="off"
        value={inputValue || selectedOption.label as string}
        name={name} 
        onChange={onChangeInput} 
      />
      {showMenu ? 
        <div className='select-menu'>
          {options.filter(option => inputValue.length >=3 && option.label.toLowerCase().includes(inputValue.toLowerCase()))
            .map(option => <div key={option.value} onClick={() => onClickOption(option)} className='option'>{option.label}</div>)}
        </div>
        : <></>
      }
    </FormControl>
  );
};

export default SelectWithSearch;