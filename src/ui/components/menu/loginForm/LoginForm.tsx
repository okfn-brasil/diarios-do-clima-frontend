import { Grid, Input } from '@mui/material';
import ShowPassIcon from '@app/assets/images/icons/show-pass.svg';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { fontTitle3Black, fontRoboto } from '@app/ui/utils/fonts';
import DiarioLogoBlack from '@app/assets/images/logo-black.svg';
import { Dispatch, SetStateAction, useState } from 'react';
import { inputStyle } from '@app/ui/utils/generalStyles';
import SubmitForm from '@app/ui/components/submitForm/SubmitForm';
import { blue, red } from '@app/ui/utils/colors';
import { urls } from '@app/ui/utils/urls';
import { LoginModel, LoginResponse } from '@app/models/login.model';
import LoginService from '@app/services/login';
import Loading from '@app/ui/components/loading/Loading';
import { userUpdate } from '@app/stores/user.store';
import { useDispatch } from 'react-redux';
import AccountService, { checkPlan } from '@app/services/accounts';
import { UserResponseModel } from '@app/models/user.model';
import './LoginForm.scss';

interface PropsLoginForm{
  isDesktop: boolean;
  showLoginForm: any;
}

const LoginForm = ({isDesktop, showLoginForm}: PropsLoginForm) => {
  const dispatch = useDispatch();
  const loginService = new LoginService();
  const accountService = new AccountService();
  const [passFieldType, setPassType]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);
  const [isLoading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [error, setError]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [inputs, setInputs] : [LoginModel, Dispatch<SetStateAction<LoginModel>>] = useState({
    email: '',
    password: '',
  });

  const inputChange = (event: any) => {
    const {name, value} = event.target;
    setInputs((values: any) => ({...values, [name]: value}));
  }

  const changeFieldType = () => {
    setPassType(!passFieldType);
  }

  const closeModal = () => {
    showLoginForm(false);
  }
  
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setError(false);
    setLoading(true);
    loginService.login(inputs).then(
      (response: LoginResponse) => {
        dispatch(userUpdate({
          access: response.access,
          refresh: response.refresh,
        }));
        getUserData(response.access);
      },
      ).catch(() => {
        setLoading(false);
        setError(true);
    });
  }

  const getUserData = (token: string) => {
    accountService.getUserData(token).then(
      (response: UserResponseModel) => {
        dispatch(userUpdate({
          id: response.id,
          full_name: response.full_name,
          plan_pro: checkPlan(response),
        }));
        setLoading(false);
        closeModal();
      }).catch(() => {
        setLoading(false);
        setError(true);
    });
  }

  return (
    <div className='login-form'>
      <Loading isLoading={isLoading}></Loading>
      <Grid container style={{justifyContent: 'center'}}>
        <Grid 
          item 
          xs={12} 
          sm={5} 
          style={{
            backgroundColor: 'white',
            padding: '24px 24px',
            height: isDesktop ? 'unset' :'100vh',
            minWidth: '350px',
            overflowY: 'auto',
            overflowX: 'hidden',
          }} 
          className='container'
          >
          <div>
            <CloseIcon className='hover-animation' onClick={closeModal} sx={{marginBottom: '20px'}} />
          </div>
          <hr style={{margin: 0, borderTop: 'none', width: 'calc(100% + 46px)', marginLeft: '-24px'}}/>
          <div>
            <img style={{width: '164px', margin: '32px 0'}} src={DiarioLogoBlack}/>
          </div>
          <p style={{...fontTitle3Black, margin: '0'}}>Acesse sua conta</p>
          <p style={{...fontRoboto, fontSize: '18px', margin: '10px 0'}}>Lorem ipsum sit amet consectetur</p>

          <form style={{marginTop: '8px'}} onSubmit={handleSubmit}>
            <Input required type='email' value={inputs.email} sx={inputStyle} name='email' onChange={inputChange} placeholder='E-mail' />
            
            <div className='password-field'>
              <img className={'hover-animation ' + (passFieldType ? 'low-opacity' : '')} src={ShowPassIcon} onClick={changeFieldType} />
              <Input required type={passFieldType ? 'password' : 'text'} value={inputs.password} sx={inputStyle} name='password' onChange={inputChange} placeholder='Senha' />
            </div>
            
            <SubmitForm disabled={isLoading} sx={{marginBottom: '32px'}}/>
          </form>

          {error ? 
              <div
                style={{
                  ...fontRoboto,
                  color: red,
                  fontSize: '14px',
                  margin: '15px 0'
                }}
              >
                Ocorreu um erro ao tentar logar em sua conta, por favor, verifique os dados e tente novamente.
              </div> 
              : <></>}

          <div>
            <div  style={{
              ...fontRoboto,
              fontSize: '14px',
              marginBottom: '30px'
            }}>
              Não possui uma conta?
              <Link to={urls.registration.url} onClick={closeModal} className='hover-animation'>
                <span
                  style={{
                    color: blue,
                    fontWeight: 600,
                    marginLeft: '5px',
                  }}
                >
                  Faça o cadastro
                </span>
              </Link>
            </div> 
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginForm;
