import { Dispatch, useEffect, useState } from 'react';
import emptyListImage from '@app/assets/images/empty-list.svg';
import { AlertModel, AlertsList } from '@app/models/alerts.model';
import AlertsService from '@app/services/alerts';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import ModalsCreateAlert from '@app/ui/components/createAlertModals/ModalsCreateAlert';
import Loading from '@app/ui/components/loading/Loading';
import Pagination from '@app/ui/components/pagination/Pagination';
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
  const [alerts, setAlerts] : [AlertsListModel, Dispatch<AlertsListModel>] = useState({} as AlertsListModel);
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(true);
  const [isOpenCreateAlert, setStateCreateAlert] : [boolean, Dispatch<boolean>] = useState(false);
  const [deleteAlertIt, setAlertDeleteId] : [string, Dispatch<string>] = useState('');
  const [deleteError, setDeleteError] : [string, Dispatch<string>] = useState('');
  const [listSize, setListSize] : [number, Dispatch<number>] = useState(0);
  const [page, setPage] : [number, Dispatch<number>] = useState(0);
  const [cleanModal, setCleanModal] : [number, Dispatch<number>] = useState(0);
  const [loadedPages, setLoadedPages] : [number[], Dispatch<number[]>] = useState([] as number[]);
  const alertsService = new AlertsService();

  useEffect(() => {
    getList(page);
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
      setDeleteError('Ocorreu um erro ao tentar deletar este alerta, por favor, tente novamente.');
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
      <ModalsCreateAlert clean={cleanModal} isOpen={isOpenCreateAlert} onCreated={onCreated} onOpen={openCreateAlert} onClose={() => setStateCreateAlert(false)}/>
      <Loading isLoading={isLoading}></Loading>
      {alerts && Object.keys(alerts).filter(index => !!alerts[parseInt(index)].length).length ?
        <Grid sm={8} xs={12} item container className='alerts-list' justifyContent='center'>
          <Grid item lg={7} sm={12} className='alerts-header'>
            <h3 className='h3-class'>Esses são seus alertas para encontrar novas políticas ambientais</h3>
            <p className='paragraph-class'>Atualize ou adicione novas preferências de imóveis em <b>Criar novo alerta</b>.</p>
            <p className='paragraph-class'>Defina onde prefere receber notificações em <b>Editar e-mail</b>.</p>
            <div className='buttons'>
              <ButtonGreen onClick={openCreateAlert}>Criar novo alerta</ButtonGreen>
              <ButtonOutlined>Editar e-mail</ButtonOutlined>
            </div>
          </Grid>
          <div className='list-items'>
            {alerts[page].map(alert => <AlertItem key={alert.id} onDelete={onDelete} alert={alert}/>)}
          </div>
          <Pagination currentPage={page} itemsPerPage={alertsService.itemsPerPage} listSize={listSize} onChangePage={onChangePage}/>
        </Grid>
        :
        <Grid className='empty-list' item sm={4} xs={12}>
          <h2 className='h2-class font-sora'>Alertas salvos</h2>
          <img src={emptyListImage} alt='Lista vazia' />
          { !isLoading ? <div className='paragraph-class'>Você ainda não possui nenhum alerta</div> : <></> }
          <ButtonGreen onClick={openCreateAlert} fullWidth>Criar alerta</ButtonGreen>
        </Grid>
      }
    </Grid>
  );
};

export default MyAlerts;