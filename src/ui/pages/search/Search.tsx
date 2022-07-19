import { Dispatch, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiltersState, parseFiltersToUrl } from '@app/models/filters.model';
import { GazetteModel, GazetteResponse, parseGazettes } from '@app/models/gazettes.model';
import { } from '@app/models/reports.model';
import GazettesService from '@app/services/gazettes';
import { RootState } from '@app/stores/store';
import ModalsCreateAlert from '@app/ui/components/createAlertModals/ModalsCreateAlert';
import Loading from '@app/ui/components/loading/Loading';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import Pagination from '@app/ui/components/pagination/Pagination';

import AdvancedSearchModal from './advancedSearchModal/AdvancedSearchModal';
import SearchField from './searchField/SearchField';
import SearchFilters from './searchFilters/SearchFilters';
import SearchList from './searchList/SearchList';

import './Search.scss';

let timeout: ReturnType<typeof setTimeout>;
const pageKeys: string[] = ['itemsPerPage', 'order'];

const Search = () => {
  const filters: FiltersState = useSelector((state: RootState) => state.filter);
  const gazettesService = new GazettesService();
  const [showFiltersMobile, setFiltersMobileVisibility] : [boolean, Dispatch<boolean>] = useState(false);
  const [listItems, setListItems] : [GazetteModel[], Dispatch<GazetteModel[]>] = useState([] as GazetteModel[]);
  const [currPage, setPage] : [number, Dispatch<number>] = useState(0);
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);
  const [searchTimes, setSearchTimes] : [number, Dispatch<number>] = useState(0);
  const [isOpenCreateAlert, setStateCreateAlert] : [boolean, Dispatch<boolean>] = useState(false);
  const [isOpenAdvancedSearch, setStateAdvancedSearch] : [boolean, Dispatch<boolean>] = useState(false);

  useEffect(() => {
    if  (Object.keys(filters).filter(item => !pageKeys.includes(item)).length) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setSearchTimes(searchTimes + 1);
        if (searchTimes > 0 || window.location.search) {
          getItemsList();
          setUrlParams(filters);
        }
      }, 400);
    }
  }, [filters]);

  const getItemsList = (isPagination = false) => {
    setLoading(true);
    gazettesService.getAllGazettes(filters, currPage)
      .then((response: GazetteResponse) => {
        if(isPagination) {
          window.scrollTo(0,0);
          const newList = [...listItems, ...parseGazettes(response.gazettes)];
          setListItems(newList);
        } else {
          setPage(0);
          setListItems(parseGazettes(response.gazettes));
        }
        setLoading(false);
      }).catch(() => {
        setLoading(false);
        setListItems([]);
      });
  };

  const onClickFilters = () => {
    setFiltersMobileVisibility(true);
  };

  const onCloseFilters = () => {
    setFiltersMobileVisibility(false);
  };

  const onChangePage = (page: number) => {
    setPage(page);
    //getItemsList(true); // TO DO
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
        <SearchField onClickAdvenced={() => setStateAdvancedSearch(true)} openCreateAlert={() => setStateCreateAlert(true)} onClickFilters={onClickFilters}/>
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
                listSize={listItems.length} 
                list={listItems.slice(
                  ((currPage + 1) * filters.itemsPerPage) - filters.itemsPerPage, 
                  filters.itemsPerPage * (currPage + 1))
                }
              />
              <Pagination
                currentPage={currPage}
                onChangePage={onChangePage} 
                listSize={listItems.length} 
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
