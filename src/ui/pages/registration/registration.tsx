import { Dispatch, SetStateAction, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import computerImage from '/src/assets/images/computer-registration.svg';
import PasswordField from '../../components/passwordField/passwordField';
import SubmitForm from '/src/ui/components/submitForm/SubmitForm';
import InputError from '../../components/inputError/inputError';
import Loading from '/src/ui/components/loading/Loading';
import { fontRoboto, fontTitle3 } from '/src/ui/utils/fonts';
import { black, blue, gray, gray5, red } from '/src/ui/utils/colors';
import { urls } from '/src/ui/utils/urls';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { FormControl, Grid, Input, InputLabel, MenuItem, Select } from '@mui/material';
import { RegistrationModel, RegistrationResponse } from '/src/models/registration.model';
import { InputModel } from '/src/models/forms.model';
import AccountService, { checkPlan } from '/src/services/accounts';
import './registration.scss';
import { useDispatch } from 'react-redux';
import { userUpdate } from '/src/stores/user.store';
import { selectIcon } from '../../utils/forms.utils';
import { inputStyle } from '../../utils/generalStyles';

const emptyError = <></>;
const inputsDefaultValue = {
  username: { value: '' },
  email: { value: '' },
  password: { value: '' },
  gender: { value: '' },
  sector: { value: '' },
  state: { value: '' },
  city: { value: '' },
};

const fieldValidations: any = {
  username: (s: InputModel) => { return s.value && s.value.length < 8 ? 'O campo deve possuir no mínimo 8 caracteres' : false },
  password: (s: InputModel) => { return s.isValid ? false : 'A senha deve atender todos os requisitos a baixo' },
  email: (s: InputModel) => { return /\S+@\S+\.\S+/.test(s.value) ? false : 'O e-mail inserido é invalido' },
  city: (s: InputModel) => { return s.value && s.value.length < 5  ? 'O campo deve possuir no mínimo 5 caracteres' : false },
};

const Registration = () => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const accountsService = new AccountService();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);
  const [submitError, setSubmitError] : [JSX.Element, Dispatch<JSX.Element>] = useState(emptyError);
  const [step, setStep] : [number, Dispatch<SetStateAction<number>>] = useState(1);
  const [inputs, setInputs] : [RegistrationModel, Dispatch<SetStateAction<RegistrationModel>>] = useState(inputsDefaultValue);

  const inputChange = (event: any) => {
    const {name, valid, value} = event.target;
    setInputs((values: RegistrationModel) => ({...values, [name]: {value: value, isValid: valid }}));
  }

  const handleSubmit = (event: any) => {
    let errors = [];
    ['username', 'email', 'password', 'city'].forEach((key: string) => {
      let input: InputModel = inputs[key];
      let validator: any = fieldValidations[key] ? fieldValidations[key](input) : false;
      if(inputs[key].value) {
        setInputs((values: RegistrationModel) => ({...values, [key]: {...input, errorMessage: validator}}))
        if(typeof validator === 'string' || validator instanceof String) {
          errors.push(key);
        }
      }
    });
    if(!errors.length && step < 3) {
      const nextStep = step + 1;
      setStep(nextStep);
    } else if(!errors.length && step === 3) {
      submit();
    }
    event.preventDefault();
  }

  const submit = () => {
    setLoading(true);
    setSubmitError(emptyError);
    accountsService.createNewAcount(inputs).then(
      (response: RegistrationResponse) => {
        navigate(urls.becomePro.url);
        setTimeout(() => {
          dispatch(userUpdate({
            access: response.jwt.access,
            refresh: response.jwt.refresh,
            id: response.id,
            full_name: response.full_name,
            plan_pro: checkPlan(response),
          }));
        }, 100);
      },
      ).catch(e => {
        const errorKey = e ? Object.keys(e)[0] : '';
        setSubmitError(
          <span>
            Ocorreu um erro ao tentar criar a sua conta, por favor, tente novamente.
            { e? <><br/><br/>Motivo do erro: {e[errorKey]}</> : <></> }
            <br/><a className='hover-animation' style={{color: red, textDecoration: 'underline'}} onClick={resetForm}>Clique aqui para voltar ao inicio do cadastro</a>
          </span>)
        setLoading(false);
    });
  }

  const resetForm = () => {
    setSubmitError(emptyError);
    setInputs(inputsDefaultValue);
    setStep(1);
  }

  const getFormStep = (step: number) => {
    const forms: any = {
      1: formStepOne(),
      2: formStepTwo(),
      3: formStepThree(),
    };
    return forms[step];
  }

  const formStepOne = () => {
    return (
      <div>
        <div 
          style={{...fontTitle3}}
        >
          Crie uma conta para começar a buscar no Diário do Clima
        </div>
        <div>
          <FormControl className='form-input' fullWidth style={{marginTop: '40px'}}>
            <InputLabel id='username'>Nome Completo</InputLabel>
            <Input required error={!!inputs.username.errorMessage} type='text' value={inputs.username.value} name='username'  onChange={inputChange} sx={inputStyle}/>
            <InputError>{inputs.username.errorMessage}</InputError>
          </FormControl>

          <FormControl className='form-input' fullWidth>
            <InputLabel id='email'>E-mail</InputLabel>
            <Input required error={!!inputs.email.errorMessage} type='email' value={inputs.email.value} sx={inputStyle} name='email' onChange={inputChange} />
            <InputError>{inputs.email.errorMessage}</InputError>
          </FormControl>

          <PasswordField errorMessage={inputs.password.errorMessage} value={inputs.password.value} onChange={inputChange} name='password' sx={inputStyle}/>
          
          <SubmitForm />
        </div>
      </div>
    )
  }

  const formStepTwo = () => {
    return (
      <div>
        {SelectFormTitle()}
        <div>
          <FormControl fullWidth sx={selectAreaStyle} style={{marginTop: '40px'}}>
            <InputLabel id='gender-select'>Gênero</InputLabel>
            <Select required variant='standard' IconComponent={selectIcon} labelId='gender-select' value={inputs.gender.value} name='gender' onChange={inputChange} label='Gênero'>
              <MenuItem value={0} disabled>Selecione um gênero</MenuItem>
              <MenuItem value={'f'}>Feminino</MenuItem>
              <MenuItem value={'m'}>Masculino</MenuItem>
              <MenuItem value={'o'}>Outro</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={selectAreaStyle} >
            <InputLabel id='sector-select'>Area de Atuação</InputLabel>
            <Select required variant='standard' IconComponent={selectIcon} labelId='sector-select' value={inputs.sector.value} name='sector' onChange={inputChange} label='Area de Atuação'>
              <MenuItem value={0} disabled>Selecione uma área</MenuItem>
              <MenuItem value={'Area 1'}>Area 1</MenuItem>
              <MenuItem value={'Area 2'}>Area 2</MenuItem>
              <MenuItem value={'Area 3'}>Area 3</MenuItem>
            </Select>
          </FormControl>

          <SubmitForm />
        </div>
      </div>
    )
  }

  const formStepThree = () => {
    return (
      <div>
          {SelectFormTitle()}
        <div>
        <FormControl fullWidth sx={selectAreaStyle} style={{marginTop: '40px'}}>
            <InputLabel id='state-select'>Estado</InputLabel>
            <Select required variant='standard' IconComponent={selectIcon} labelId='state-select' value={inputs.state.value} name='state' onChange={inputChange} label='Estado'>
              <MenuItem value={0} disabled>Selecione um estado</MenuItem>
              <MenuItem value={'SP'}>São Paulo</MenuItem>
              <MenuItem value={'RJ'}>Rio de Janeiro</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth className='form-input' sx={{marginTop: '12px'}}>
            <InputLabel id='city'>Cidade</InputLabel>
            <Input required type='text' value={inputs.city.value} sx={inputStyle} name='city' onChange={inputChange} />
            <InputError>{inputs.city.errorMessage}</InputError>
          </FormControl>

          <SubmitForm sx={{marginTop: '26px'}} disabled={isLoading}/>
        </div>
      </div>
    )
  }
  
  const SelectFormTitle = () => {
    return (
      <>
        <div 
          style={{...fontTitle3}}
        >
          Bem-vindo ao Diário do Clima
        </div>
        <div
          style={{
            ...fontRoboto,
            color: gray5,
            fontSize: '18px',
            marginTop: '8px',
          }}
        >
          Queremos te conhecer um pouco melhor! Complete seu cadastro 
        </div>
      </>
    );
  }

  return (
    <section>
      <Loading isLoading={isLoading}></Loading>
      <form className='registration-form' onSubmit={handleSubmit}>
        <Grid item container xs={12} className='container'>
          <Grid item sm={1} xs={0}></Grid>
          <Grid item sm={6}>
            <Grid container>
              <Grid item sm={10} xs={12}>
                <div 
                  style={{padding: isDesktop ? '56px 0 0' : '45px 0 0', overflowX: 'hidden'}}
                >
                  <div>
                    <div style={{display: 'flex', marginBottom: '38px'}}>
                      <div style={stepStyle} className={step === 1 ? 'selected' : ''}>1</div>
                      <div style={stepStyle} className={step === 2 ? 'selected' : ''}>2</div>
                      <div style={stepStyle} className={step === 3 ? 'selected' : ''}>3</div>
                    </div> 
                  </div>
                  {getFormStep(step)}
                </div>
                <div>
                  <div  style={{
                    ...fontRoboto,
                    fontSize: '14px',
                    color: gray,
                    marginTop: '32px',
                    marginBottom: '2px'
                  }}>
                    Ao se cadastrar, você está aceitando os nossos
                  </div>
                  <div style={{marginBottom: step > 1 ? '30px' : ''}}>
                    <Link to='' className='hover-animation'>
                      <span style={{
                        ...linkStyle,
                        paddingRight: '5px',
                        borderRightStyle: 'solid',
                        borderRightWidth: '2px',
                        borderRightColor: gray,
                        
                      }}>
                        Fale conosco
                      </span>
                    </Link>
                    <Link to={urls.terms.url} className='hover-animation'>
                      <span
                        style={{
                          ...linkStyle,
                          paddingLeft: '5px',
                        }}>
                        Termos e condições
                      </span>
                    </Link>
                  </div>
                </div>
                <div>
                  {step === 1 ? 
                    <div  style={{
                      ...fontRoboto,
                      fontSize: '14px',
                      marginTop: '32px',
                      marginBottom: '30px'
                    }}>
                      Já possui uma conta?
                      <a href='/?login=open' className='hover-animation'>
                        <span
                          style={{
                            color: blue,
                            fontWeight: 600,
                            marginLeft: '5px',
                          }}
                        >
                          Faça o login
                          </span>
                        </a>
                    </div> : <></>
                  }
                </div>
                <div style={{color: red, fontSize: '14px', marginBottom: '30px', ...fontRoboto}}>{submitError}</div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={5} xs={0}>
            <img src={computerImage}/>
          </Grid>
        </Grid>
      </form>
    </section>
  );
}

export default Registration;

const selectAreaStyle: React.CSSProperties = {
  marginTop: '32px',
  color: black
};

const linkStyle: React.CSSProperties = {
  ...fontRoboto,
  color: blue,
  width: '50%',
  height: '100%',
  fontWeight: 600,
  fontSize: '14px',
}

const stepStyle: React.CSSProperties = {
  width: '24px',
  height: '22px',
  textAlign: 'center',
  marginRight: '14px',
  transition: '0.4s',
  color: gray5,
  fontSize: '18px'
}