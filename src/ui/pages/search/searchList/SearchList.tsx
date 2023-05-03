import { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import emptyListImage from '@app/assets/images/empty.png';
import bellIcon from '@app/assets/images/icons/black-bell.svg';
import EmptySearch from '@app/assets/images/icons/empty-search.svg';
import { FiltersState, OrderFilter, parseUrlToFilters } from '@app/models/filters.model';
import { GazetteModel } from '@app/models/gazettes.model';
import { updateFilters } from '@app/stores/filters.store';
import { RootState } from '@app/stores/store';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import SelectInput from '@app/ui/components/forms/select/Select';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { Grid, SelectChangeEvent } from '@mui/material';

import SearchItem from './searchItem/SearchItem';

import './SearchList.scss';

interface PropsSearchList {
  list?: GazetteModel[];
  listSize?: number;
  searchTimes: number;
  isLoading: boolean;
  openCreateAlert: () => void;
}

const SearchList = ({list, listSize, searchTimes, isLoading, openCreateAlert}: PropsSearchList) => {
  const filters: FiltersState = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  const [order, setOrder] : [string, Dispatch<string>] = useState(filters.order as string);

  useEffect(() => {
    if (window.location.search) {
      const urlFilters = parseUrlToFilters();
      setOrder(urlFilters.order as string);
    }
  }, []);

  const updateOrder = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setOrder(value);
    dispatch(updateFilters({order: value}));
  };

  return (
    <Grid container justifyContent='center' className='container search-list'>
      <Grid item sm={10}>
        {listSize ? 
          <div>
            <h3 className='h3-class title'>{listSize} {TEXTS.searchPage.list.results} {listSize >= 10000 ? TEXTS.searchPage.list.maxResults : ''}</h3>
          </div>
          : <></>
        }
        { listSize ? 
          <div >
            <Grid item container sm={12} justifyContent='space-between'>
              <span className='hover-animation only-desktop'>
                <ButtonOutlined onClick={openCreateAlert} classes='create-alert-button'>
                  <Grid container justifyContent='space-between'>
                    <img src={bellIcon} alt='criar alerta'/>
                    <div className='alert-button'>{TEXTS.searchPage.list.createAlert}</div>
                  </Grid>
                </ButtonOutlined>
              </span>
              <SelectInput
                label={TEXTS.searchPage.list.orderSelect}
                classes='half-width'
                options={[
                  {value: OrderFilter.relevance, label: 'Mais relevante'}
                  ,{value: OrderFilter.descending_date, label: 'Mais recente'}
                  , {value: OrderFilter.ascending_date, label: 'Mais antigo'}]} 
                value={order || OrderFilter.relevance} 
                name='order'
                onChange={updateOrder}
              />
            </Grid>
          </div>
          : <></>
        }
        {
          !listSize && (searchTimes <= 1 || isLoading)  ? 
            <Grid container justifyContent='center' className='container empty-list'>
              <div>
                <div className='image-area' >
                  <img src={EmptySearch} alt='logo - sem resultados na lista'/>
                </div>
                <div className='text-area'>
                  <h3 className='h3-class'>{TEXTS.searchPage.list.initialText}</h3>
                </div>
              </div>
            </Grid>
            : <></>
        }

        {
          (!listSize && searchTimes > 1 && !isLoading) || (listSize && !list?.length && !isLoading) ? 
            <Grid container justifyContent='center' className='container empty-list'>
              <div>
                <div className='text-area'>
                  <img src={emptyListImage} className='empty-list-image' alt='busca vazia'/>
                  <h3 className='h3-class'>{TEXTS.searchPage.list.emptyResult}</h3>
                </div>
              </div>
            </Grid>
            : <></>
        }
        <div>
          {list?.map((item: GazetteModel, index) => <SearchItem key={index.toString()} data={item}/>)}
        </div>
        
      </Grid>
    </Grid>
  );
};

export default SearchList;
