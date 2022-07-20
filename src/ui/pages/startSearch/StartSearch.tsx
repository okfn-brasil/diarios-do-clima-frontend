import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import searchImage from '@app/assets/images/startSearch/start-search.jpg';
import { UserState } from '@app/models/user.model';
import { RootState } from '@app/stores/store';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import './StartSearch.scss';

const StartSearch = () => {
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);
  
  return (
    <Grid container className='container start-search-page'>
      <Grid item container xs={0} sm={4}></Grid>
      <Grid item xs={12} sm={4} >
        <div className='img-area'>
          <img src={searchImage} alt='começe a buscar'/>
        </div>
        <div className='text-area'>
          <p className='h3-class'>{TEXTS.startSearchPage.title}</p>
          <p className='paragraph-class'>
            {userData && userData.plan_pro ? TEXTS.startSearchPage.proText : TEXTS.startSearchPage.basicText}
          </p>
        </div>
        <div className='button-area'>
          <Link to={urls.search.url}><ButtonGreen>{TEXTS.startSearchPage.start}</ButtonGreen></Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default StartSearch;
