
import { blue, red } from '@app/ui/utils/colors';
import { Grid, TextField} from '@mui/material';
import { DatePicker, LocalizationProvider, PickersLocaleText } from '@mui/x-date-pickers';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { datePickerTranslation } from '@app/ui/utils/datepicker.utils';
import { ptBR } from 'date-fns/locale';
import { Dates, SubmitDates } from '@app/models/filters.model';
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
  const [tab, setTab] : [number, Dispatch<number>] = useState(0);
  const [invalidDate, setInvalidDate] : [boolean, Dispatch<boolean>] = useState(false);
  const [currPeriod, setPeriod] : [number, Dispatch<number>] = useState(1);
  const [dates, setDates]: [Dates, Dispatch<SetStateAction<Dates>>] = useState(initialDates);

  const submit = () => {
    onSubmit({ period: currPeriod, dates });
  }

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
   }, [invalidDate ,dates, currPeriod])

  useEffect(() => {
    setDates(initialDates);
    setPeriod(1);
    onSubmit({period: null, dates: null});
  }, [cleanDate])

  const dateChange = (value: Date, name: string) => {
    setInvalidDate(false);
    setDates((values: Dates) => ({...values, [name]: value}));
    if(value) {
      if(!checkDateValidity(value)) {
        setInvalidDate(true);
      }
    }
  }

  const checkDateValidity = (value: Date) => {
    return !(value.toString() === 'Invalid Date' 
      || value.getFullYear() < 1500 
      || value.getFullYear() > new Date().getFullYear());
  }

  const changeTab = (tab: number) => {
    setTab(tab);
    setPeriod(1);
    setDates(initialDates);
  }

  const changePeriod = (period: number) => {
    setPeriod(period);
  }

  return (
    <Grid>
      <Grid container>
        <div onClick={() => {changeTab(0)}} className='hover-animation' style={tab ? tabStyle : currTabStyle}>Recentes</div>
        <div  onClick={() => {changeTab(1)}} className='hover-animation' style={{...!tab ? tabStyle : currTabStyle, marginLeft: '16px'}}>Intervalo de tempo</div>
      </Grid>

      {!tab ?
       <Grid container style={{margin: '20px 0 11px'}}>
        {periods.map(period =>{
          return (<div 
            className='hover-animation' 
            key={period}
            onClick={() => {changePeriod(period)}}
            style={{...currPeriod === period ? periodBoxSelectedStyle : periodBoxStyle}}
          >
            {period < 4 ? `${period}m` : 'Tudo'}
          </div>)
        })}
       </Grid> : <></>
      }

      {tab ?
        <div style={{position: 'relative'}}>
          <Grid container style={{marginTop: '20px'}} justifyContent='space-between' className='date-pickers'>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR} localeText={datePickerTranslation as Partial<PickersLocaleText<unknown>>}>
              <DatePicker
                label="De"
                disableFuture={true}
                value={dates.start}
                onChange={(value) => {dateChange(value as Date, 'start')}}
                renderInput={(params) => <TextField autoComplete='off' {...params} inputProps={{...params.inputProps, placeholder: "dd/mm/aaaa"}} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR} localeText={datePickerTranslation as Partial<PickersLocaleText<unknown>>}>
              <DatePicker
                label="Até"
                disableFuture={true}
                value={dates.end}
                onChange={(value) => {dateChange(value as Date, 'end')}}
                renderInput={(params) => <TextField autoComplete='off' {...params} inputProps={{...params.inputProps, placeholder: "dd/mm/aaaa"}} />}
              />
            </LocalizationProvider>
          </Grid>
          {
            invalidDate ? <div style={{color: red, fontSize: '14px', bottom: '-22px', position: 'absolute'}}>Datas inválidas.</div> : <></>
          }
          
       </div>: <></>
      }
    </Grid>
  );
}

export default DateFilter;

const tabStyle: React.CSSProperties = {
  fontSize: '18px',
  lineHeight: '22px',
  paddingBottom: '10px',
  borderBottom: '5px solid white',
  transition: '0.4s',
}

const currTabStyle: React.CSSProperties = {
  ...tabStyle,
  borderBottom: '5px solid ' + blue,
}

const periodBoxStyle: React.CSSProperties = {
  border: '1px solid black',
  padding: '12px 14px',
  marginRight: '8px',
  transition: '0.4s',
}

const periodBoxSelectedStyle: React.CSSProperties = {
  ...periodBoxStyle,
  backgroundColor: 'black',
  color: 'white',
}