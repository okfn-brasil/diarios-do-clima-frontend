import EnteIcon from '@app/assets/images/icons/ente.svg';
import LocationIcon from '@app/assets/images/icons/location.svg';
import ThemeIcon from '@app/assets/images/icons/theme.svg';
import { AlertModel } from '@app/models/alerts.model';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { Grid } from '@mui/material';

import './AlertItem.scss';

interface AlertProps {
  alert: AlertModel;
  onDelete: (alert: string) => void;
}

const AlertItem = ({alert, onDelete}: AlertProps) => {
  return (
    <div className='alert-item'>
      <div className='filters-items'>
        <div className='font-sora filter-title'>{TEXTS.myAlerts.alertItem.keyWords}</div>
        <h3 className='key-words'>{alert.query_string}</h3>
        { alert.territory_id || (alert.sub_themes && alert.sub_themes.length) || (alert.gov_entities && alert.gov_entities.length) ?
          <div> <hr className='thin-line'/>
            <div className='font-sora filter-title'>{TEXTS.myAlerts.alertItem.filters}</div>
            { alert.territory_id ? 
              <div className='filter-item'>
                <img src={LocationIcon} alt='icone de localização' />
                {alert.territory_id}
              </div> 
              : <></> }
            { alert.sub_themes && alert.sub_themes.length ? 
              <div className='filter-item'>
                <img src={ThemeIcon} alt='icone de tema' />
                {alert.sub_themes.join(', ')}
              </div> 
              : <></> }
            { alert.gov_entities && alert.gov_entities.length ? 
              <div className='filter-item'>
                <img src={EnteIcon} alt='icone de ente governamental' />
                {alert.gov_entities[0]}
              </div> 
              : <></> }
          </div> 
          :<></> }
      </div> 
      <Grid container justifyContent='center' className='delete-alert'>
        <span className='hyper-link hover-animation' onClick={() => onDelete(alert.id)}>{TEXTS.myAlerts.alertItem.delete}</span>
      </Grid>
    </div>
  );
};

export default AlertItem;