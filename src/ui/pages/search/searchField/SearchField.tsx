import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import bellIcon from '@app/assets/images/icons/bell.svg';
import filterIcon from '@app/assets/images/icons/filter.svg';
import searchIcon from '@app/assets/images/icons/search.svg';
import { parseUrlToFilters } from '@app/models/filters.model';
import { updateFilters } from '@app/stores/filters.store';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import { Grid } from '@mui/material';

import './SearchField.scss';

interface PropsSearchField {
  onClickFilters: () => void;
  openCreateAlert: () => void;
  onClickAdvenced: () => void;
}

const SearchField = ({onClickFilters, openCreateAlert, onClickAdvenced}: PropsSearchField) => {
  const dispatch = useDispatch();
  const [query, setQuery] : [string, Dispatch<string>] = useState('');

  const updateQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateFilters({query: query}));
  };

  useEffect(() => {
    if (window.location.search) {
      const urlFilters = parseUrlToFilters();
      setQuery(urlFilters.query as string || '');
    }
  }, []);

  return (
    <Grid container item className='container search-field top-space' sm={12} justifyContent='center'>
      <Grid container item sm={6} xs={12} className='search-field-container' justifyContent='center'>
        <div className='field-area'>
          <Grid container justifyContent='space-between'>
            <div className='key-words'>Palavras-chave</div>
            <div onClick={onClickAdvenced} className='hover-animation advanced-search'>
              Busca avançada
            </div>
          </Grid>
          <form onSubmit={onSubmit}>
            <img src={searchIcon} className='search-img' alt='icone de lupa'/>
            <input
              value={query}
              onChange={updateQuery}
              className='search-input'
              type='text'
              placeholder='Encontre um ato ambiental' 
            />
          </form>
          <div className='only-mobile'>
            <Grid container justifyContent='space-between' className='buttons'>
              <ButtonGreen onClick={onClickFilters} classess='mobile-button-class'>
                <Grid container  justifyContent='space-between'>
                  <img src={filterIcon} className='button-icon'/>
                  <div className='filter-button'>Filtrar</div>
                </Grid>
              </ButtonGreen>
              <ButtonOutlined onClick={openCreateAlert} classess='mobile-button-class'>
                <Grid container justifyContent='space-between'>
                  <img src={bellIcon} className='button-icon'/>
                  <div className='alert-button'>Criar alerta</div>
                </Grid>
              </ButtonOutlined>
            </Grid>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default SearchField;

