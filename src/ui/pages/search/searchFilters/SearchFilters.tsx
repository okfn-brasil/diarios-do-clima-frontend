import CloseIcon from '@mui/icons-material/Close';
import helpIcon from '@app/assets/images/icons/help.svg';
import { Checkbox, FormControlLabel, FormGroup, Grid, SelectChangeEvent } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import DateFilter from './dateFilter/DateFilter';
import { Dates, FiltersStatePayload, parseUrlToFilters, SubmitDates, Theme } from '@app/models/filters.model';
import { useDispatch } from 'react-redux';
import { updateFilters } from '@app/stores/filters.store';
import SelectInput from '@app/ui/components/forms/select/Select';
import './SearchFilters.scss';

interface PropsSearchFilters{
  onClose?: () => void;
}

interface CheckBoxesModel {
  [key: string]: boolean | null;
}

const themesMock: CheckBoxesModel = {
  'label1': null,
  'label2': null,
  'label3': null,
  'label4': null,
}

const initialFilters: FiltersStatePayload = {
  location: '0',
  ente: '0',
  themes: themesMock,
  period: 0,
}

const SearchFilters = ({onClose}: PropsSearchFilters) => {
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

  useEffect(() => {
    if (window.location.search) {
      const urlFilters = parseUrlToFilters();
      setFilters((values: FiltersStatePayload) => ({...urlFilters, themes: {
        ...values.themes,
        ...urlFilters.themes
      }}));
      dispatch(updateFilters(urlFilters));
    }
  }, [])

  return (
    <Grid 
      item 
      className='search-filter' 
      sm={12} 
    >
      <div className='only-mobile'>
        <Grid className='mobile-header' container alignItems='center' justifyContent='space-between'>
          <Grid container alignItems='center' className='close-icon-area'>
            <CloseIcon className='hover-animation' onClick={onClose} />
            <div className='mobile-title'>Filtros</div>
          </Grid>
          <span onClick={cleanFilters} className='blue-link'>Limpar tudo</span>
        </Grid> 
        <hr className='thin-line'/>
      </div>
      <div className='location-filter'>
        <section className='section-class'>  
          <h3 className='h3-class'>
            Município
            <span className='hover-animation'>
              <img 
                className='help-icon'
                src={helpIcon} 
                alt='icone - ajuda'
              />
            </span>
          </h3>
          <SelectInput
            options={[{value: 'x', label: 'x'},{value: 'y', label: 'y'}]} 
            placeholder='Selecione um munícipio' 
            value={filters.location as string} 
            name='location'
            onChange={inputChange}
          />
        </section>
        <section className='section-class'>
          <h3 className='h3-class'>Período de tempo</h3>
          <div>
            <DateFilter cleanDate={cleanDate} onSubmit={updateDateFilters} />
          </div>
        </section>

        <section className='section-class theme-filter'>
          <h3 className='h3-class'>Tema</h3>
          <p>Aqui uma descrição breve do que são e de como funcionam os temas</p>
          <div>
            <FormGroup>
              {Object.keys(filters.themes as Theme).map((key: string) => {
                return (<FormControlLabel 
                  key={key} 
                  control={<Checkbox checked={!!(filters.themes as Theme)[key]} name={key} onChange={checkBoxChange} />} 
                  label={key} 
                />)}
              )}
            </FormGroup>
          </div>
        </section>

        <section className='entity-filter'>
          <h3 className='h3-class'>Entes do governo</h3>
          <SelectInput
            options={[{value: 'x', label: 'x'},{value: 'y', label: 'y'}]} 
            placeholder='Selecione um ente' 
            value={filters.ente as string} 
            name='ente'
            onChange={inputChange}
          />
        </section>
      </div>
    </Grid>
  );
}

export default SearchFilters;

