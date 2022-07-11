import { Grid } from '@mui/material';
import searchImage from '@app/assets/images/startSearch/start-search.jpg';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import { Link } from 'react-router-dom';
import { urls } from '@app/ui/utils/urls';
import { useSelector } from 'react-redux';
import { UserState } from '@app/models/user.model';
import { RootState } from '@app/stores/store';
import './StartSearch.scss'

const StartSearch = () => {
  const userData: UserState = useSelector((state: RootState) => state.user);
  
  return (
    <Grid container className='container start-search-page'>
      <Grid item container xs={0} sm={4}></Grid>
      <Grid item xs={12} sm={4} >
        <div className='img-area'>
          <img src={searchImage} alt='começe a buscar'/>
        </div>
        <div className='text-area'>
          <p className='h3-style'>Vamos começar a buscar!</p>
          <p className='paragraph-style'>
            { userData && userData.plan_pro ? 
              'Pronto, agora você pode utilizar todos as funcionalidades disponíveis no nosso plano PRO' :
              'Pronto, agora você já pode utilizar o Diário do Clima para encontrar uma política ambiental'
            }
          </p>
        </div>
        <div className='button-area'>
          <Link to={urls.search.url}><ButtonGreen>Começar a buscar</ButtonGreen></Link>
        </div>
      </Grid>
    </Grid>
  );
}

export default StartSearch;
