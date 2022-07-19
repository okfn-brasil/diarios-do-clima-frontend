
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Dates, parseUrlToFilters,SubmitDates } from '@app/models/filters.model';
import { UserState } from '@app/models/user.model';
import { RootState } from '@app/stores/store';
import ProFlag from '@app/ui/components/proFlag/ProFlag';
import { datePickerTranslation } from '@app/ui/utils/datepicker.utils';
import { urls } from '@app/ui/utils/urls';
import { Grid, TextField} from '@mui/material';
import { DatePicker, LocalizationProvider, PickersLocaleText } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

import './DateFilter.scss';

interface PropsDateFilter {
  onSubmit: (e: SubmitDates) => void;
  cleanDate: number;
}

const periods = [1, 2, 3, 4];
const initialDates: Dates = {
  start: '',
  end: '',
};

const DateFilter = ({onSubmit, cleanDate}: PropsDateFilter) => {
  const navigate: NavigateFunction = useNavigate();
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);
  const [tab, setTab] : [number, Dispatch<number>] = useState(0);
  const [invalidDate, setInvalidDate] : [boolean, Dispatch<boolean>] = useState(false);
  const [currPeriod, setPeriod] : [number, Dispatch<number>] = useState(0);
  const [dates, setDates]: [Dates, Dispatch<SetStateAction<Dates>>] = useState(initialDates);

  const submit = () => {
    onSubmit({ period: currPeriod, dates });
  };

  useEffect(() => { 
    if(dates.end || !!dates.start) {
      const validityEnd = !!(!dates.end || checkDateValidity(dates.end as Date));
      const validityStart = !!(!dates.start || checkDateValidity(dates.start as Date));
      if(validityEnd && validityStart){
        submit();
      }
    } else {
      submit();
    }
  }, [invalidDate ,dates, currPeriod]);

  useEffect(() => {
    setDates(initialDates);
    setPeriod(1);
    onSubmit({period: null, dates: null});
  }, [cleanDate]);

  const dateChange = (value: Date, name: string) => {
    setInvalidDate(false);
    setDates((values: Dates) => ({...values, [name]: value}));
    if(value) {
      if(!checkDateValidity(value)) {
        setInvalidDate(true);
      }
    }
  };

  const checkDateValidity = (value: Date) => {
    return !(value.toString() === 'Invalid Date' 
      || value.getFullYear() < 1500 
      || value.getFullYear() > new Date().getFullYear());
  };

  const changeTab = (tab: number) => {
    setTab(tab);
    setPeriod(1);
    setDates(initialDates);
  };

  const changePeriod = (period: number) => {
    setPeriod(period);
  };

  useEffect(() => {
    if (window.location.search) {
      const urlFilters = parseUrlToFilters();
      setPeriod(urlFilters.period as number);
      const dates = urlFilters.dates;
      if(dates?.end || dates?.start) {
        setDates(urlFilters.dates as Dates);
        setTab(1);
      }
    }
  }, []);

  const getIfAllowsProFilter = (period: number) => {
    return !!(period === 4 && !userData.plan_pro);
  };

  return (
    <Grid>
      <Grid container>
        <div onClick={() => {changeTab(0);}} className={`hover-animation ${tab ? 'tab-class' : 'curr-tab-class'}`}>Recentes</div>
        <div  onClick={() => {changeTab(1);}} className={`hover-animation second-tab ${!tab ? 'tab-class' : 'curr-tab-class'}`}>
          Intervalo de tempo <ProFlag spaceBottom={2} show={!!(!userData.plan_pro && tab)}/>
        </div>
      </Grid>

      {!tab ?
        <Grid container className='periods'>
          {periods.map(period =>{
            return (<div 
              className={`hover-animation ${getIfAllowsProFilter(period) ? 'disabled-box' : ''} ${currPeriod === period ? 'period-box-selected-class' : 'period-box-class'}`}
              key={period}
              onClick={() => {getIfAllowsProFilter(period) ? navigate(urls.becomePro.url) : changePeriod(period);}}
            >
              {period < 4 ? `${period}m` : 'Tudo'} 
              <ProFlag show={getIfAllowsProFilter(period)}/>
            </div>);
          })}
        </Grid> : <></>
      }

      {tab ?
        <div className='date-pickers-container' onClick={() => !userData.plan_pro ? navigate(urls.becomePro.url) : null}>
          <Grid container justifyContent='space-between' className='date-pickers'>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR} localeText={datePickerTranslation as Partial<PickersLocaleText<unknown>>}>
              <DatePicker
                label='De'
                disabled={!userData.plan_pro}
                disableFuture={true}
                value={dates.start}
                onChange={(value) => {userData.plan_pro ? dateChange(value as Date, 'start') : {};}}
                renderInput={(params) => <TextField autoComplete='off' {...params} inputProps={{...params.inputProps, placeholder: 'dd/mm/aaaa'}} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR} localeText={datePickerTranslation as Partial<PickersLocaleText<unknown>>}>
              <DatePicker
                label='Até'
                disabled={!userData.plan_pro}
                disableFuture={true}
                value={dates.end}
                onChange={(value) => {userData.plan_pro ? dateChange(value as Date, 'end') : {};}}
                renderInput={(params) => <TextField autoComplete='off' {...params} inputProps={{...params.inputProps, placeholder: 'dd/mm/aaaa'}} />}
              />
            </LocalizationProvider>
          </Grid>
          {
            invalidDate ? <div className='error'>Datas inválidas.</div> : <></>
          }
          
        </div>: <></>
      }
    </Grid>
  );
};

export default DateFilter;
