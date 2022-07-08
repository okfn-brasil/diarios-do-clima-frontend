import { Grid } from '@mui/material';
import { darkBlue, green } from '@app/ui/utils/colors';
import searchIcon from '@app/assets/images/icons/search.svg';
import bellIcon from '@app/assets/images/icons/bell.svg';
import filterIcon from '@app/assets/images/icons/filter.svg';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import { ChangeEvent, Dispatch, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFilters } from '@app/stores/filters.store';
import { mobileButtonStyle } from '../search.styles';
import './SearchField.scss';

interface PropsSearchField {
  isDesktop: boolean;
  onClickFilters: () => void;
}

const SearchField = ({isDesktop, onClickFilters}: PropsSearchField) => {
  const dispatch = useDispatch();
  const [query, setQuery] : [string, Dispatch<string>] = useState('');

  const updateQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateFilters({query: query}));
  }

  return (
    <Grid container item className='container search-field' sm={12} justifyContent='center' style={{backgroundColor: darkBlue, marginTop: '-80px'}}>
      <Grid container item sm={6} xs={12} style={{padding: isDesktop ? '56px 0' : '28px 0', marginTop: '80px'}} justifyContent='center'>
        <div style={{width: '100%'}}>
          <Grid container justifyContent='space-between'>
            <div style={{color: '#ACB5BD', fontSize: '14px', lineHeight: '17px'}}>Palavras-chave</div>
            <div 
              className='hover-animation' 
              style={{color: green, fontSize: '14px', lineHeight: '17px', marginBottom: '6px'}}
            >
              Busca avançada
            </div>
          </Grid>
          <form style={{position: 'relative', width: '100%'}} onSubmit={onSubmit}>
            <img src={searchIcon} alt='icone de lupa' style={{position: 'absolute', width: '24px', left: '20px', top: 'calc(50% - 12px)'}}/>
            <input
              value={query}
              onChange={updateQuery}
              className='search-input'
              type='text'
              placeholder='Encontre um ato ambiental'
              style={{
                width: 'calc(100% - 120px)',
                padding: '17px 60px 15px',
                fontSize: isDesktop ? '18px' : '16px',
                lineHeight: '18px',
                backgroundColor: 'rgb(56, 64, 78)',
                border: 'none',
                color: 'white'
              }} 
            />
          </form>
          {isDesktop ? <></> : 
            <Grid container justifyContent='space-between' style={{marginTop: '17px'}}>
              <ButtonGreen onClick={onClickFilters} sx={mobileButtonStyle}>
                <Grid container  justifyContent='space-between'>
                  <img src={filterIcon}  style={{width: '24px'}}/>
                  <div style={{width: 'calc(100% - 24px)', paddingTop: '2px'}}>Filtrar</div>
                </Grid>
              </ButtonGreen>
              <ButtonOutlined sx={{...mobileButtonStyle, fontWeight: '0'}}>
                <Grid container justifyContent='space-between'>
                  <img src={bellIcon} style={{width: '24px'}}/>
                  <div style={{paddingTop: '2px'}}>Criar alerta</div>
                </Grid>
              </ButtonOutlined>
            </Grid>
          }
        </div>
      </Grid>
    </Grid>
  );
}

export default SearchField;

