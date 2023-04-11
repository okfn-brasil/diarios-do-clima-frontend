import { Dispatch, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import emptyListImage from '@app/assets/images/empty-list.svg';
import { AlertModel, AlertsList } from '@app/models/alerts.model';
import { City } from '@app/models/cities.model';
import { UserState } from '@app/models/user.model';
import AlertsService from '@app/services/alerts';
import CitiesService from '@app/services/cities';
import { RootState } from '@app/stores/store';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import ModalEmail from '@app/ui/components/createAlertModals/modalEmail/ModalEmail';
import ModalsCreateAlert from '@app/ui/components/createAlertModals/ModalsCreateAlert';
import Loading from '@app/ui/components/loading/Loading';
import Pagination from '@app/ui/components/pagination/Pagination';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { Grid } from '@mui/material';

import AlertItem from './alertItem/AlertItem';
import DeleteAlert from './deleteAlert/DeleteAlert';

import './MyAlerts.scss';

interface AlertsListModel {
  [key: number]: AlertModel[];
}

interface getConfig {
  isCreation?: boolean;
  isDeletion?: boolean;
}

let timeout: ReturnType<typeof setTimeout> ;

const MyAlerts = () => {
  const citiesService = new CitiesService();
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);
  const [alerts, setAlerts] : [AlertsListModel, Dispatch<AlertsListModel>] = useState({} as AlertsListModel);
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(true);
  const [isOpenCreateAlert, setStateCreateAlert] : [boolean, Dispatch<boolean>] = useState(false);
  const [isOpenModalEmail, setModalEmail] : [boolean, Dispatch<boolean>] = useState(false);
  const [deleteAlertIt, setAlertDeleteId] : [string, Dispatch<string>] = useState('');
  const [deleteError, setDeleteError] : [string, Dispatch<string>] = useState('');
  const [listSize, setListSize] : [number, Dispatch<number>] = useState(0);
  const [page, setPage] : [number, Dispatch<number>] = useState(0);
  const [cleanModal, setCleanModal] : [number, Dispatch<number>] = useState(0);
  const [loadedPages, setLoadedPages] : [number[], Dispatch<number[]>] = useState([] as number[]);
  const [citiesList, setCitiesList] : [City[], Dispatch<City[]>] = useState([] as City[]);
  const alertsService = new AlertsService();

  useEffect(() => {
    getList(page);
    citiesService.getAll().then(response => {
      setCitiesList(response.data.cities);
    });
  }, []);

  const onChangePage = (page: number) => {
    getList(page);
  };

  const getList = (page: number) => {
    if(!loadedPages.includes(page) || !alerts[page].length) {
      getAlerts(page);
    } else {
      changePage(page);
    }
  };

  const getAlerts = (page: number, config: getConfig = {}) => {
    setLoading(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      alertsService.getAlerts(page).then(response => {
        setAlerts({...alerts, [page] : response.results});
        setLoadedPages([...loadedPages, page]);
        changePage(page);
        setListSize(response.count);
        onGetAfterDelete(page, response, config.isDeletion);
        onGetAfterCreate(config.isCreation);
        setLoading(false);
      }).catch(() => {
        setListSize(0);
        setAlerts({});
        setLoading(false);
      });
    }, 300);
  };

  const onGetAfterCreate = (isCreation = false) => {
    if(isCreation) {
      setLoadedPages([]);
      setPage(0);
    }
  };

  const onGetAfterDelete = (page: number, response: AlertsList, isDeletion = false) => {
    if(isDeletion) {
      setLoadedPages([page]);
      if(!response.results.length) {
        if(page > 0) {
          getList(page - 1);
        } else {
          setAlerts({});
        }
      }
    }
  };

  const changePage = (page: number) => {
    window.scrollTo(0,0);
    setPage(page);
  };

  const openCreateAlert = () => {
    setStateCreateAlert(true);
  };

  const onDelete = (id: string) => {
    setAlertDeleteId(id);
  };

  const onConfirmDelete = (id: string) => {
    setDeleteError('');
    alertsService.deleteAlert(id).then(() => {
      onCloseModalDelete();
      getAlerts(page, {isDeletion : true});
    }).catch(() => {
      setLoading(false);
      setDeleteError(TEXTS.myAlerts.errorMessage);
    });
  };

  const onCloseModalDelete = () => {
    setDeleteError('');
    setAlertDeleteId('');
    setCleanModal(Math.random());
  };

  const onCreated = () => {
    setCleanModal(Math.random());
    getAlerts(0 , {isCreation : true});
  };

  return (
    <Grid className='my-alerts-page container' item container sm={12} justifyContent='center'>
      <DeleteAlert errorMessage={deleteError} onConfirmDelete={onConfirmDelete} onClose={onCloseModalDelete} isOpen={!!deleteAlertIt} alertId={deleteAlertIt}/>
      <ModalsCreateAlert isAlertsPage clean={cleanModal} isOpen={isOpenCreateAlert} onCreated={onCreated} onOpen={openCreateAlert} onClose={() => setStateCreateAlert(false)}/>
      <ModalEmail isOpen={isOpenModalEmail} alertEmail={userData.alert_email || userData.email as string} userEmail={userData.email as string} onBack={() => setModalEmail(false)} onApply={() => setModalEmail(false)}/>
      <Loading isLoading={isLoading}></Loading>
      {userData.plan_pro && alerts && Object.keys(alerts).filter(index => !!alerts[parseInt(index)].length).length ?
        <Grid sm={10} xs={12} item container className='alerts-list' justifyContent='center'>
          <Grid item lg={8} sm={12} className='alerts-header'>
            <h3 className='h3-class'>{TEXTS.myAlerts.title}</h3>
            <p className='paragraph-class'>{TEXTS.myAlerts.text1A} <b>{TEXTS.myAlerts.text1B}a</b>.</p>
            <p className='paragraph-class'>{TEXTS.myAlerts.text2A} <b>{TEXTS.myAlerts.text2B}</b>.</p>
            <div className='buttons'>
              <ButtonGreen onClick={openCreateAlert}>{TEXTS.myAlerts.createAlert}</ButtonGreen>
              <ButtonOutlined onClick={() => setModalEmail(true)}>{TEXTS.myAlerts.editEmail}</ButtonOutlined>
            </div>
          </Grid>
          <div className='list-items'>
            {alerts[page].map(alert => <AlertItem key={alert.id} cities={citiesList} onDelete={onDelete} alert={alert}/>)}
          </div>
          <Pagination currentPage={page} itemsPerPage={alertsService.itemsPerPage} listSize={listSize} onChangePage={onChangePage}/>
        </Grid>
        :
        <Grid className='empty-list' item sm={4} xs={12}>
          <h2 className='h2-class font-sora'>{TEXTS.myAlerts.alerts}</h2>
          <img src={emptyListImage} alt='Lista vazia' />
          { !isLoading ? <div className='paragraph-class'>{TEXTS.myAlerts.emptyList}</div> : <></> }
          <ButtonGreen onClick={openCreateAlert} fullWidth>{TEXTS.myAlerts.emptyButtonCreate}</ButtonGreen>
        </Grid>
      }
    </Grid>
  );
};

export default MyAlerts;