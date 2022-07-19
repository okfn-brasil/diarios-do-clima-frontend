import { UserState } from '@app/models/user.model';
import { RootState } from '@app/stores/store';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Arrow from '@app/assets/images/icons/arrow-down.svg';
import './UserInfo.scss';
import { Dispatch, useEffect, useState } from 'react';
import Loading from '@app/ui/components/loading/Loading';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

const ArrowRight = () => {
  return (
    <img src={Arrow} className='right-arrow' alt='avançar'/>
  )
}

const UserInfo = () => {
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(true);

  useEffect(() => {
    if(userData.date_joined) {
      setLoading(false);
    }
  }, [userData])

  const getDate = () => {
    const date = new Date(userData.date_joined || '');
    const month = date.getMonth()? months[date.getMonth()] : '';
    const year = date.getFullYear()? date.getFullYear(): '';
    return `${month} ${year}`;
  }

  const getNextPayment = () => {
    const created = userData.plan_subscription?.created_at;
    if(created) {
      const today = new Date();
      const date = new Date(created)
      const day = date.getDate();
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);
      return `${day} de ${months[nextMonth.getMonth()]} de ${nextMonth.getFullYear()}`
    } else {
      return '';
    }
  }

  return (
    <Grid container justifyContent='center' className='user-info-page'>
      <Loading isLoading={isLoading}></Loading>
      <Grid item sm={7} xs={12} className='container'>
        <div>
          <h2 className='h2-class font-sora'>Minha conta</h2>
          <div className='sub-title'>Usuário{ userData.plan_pro ? ' PRO' : ''} desde {getDate()}</div>

          <Grid container justifyContent='space-between'>
            <Grid className={(userData.plan_pro ? 'not-align-self' : '')  + ' white-box'}>
              <div className='sub-title'>Seus dados</div>
              <div className='user-info'>
                <div className='email'>{userData.email}</div>
                <div className='password-display'>Senha: ••••••••</div>
                <div className='user-name'>{userData.full_name} - {userData.city} - {userData.state}</div>
              </div>
              <div>
                <Link to='' className='hover-animation'>
                  <div className='form-link'>
                    Alterar e-mail da conta <ArrowRight/>
                  </div>
                </Link>
                <Link to='' className='hover-animation'>
                  <div className='form-link'>
                    Alterar senha <ArrowRight/>
                  </div>
                </Link>
                <Link to='' className='hover-animation'>
                  <div className='form-link'>
                    Alterar dados pessoais <ArrowRight/>
                  </div>
                </Link>
              </div>
            </Grid>
            <Grid className={(userData.plan_pro ? 'not-align-self' : '')  + ' white-box'}>
              {userData.plan_pro ? 
                <div>
                  <div className='sub-title plan-sub-title'>Detalhes do plano</div>
                  <div className='plan-type'>PRO</div>
                  
                  <div className='card-info'>
                    <div className='card-box'></div>
                    <div className='card-digits'>**** **** **** {userData.credit_card?.last_four_digits}</div>
                  </div>

                  <div className='small-text'>Sua próxima data de cobrança é {getNextPayment()}.</div>

                  <Link to='' className='hover-animation manage-payment'>
                    <div className='form-link'>
                    Gerenciar informações de pagamento <ArrowRight/>
                    </div>
                  </Link>
                  
                  <Link to={urls.purchase.url} className='cancel'><ButtonOutlined fullWidth>Cancelar assinatura</ButtonOutlined></Link>
                </div>
                :
                <div>
                  <div className='sub-title plan-sub-title'>Detalhes do plano</div>
                  <div className='plan-type'>Básico</div>
                  <Link to={urls.purchase.url}><ButtonGreen fullWidth>Iniciar teste grátis PRO</ButtonGreen></Link>
                </div>
              }
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default UserInfo;
