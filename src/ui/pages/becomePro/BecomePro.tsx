import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import CheckIcon from '@mui/icons-material/Check';
import { Grid } from '@mui/material';

import './BecomePro.scss';

const BecomePro = () => {
  const params = useParams();
  const navigate = useNavigate();

  const continueNavigation = () => {
    console.log(params);
    if(params.param === 'afterregistration') {
      navigate(urls.startSearch.url);
    } else {
      history.back();
    }
  };
  return (
    <Grid container className='container become-pro vertical-spacing-container'>
      <Grid item container xs={0} sm={3}></Grid>
      <Grid item xs={12} sm={6}>
        <div className='h3-class'>
          {TEXTS.becomeProPage.title} <span className='green-h3'>{TEXTS.becomeProPage.titleSpan}</span>
        </div>
        <p className='subtitle'>{TEXTS.becomeProPage.signDescription}</p>
        <p className='subtitle text-space'>{TEXTS.becomeProPage.basicPlanTitle}</p>
        <div className='check-group'>
          <div className='check-item'>
            <span className='check-icon'><CheckIcon color='disabled'/></span> {TEXTS.becomeProPage.basicItem}
          </div>
        </div>
        <hr className='check-group thin-line'/>
        <div className='check-group'>
          <p className='subtitle'>{TEXTS.becomeProPage.proPlanTitle}</p>
          <div className='check-item'>
            <span className='check-icon'><CheckIcon className='green-icon'/></span> {TEXTS.becomeProPage.proItem1}
          </div>
          <div className='check-item'>
            <span className='check-icon'><CheckIcon className='green-icon'/></span> {TEXTS.becomeProPage.proItem2}
          </div>
          <div className='check-item'>
            <span className='check-icon'><CheckIcon className='green-icon'/></span> {TEXTS.becomeProPage.proItem3}
          </div>
        </div>
        <div className='button-area'>
          <Link to={urls.purchase.url}><ButtonGreen classess='card-button'>{TEXTS.becomeProPage.signUp}</ButtonGreen></Link>
          <ButtonOutlined onClick={continueNavigation} classess='card-button button-gray'>{TEXTS.becomeProPage.continue}</ButtonOutlined>
        </div>
      </Grid>
    </Grid>
  );
};

export default BecomePro;
