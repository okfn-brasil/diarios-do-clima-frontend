import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dates, FiltersStatePayload, parseUrlToFilters,SubmitDates, Theme } from '@app/models/filters.model';
import { UserState } from '@app/models/user.model';
import { updateFilters } from '@app/stores/filters.store';
import { RootState } from '@app/stores/store';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, SelectChangeEvent } from '@mui/material';

import DateFilter from './dateFilter/DateFilter';
import EntityFilter from './entityFilter/EntityFilter';
import LocationFilter from './locationFilter/LocationFilter';
import ThemeFilter from './themeFilter/ThemeFilter';

import './SearchFilters.scss';
import { themesMock } from '@app/ui/utils/mocks';

interface PropsSearchFilters{
  onClose?: () => void;
}

const initialFilters: FiltersStatePayload = {
  location: '0',
  ente: '0',
  themes: themesMock,
  period: 0,
};

const SearchFilters = ({onClose}: PropsSearchFilters) => {
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);
  const dispatch = useDispatch();
  const [filters, setFilters] : [FiltersStatePayload, Dispatch<SetStateAction<FiltersStatePayload>>] = useState(initialFilters);
  const [cleanDate, setCleanDate] : [number, Dispatch<number>] = useState(0);

  const inputChange = (event: SelectChangeEvent<string>) => {
    const {name, value} = event.target;
    setFilters((values: FiltersStatePayload) => ({...values, [name]: value}));
  };

  const checkBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = event.target;
    
    setFilters((values: FiltersStatePayload) => ({...values, themes: {
      ...values.themes,
      [name]: checked
    }}));
  };

  const updateDateFilters = (dateFilters: SubmitDates) => {
    setFilters((values: FiltersStatePayload) => ({...values, period: dateFilters.period as number, dates: dateFilters.dates as Dates}));
  };

  const cleanFilters = () => {
    setFilters(initialFilters);
    setCleanDate(Math.random());
  };

  useEffect(() => {
    dispatch(updateFilters(filters));
  }, [filters]);

  useEffect(() => {
    if (window.location.search) {
      const urlFilters = parseUrlToFilters();
      setFilters((values: FiltersStatePayload) => ({...urlFilters, themes: {
        ...values.themes,
        ...urlFilters.themes
      }}));
      dispatch(updateFilters(urlFilters));
    }
  }, []);

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
      <div className='filters'>
        <LocationFilter onChange={inputChange} value={filters.location as string}/>
        <section className='section-filter-class'>
          <h3 className='h3-class'>Período de tempo</h3>
          <div>
            <DateFilter cleanDate={cleanDate} onSubmit={updateDateFilters} />
          </div>
        </section>
        <ThemeFilter onChange={checkBoxChange} options={filters.themes as Theme} hasProPlan={!!userData.plan_pro} />
        
        <EntityFilter onChange={inputChange} value={filters.ente as string}/>
        
      </div>
    </Grid>
  );
};

export default SearchFilters;

