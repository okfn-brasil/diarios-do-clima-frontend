import { Grid } from '@mui/material';
import { lightGray4 } from '../../utils/colors';
import SearchField from './searchField/SearchField';
import SearchList from './searchList/SearchList';
import { Dispatch, useEffect, useState } from 'react';
import ReportsService from '/src/services/reports';
import SearchFilters from './searchFilters/SearchFilter';
import { parseReports, ReportModel, ReportsModel } from '/src/models/reports.model';
import SearchPagination from './searchPagination/SearchPagination';
import { FiltersState } from '/src/stores/filters.store';
import { useSelector } from 'react-redux';
import { RootState } from '/src/stores/store';
import Loading from '../../components/loading/Loading';

interface PropsSearch {
  isDesktop: boolean;
}

const pageKeys: string[] = ['itemsPerPage', 'order'];

const Search = ({isDesktop}: PropsSearch) => {
  const filters: FiltersState = useSelector((state: RootState) => state.filter);
  const reportsService = new ReportsService();
  const [showFiltersMobile, setFiltersMobileVisibility] : [boolean, Dispatch<boolean>] = useState(false);
  const [listItems, setListItems] : [ReportModel[], Dispatch<ReportModel[]>] = useState([] as ReportModel[]);
  const [currPage, setPage] : [number, Dispatch<number>] = useState(0);
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);


  useEffect(() => {
    if  (Object.keys(filters).filter(item => !pageKeys.includes(item)).length) {
      getItemsList();
    }
  }, [filters]);

  const getItemsList = (isPagination: boolean = false) => {
    window.scrollTo(0,0);
    setLoading(true);

    reportsService.getAllReports(filters, currPage)
    .then((response: ReportsModel) => {
      if(isPagination) {
        const newList = [...listItems, ...parseReports(response.results)];
        setListItems(newList);
      
      } else {
        setPage(0);
        setListItems(parseReports(response.results));
      }
      setLoading(false);
    }).catch(error => {
      setLoading(false);
      console.log(error)
    })
  }

  const onClickFilters = () => {
    setFiltersMobileVisibility(true);
  }

  const onCloseFilters = () => {
    setFiltersMobileVisibility(false);
  }

  const onChangePage = (page: number) => {
    setPage(page);
    //getItemsList(true);
  }

  return (
    <div>
      <Loading isLoading={isLoading}></Loading>
      <div style={{position: 'relative'}}>
        <SearchField onClickFilters={onClickFilters} isDesktop={isDesktop}/>
        {
          showFiltersMobile && !isDesktop ? 
          <div style={{position: 'fixed', width: '100vw', height: '100vh', top: '0', left: '0', zIndex: 9999}}>
            <SearchFilters onClose={onCloseFilters} />
          </div>
          : <></>
        }
        <Grid container>
          {isDesktop ? 
            <Grid item sm={3}>
              <SearchFilters />
            </Grid> 
            :
            <></>
          }
          <Grid item sm={isDesktop ? 9 : 12} sx={{backgroundColor: lightGray4}}>
            <div style={{padding: '56px 0 65px'}}>
              <SearchList 
                isDesktop={isDesktop}
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
}

export default Search;
