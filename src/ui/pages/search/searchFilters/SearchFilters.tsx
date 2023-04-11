import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dates, FiltersStatePayload, parseUrlToFilters, SubmitDates } from '@app/models/filters.model';
import { Option } from '@app/models/forms.model';
import { UserState } from '@app/models/user.model';
import { updateFilters } from '@app/stores/filters.store';
import { RootState } from '@app/stores/store';
import DateFilter from '@app/ui/components/filters/dateFilter/DateFilter';
import EntityFilter from '@app/ui/components/filters/entityFilter/EntityFilter';
import LocationFilter from '@app/ui/components/filters/locationFilter/LocationFilter';
import ThemeFilter from '@app/ui/components/filters/themeFilter/ThemeFilter';
import { TEXTS } from '@app/ui/utils/portal-texts';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';

import './SearchFilters.scss';

interface PropsSearchFilters{
  onClose?: () => void;
}

const initialFilters: FiltersStatePayload = {
  territory_id: '0',
  period: 0,
};

const SearchFilters = ({onClose}: PropsSearchFilters) => {
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);
  const dispatch = useDispatch();
  const [filters, setFilters] : [FiltersStatePayload, Dispatch<SetStateAction<FiltersStatePayload>>] = useState(initialFilters);
  const [cleanDate, setCleanDate] : [number, Dispatch<number>] = useState(0);
  
  useEffect(() => {
    const newFilters = filters;
    delete newFilters.query;
    delete newFilters.order;
    dispatch(updateFilters(newFilters));
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


  const inputLocationChange = (name: string, newValues: Option[]) => {
    setFilters((values: FiltersStatePayload) => ({...values, [name]: newValues.map(item => item.value)}));
  };

  const checkBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = event.target;
    
    setFilters((values: FiltersStatePayload) => ({...values, themes: {
      ...values.themes,
      [name]: checked
    }}));
  };

  const entitiesCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = event.target;
    
    setFilters((values: FiltersStatePayload) => ({...values, ente: {
      ...values.ente,
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
            <div className='mobile-title'>{TEXTS.searchPage.filters.title}</div>
          </Grid>
          <span onClick={cleanFilters} className='blue-link'>{TEXTS.searchPage.filters.clean}</span>
        </Grid> 
        <hr className='thin-line'/>
      </div>
      <div className='filters'>
        <LocationFilter onChange={inputLocationChange} value={filters.territory_id as string}/>
        <section className='section-filter-class'>
          <h3 className='h3-class'>{TEXTS.searchPage.filters.period}</h3>
          <div>
            <DateFilter cleanDate={cleanDate} onSubmit={updateDateFilters} />
          </div>
        </section>
        <ThemeFilter themesFilter={filters.themes} onChange={checkBoxChange} hasProPlan={!!userData.plan_pro} />
        
        <EntityFilter onChange={entitiesCheckBoxChange} entityFilter={filters.ente}/>
        
      </div>
    </Grid>
  );
};

export default SearchFilters;

