import { Dispatch, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiltersState, parseFiltersToUrl } from '@app/models/filters.model';
import { GazetteModel, GazetteResponse, parseGazettes } from '@app/models/gazettes.model';
import { } from '@app/models/reports.model';
import GazettesService from '@app/services/gazettes';
import { RootState } from '@app/stores/store';
import ModalsCreateAlert from '@app/ui/components/createAlertModals/ModalsCreateAlert';
import Loading from '@app/ui/components/loading/Loading';
import Pagination from '@app/ui/components/pagination/Pagination';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import AdvancedSearchModal from './advancedSearchModal/AdvancedSearchModal';
import SearchField from './searchField/SearchField';
import SearchFilters from './searchFilters/SearchFilters';
import SearchList from './searchList/SearchList';

import './Search.scss';

let timeout: ReturnType<typeof setTimeout>;
const pageKeys: string[] = ['itemsPerPage', 'order'];

interface List {
  [key: number]: GazetteModel[];
}

const Search = () => {
  const filters: FiltersState = useSelector((state: RootState) => state.filter);
  const gazettesService = new GazettesService();
  const [showFiltersMobile, setFiltersMobileVisibility] : [boolean, Dispatch<boolean>] = useState(false);
  const [listItems, setListItems] : [List, Dispatch<List>] = useState({} as List);
  const [listSize, setListSize] : [number, Dispatch<number>] = useState(0);
  const [currPage, setPage] : [number, Dispatch<number>] = useState(0);
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);
  const [searchTimes, setSearchTimes] : [number, Dispatch<number>] = useState(0);
  const [isOpenCreateAlert, setStateCreateAlert] : [boolean, Dispatch<boolean>] = useState(false);
  const [isOpenAdvancedSearch, setStateAdvancedSearch] : [boolean, Dispatch<boolean>] = useState(false);

  useEffect(() => {
    if  (Object.keys(filters).filter(item => !pageKeys.includes(item)).length) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setUrlParams(filters);
        if (getIfCanSearch())  {
          setSearchTimes(searchTimes + 1);
          getItemsList(null);
        }
      }, 400);
    }
  }, [filters]);

  const getIfCanSearch = () => {
    const hasThemes = filters.themes ? 
      Object.keys(filters.themes).filter(key => !!(filters.themes && !!filters.themes[key])).length 
      : null;
    if (filters.ente !== '0' || !!filters.query || !!hasThemes) {
      return true;
    } else {
      emptyList();
      return false;
    }
  };

  const emptyList = (isError = false) => {
    setListSize(0);
    setPage(0);
    setListItems({});
    setSearchTimes(isError ? 2 : 0);
  };

  const getItemsList = (page: number | null) => {
    if((page === null) || (!listItems[page] || !listItems[page].length)){
      setLoading(true);
      gazettesService.getAllGazettes(filters, page || 0)
        .then((response: GazetteResponse) => {
          setListSize(response.total_excerpts);
          if(!response.total_excerpts) {
            emptyList(true);
          } else {
            if(page !== null) {
              window.scrollTo(0,0);
              setPage(page);
              const newList = {...listItems, [page] :parseGazettes(response.excerpts, filters.query as string)};
              setListItems(newList);
            } else {
              setPage(0);
              setListItems({[0] : parseGazettes(response.excerpts, filters.query as string)});
            }
          }
          setLoading(false);
        }).catch(() => {
          setLoading(false);
          if(page !== null) {
            const newList = {...listItems, [page]: []};
            setListItems(newList);
            setPage(page);
          } else {
            emptyList(true);
          }
        });
    } else {
      window.scrollTo(0,0);
      setPage(page);
    }
  };

  const onClickFilters = () => {
    setFiltersMobileVisibility(true);
  };

  const onCloseFilters = () => {
    setFiltersMobileVisibility(false);
  };

  const onChangePage = (page: number) => {
    getItemsList(page);
  };

  const setUrlParams = (currFilters: FiltersState) => {
    const searchParams = new URLSearchParams();
    const params = parseFiltersToUrl(currFilters);
    Object.keys(params).forEach(key => searchParams.append(key, params[key] as string));
    history.replaceState(null, '', `${urls.search.url}?${searchParams}`);
  };


  return (
    <div>
      <AdvancedSearchModal isOpen={isOpenAdvancedSearch} onClose={() => setStateAdvancedSearch(false)}/>
      <ModalsCreateAlert filters={filters} isOpen={isOpenCreateAlert} onOpen={() => setStateCreateAlert(true)} onClose={() =>setStateCreateAlert(false)}/>
      <Loading isLoading={isLoading}></Loading>
      <div className='search-page'>
        <SearchField filters={filters} onClickAdvenced={() => setStateAdvancedSearch(true)} openCreateAlert={() => setStateCreateAlert(true)} onClickFilters={onClickFilters}/>
        {
          showFiltersMobile ? 
            <div className='only-mobile mobile-filters'>
              <SearchFilters onClose={onCloseFilters}/>
            </div>
            : <></>
        }
        <Grid container>
          <Grid item sm={3} className='only-desktop'>
            <SearchFilters/>
          </Grid> 
          <Grid item sm={9} className='gray-area list-area'>
            <div className='search-area'>
              <SearchList
                isLoading={isLoading}
                openCreateAlert={() => setStateCreateAlert(true)}
                searchTimes={searchTimes}
                listSize={listSize} 
                list={listItems[currPage]}
              />
              <Pagination
                currentPage={currPage}
                onChangePage={onChangePage} 
                listSize={listSize} 
                itemsPerPage={filters.itemsPerPage}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Search;
