import { Grid } from '@mui/material';
import { lightGray4 } from '@app/ui/utils/colors';
import SearchField from './searchField/SearchField';
import SearchList from './searchList/SearchList';
import { Dispatch, useEffect, useState } from 'react';
import ReportsService from '@app/services/reports';
import SearchFilters from './searchFilters/SearchFilters';
import { parseReports, ReportModel, ReportsModel } from '@app/models/reports.model';
import SearchPagination from './searchPagination/SearchPagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@app/stores/store';
import Loading from '@app/ui/components/loading/Loading';
import { FiltersState } from '@app/models/filters.model';

interface PropsSearch {
  isDesktop: boolean;
}

let timeout: ReturnType<typeof setTimeout>;
const pageKeys: string[] = ['itemsPerPage', 'order'];

const Search = ({isDesktop}: PropsSearch) => {
  const filters: FiltersState = useSelector((state: RootState) => state.filter);
  const reportsService = new ReportsService();
  const [showFiltersMobile, setFiltersMobileVisibility] : [boolean, Dispatch<boolean>] = useState(true);
  const [listItems, setListItems] : [ReportModel[], Dispatch<ReportModel[]>] = useState([] as ReportModel[]);
  const [currPage, setPage] : [number, Dispatch<number>] = useState(0);
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);

  useEffect(() => {
    if  (Object.keys(filters).filter(item => !pageKeys.includes(item)).length) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log(filters)
        getItemsList();
      }, 400)
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
          <div style={{position: 'fixed', width: '100vw', height: '100vh', top: '0', left: '0', zIndex: 999}}>
            <SearchFilters onClose={onCloseFilters} isDesktop={false}/>
          </div>
          : <></>
        }
        <Grid container>
          {isDesktop ? 
            <Grid item sm={3}>
              <SearchFilters isDesktop={true}/>
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
