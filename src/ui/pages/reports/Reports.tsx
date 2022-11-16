import { Dispatch, useEffect, useState } from 'react';
import badge from '@app/assets/images/icons/badge.svg';
import homeWork from '@app/assets/images/icons/home_work.svg';
import { ReportsListModel} from '@app/models/reports.model';
import ReportsService from '@app/services/reports';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import Loading from '@app/ui/components/loading/Loading';
import Pagination from '@app/ui/components/pagination/Pagination';
import ReportItem from '@app/ui/components/reportItem/ReportItem';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';
import bg from '@app/assets/images/reports_bg.png';

import SimulationForm from './simulation/Simulation';

import './Reports.scss';

const ReportsPage = () => {
  const [reports, setReports] : [ReportsListModel, Dispatch<ReportsListModel>] = useState({} as ReportsListModel);
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(true);
  const [listSize, setListSize] : [number, Dispatch<number>] = useState(0);
  const [page, setPage] : [number, Dispatch<number>] = useState(0);
  const [error, setError] : [string, Dispatch<string>] = useState('');
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
      reportsService.getPublicReports(page).then(response => {
        setReports({...reports, [page] : response.results});
        setLoadedPages([...loadedPages, page]);
        setListSize(response.count);
        changePage(page);
        setLoading(false);
      }).catch(() => {
        setError(TEXTS.reportsPage.error);
        setListSize(0);
        setReports({});
        setLoading(false);
      });
    } else {
      changePage(page);
    }
  };

  const changePage = (page: number) => {
    location.href = urls.reports.url + '#reports-list';
    setPage(page);
  };

  return (
    <div className='reports-page'>
      <Grid container item className='container top-space header-area' style={{backgroundImage: 'url(' + bg + ')'}} sm={12} justifyContent='center'>
        <Grid container item sm={8}>
          <div className='vertical-spacing-container'>
            <div className='h2-class'>
              {TEXTS.reportsPage.title}
            </div>
            <p className='paragraph-class'>
              {TEXTS.reportsPage.subtitle}
            </p>
            <a href={urls.reports.url + '#orcamento-form'}>
              <ButtonGreen >
                {TEXTS.reportsPage.simulateButton}
              </ButtonGreen>
            </a>
          </div>
        </Grid>
      </Grid>
      <Grid container item className='container icons-area' sm={12} justifyContent='center'>
        <Grid container item sm={8} className='vertical-spacing-container' justifyContent='space-between'>
          <div className='icon-wrapper'>
            <div className='icon-class'>
              <img src={badge} alt='icone de crachá'/>
            </div>
            <div className='icon-text'>
              <div className='icon-wrapper-title'>{TEXTS.reportsPage.professionals}</div>
              <div className='icon-wrapper-sub-title'>{TEXTS.reportsPage.professionalsDesc}</div>
            </div>
          </div>
          <div className='icon-wrapper'>
            <div className='icon-class'>
              <img src={homeWork} alt='icone de prédios'/>
            </div>
            <div className='icon-text'>
              <div className='icon-wrapper-title'>{TEXTS.reportsPage.organizations}</div>
              <div className='icon-wrapper-sub-title'>{TEXTS.reportsPage.organizationsDesc}</div>
            </div>
          </div>
        </Grid>
      </Grid>

      { listSize > 0 || error ?
        <Grid container item className='container gray-area' sm={12} justifyContent='center' id='reports-list'>
          <Grid container item sm={8} className='vertical-spacing-container' justifyContent='center'>
            <Loading isLoading={isLoading}></Loading>
            { error ? 
              <div className='reports-error'>{error} 
                <div className='hover-animation' onClick={() => location.reload()}>{TEXTS.reportsPage.reloadPage}</div>
              </div> 
              : <></> 
            }
            { reports && Object.keys(reports).filter(index => !!reports[parseInt(index)].length).length ?
              <>
                <Grid container justifyContent='space-between'>
                  {reports[page].map(report => <ReportItem key={report.id} report={report}></ReportItem>)}
                </Grid>
                
                <Pagination currentPage={page} itemsPerPage={reportsService.itemsPerPagePublic} listSize={listSize} onChangePage={onChangePage}/>
              </>
              : <></>
            }
          </Grid>
        </Grid>
        : <></>
      }

      <Grid container item className='light-blue-area' justifyContent='center' sm={12} id='orcamento-form'>
        <div className='vertical-spacing-container form-container'>
          <SimulationForm />
        </div>
      </Grid>

      <Grid container item className='container doubts' sm={12} justifyContent='center'>
        <Grid item sm={8} className='vertical-spacing-container'>
          <h3 className='h3-class-sx-margin'>{TEXTS.reportsPage.doubts}</h3>
          <p className='paragraph-class'>{TEXTS.reportsPage.knowMore}
            <a href={`mailto:${TEXTS.contactEmail}`}><span className='hover-animation'> {TEXTS.reportsPage.contact} </span></a> 
            {TEXTS.reportsPage.contactDesc}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReportsPage;

