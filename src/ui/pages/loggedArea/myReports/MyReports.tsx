import { Dispatch, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import emptyListImage from '@app/assets/images/empty-list.svg';
import { ReportsListModel } from '@app/models/reports.model';
import ReportsService from '@app/services/reports';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import Loading from '@app/ui/components/loading/Loading';
import Pagination from '@app/ui/components/pagination/Pagination';
import ReportItem from '@app/ui/components/reportItem/ReportItem';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import './MyReports.scss';

const MyReports = () => {
  const [reports, setReports] : [ReportsListModel, Dispatch<ReportsListModel>] = useState({} as ReportsListModel);
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(true);
  const [listSize, setListSize] : [number, Dispatch<number>] = useState(0);
  const [page, setPage] : [number, Dispatch<number>] = useState(0);
  const [loadedPages, setLoadedPages] : [number[], Dispatch<number[]>] = useState([] as number[]);
  const reportsService = new ReportsService();

  useEffect(() => {
    getList(page);
  }, []);

  const onChangePage = (page: number) => {
    getList(page);
  };

  const getList = (page: number) => {
    if(!loadedPages.includes(page)) {
      setLoading(true);
      reportsService.getReports(page).then(response => {
        setReports({...reports, [page] : response.results});
        setLoadedPages([...loadedPages, page]);
        setListSize(response.count);
        changePage(page);
        setLoading(false);
      }).catch(() => {
        setListSize(0);
        setReports({});
        setLoading(false);
      });
    } else {
      changePage(page);
    }
  };

  const changePage = (page: number) => {
    window.scrollTo(0,0);
    setPage(page);
  };

  return (
    <Grid className='my-reports-page' item container sm={12} justifyContent='center'>
      <Loading isLoading={isLoading}></Loading>
      {reports && Object.keys(reports).filter(index => !!reports[parseInt(index)].length).length ?
        <Grid lg={4} sm={8} xs={12} item className='container'>
          <h2 className='h2-class font-sora'>{TEXTS.myReports.title}</h2>
          <div>
            {reports[page].map(report => <ReportItem key={report.id} report={report}></ReportItem>)}
          </div>
          <Pagination currentPage={page} itemsPerPage={reportsService.itemsPerPage} listSize={listSize} onChangePage={onChangePage}/>
        </Grid>
        :
        <Grid className='empty-list container' item sm={4} xs={10}>
          <h2 className='h2-class font-sora'>{TEXTS.myReports.title}</h2>
          <img src={emptyListImage} alt='Lista vazia' />
          { !isLoading ? <div className='paragraph-class'>{TEXTS.myReports.emptyList}</div> : <></> }
          <Link to={urls.reports.url}><div className='blue-link hover-animation'>{TEXTS.myReports.knowMore}</div></Link>
          <Link to={urls.reports.url}><ButtonGreen fullWidth>{TEXTS.myReports.simulate}</ButtonGreen></Link>
        </Grid>
      }
    </Grid>
  );
};

export default MyReports;