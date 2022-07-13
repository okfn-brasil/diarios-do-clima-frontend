import { Dispatch, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiltersState, parseFiltersToUrl } from '@app/models/filters.model';
import { parseReports,ReportModel, ReportsModel } from '@app/models/reports.model';
import ReportsService from '@app/services/reports';
import { RootState } from '@app/stores/store';
import Loading from '@app/ui/components/loading/Loading';
import { Grid } from '@mui/material';

import SearchField from './searchField/SearchField';
import SearchFilters from './searchFilters/SearchFilters';
import SearchList from './searchList/SearchList';
import SearchPagination from './searchPagination/SearchPagination';

import './Search.scss';
import ModalsCreateAlert from '@app/ui/components/createAlertModals/ModalsCreateAlert';

let timeout: ReturnType<typeof setTimeout>;
const pageKeys: string[] = ['itemsPerPage', 'order'];

const Search = () => {
  const filters: FiltersState = useSelector((state: RootState) => state.filter);
  const reportsService = new ReportsService();
  const [showFiltersMobile, setFiltersMobileVisibility] : [boolean, Dispatch<boolean>] = useState(false);
  const [listItems, setListItems] : [ReportModel[], Dispatch<ReportModel[]>] = useState([] as ReportModel[]);
  const [currPage, setPage] : [number, Dispatch<number>] = useState(0);
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);
  const [searchTimes, setSearchTimes] : [number, Dispatch<number>] = useState(0);
  const [isOpenCreateAlert, setStateCreateAlert] : [boolean, Dispatch<boolean>] = useState(false);

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

    reportsService.getAllReports(filters, currPage)
      .then((response: ReportsModel) => {
        if(isPagination) {
          window.scrollTo(0,0);
          const newList = [...listItems, ...parseReports(response.results)];
          setListItems(newList);
        } else {
          setPage(0);
          setListItems(parseReports(response.results));
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
    history.replaceState(null, '', `?${searchParams}`);
  };


  return (
    <div>
      <ModalsCreateAlert filters={filters} isOpen={isOpenCreateAlert} onOpen={() => setStateCreateAlert(true)} onClose={() =>setStateCreateAlert(false)}/>
      <Loading isLoading={isLoading}></Loading>
      <div className='search-page'>
        <SearchField openCreateAlert={() => setStateCreateAlert(true)} onClickFilters={onClickFilters}/>
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
                openCreateAlert={() => setStateCreateAlert(true)}
                searchTimes={searchTimes}
                listSize={listItems.length} 
                list={listItems.slice(
                  ((currPage + 1) * filters.itemsPerPage) - filters.itemsPerPage, 
                  filters.itemsPerPage * (currPage + 1))
                }
              />
              <SearchPagination
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
