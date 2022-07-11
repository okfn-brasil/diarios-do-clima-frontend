import { selectIcon } from '@app/ui/utils/forms.utils';
import { h3Style } from '@app/ui/utils/generalStyles';
import CloseIcon from '@mui/icons-material/Close';
import helpIcon from '@app/assets/images/icons/help.svg';
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { blue, gray2, lightGray2 } from '@app/ui/utils/colors';
import DateFilter from './dateFilter/DateFilter';
import { Dates, FiltersStatePayload, SubmitDates } from '@app/models/filters.model';
import './SearchFilters.scss';
import { useDispatch } from 'react-redux';
import { updateFilters } from '@app/stores/filters.store';

interface PropsSearchFilters{
  onClose?: () => void;
  isDesktop: boolean;
}

interface CheckBoxesModel {
  [key: string]: boolean;
}

const themesMock: CheckBoxesModel = {
  'label1': false,
  'label2': false,
  'label3': false,
  'label4': false,
}

const initialFilters: FiltersStatePayload = {
  location: '',
  ente: '',
  themes: themesMock,
  period: 1,
}

const SearchFilters = ({onClose, isDesktop}: PropsSearchFilters) => {
  const dispatch = useDispatch();
  const [filters, setFilters] : [FiltersStatePayload, Dispatch<SetStateAction<FiltersStatePayload>>] = useState(initialFilters);
  const [cleanDate, setCleanDate] : [number, Dispatch<number>] = useState(0);

  const inputChange = (event: SelectChangeEvent<string>) => {
    const {name, value} = event.target;
    setFilters((values: FiltersStatePayload) => ({...values, [name]: value}));
  }

  const checkBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = event.target;
    
    setFilters((values: FiltersStatePayload) => ({...values, themes: {
      ...values.themes,
      [name]: checked
    }}));
  }

  const updateDateFilters = (dateFilters: SubmitDates) => {
    setFilters((values: FiltersStatePayload) => ({...values, period: dateFilters.period as number, dates: dateFilters.dates as Dates}));
  }

  const cleanFilters = () => {
    setFilters(initialFilters);
    setCleanDate(Math.random());
  }

  useEffect(() => {
    dispatch(updateFilters(filters));
  }, [filters])

  return (
    <Grid 
      item 
      className='search-filter' 
      sm={12} 
      style={{
        backgroundColor: 'white', 
        width: isDesktop? '100%' : '100vw', 
        height: '100%',
      }}
    >
      {!isDesktop? 
        <div>
          <Grid container alignItems='center' justifyContent='space-between' sx={{padding: '22px 24px 10px'}}>
            <Grid container alignItems='center' sx={{width: '50%'}}>
              <CloseIcon className='hover-animation' onClick={onClose} />
              <div style={{fontSize: '18px', marginLeft: '20px'}}>Filtros</div>
            </Grid>
            <span onClick={cleanFilters} style={{fontSize: '14px', color: blue, fontWeight: '600'}}>Limpar tudo</span>
          </Grid> 
          <hr style={{borderTop: '0', borderBottom: '1px solid ' + lightGray2}}/>
        </div>
        : <></>
      }
      <div style={{padding: '42px 24px'}}>
        <section style={sectionStyle}>  
          <h3 style={{...h3Style, position: 'relative', margin: '0 0 5px'}}>
            Município
            <span className='hover-animation'>
              <img 
                style={{width: '24px', marginLeft: '6px', top: '2px', position: 'absolute'}} 
                src={helpIcon} 
                alt='icone - ajuda'
              />
            </span>
          </h3>
          <FormControl fullWidth className='form-select'>
            <InputLabel id='location-select'>Selecione um lugar</InputLabel>
            <Select required variant='standard' IconComponent={selectIcon} labelId='location-select' value={filters.location} name='location' onChange={inputChange}>
              <MenuItem value={'Area 1'}>Area 1</MenuItem>
              <MenuItem value={'Area 2'}>Area 2</MenuItem>
              <MenuItem value={'Area 3'}>Area 3</MenuItem>
            </Select>
          </FormControl>
        </section>
        <section style={sectionStyle}>
          <h3 style={h3Style}>Período de tempo</h3>
          <div>
            <DateFilter cleanDate={cleanDate} onSubmit={updateDateFilters} />
          </div>
        </section>

        <section style={sectionStyle}>
          <h3 style={{...h3Style, margin: '24px 0 8px'}}>Tema</h3>
          <p style={{margin: '0 0 12px'}}>Aqui uma descrição breve do que são e de como funcionam os temas</p>
          <div>
            <FormGroup>
              {Object.keys(filters.themes).map((key: string) => {
                return (<FormControlLabel 
                  key={key} 
                  control={<Checkbox checked={filters.themes[key]} name={key} onChange={checkBoxChange} />} 
                  label={key} 
                />)}
              )}
            </FormGroup>
          </div>
        </section>

        <section style={{paddingBottom: '50px'}}>
          <h3 style={{...h3Style, position: 'relative', margin: '22px 0 5px'}}>Entes do governo</h3>
          <FormControl fullWidth className='form-select'>
            <InputLabel id='ente-select'>Selecione um ente</InputLabel>
            <Select required variant='standard' IconComponent={selectIcon} labelId='ente-select' value={filters.ente} name='ente' onChange={inputChange}>
              <MenuItem value={'ente 1'}>ente 1</MenuItem>
              <MenuItem value={'ente 2'}>ente 2</MenuItem>
              <MenuItem value={'ente 3'}>ente 3</MenuItem>
            </Select>
          </FormControl>
        </section>
      </div>
    </Grid>
  );
}

export default SearchFilters;

const sectionStyle: React.CSSProperties = {
  borderBottom: '1px solid ' + gray2,
  paddingBottom: '26px',
}
