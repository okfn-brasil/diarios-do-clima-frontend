import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import computerImage from '@app/assets/images/computer-registration.svg';
import { InputModel, InputType } from '@app/models/forms.model';
import { RegistrationModel, RegistrationResponse } from '@app/models/registration.model';
import AccountService, { checkPlan } from '@app/services/accounts';
import { userUpdate } from '@app/stores/user.store';
import TextInput from '@app/ui/components/forms/input/Input';
import PasswordField from '@app/ui/components/forms/passwordField/passwordField';
import SelectInput from '@app/ui/components/forms/select/Select';
import SubmitForm from '@app/ui/components/forms/submitForm/SubmitForm';
import Loading from '@app/ui/components/loading/Loading';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import { Grid} from '@mui/material';

import './registration.scss';

interface FormsSelector {
  1: JSX.Element;
  2: JSX.Element;
  3: JSX.Element;
  [key: number]: JSX.Element;
}

interface FieldValidation {
  username: (s: InputModel) => string | boolean;
  password: (s: InputModel) => string | boolean;
  email: (s: InputModel) => string | boolean;
  city: (s: InputModel) => string | boolean;
  [key: string]: (s: InputModel) => string | boolean | undefined;
}

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

const fieldValidations: FieldValidation = {
  username: (s: InputModel) => { return s.value && s.value.length < 8 ? 'O campo deve possuir no mínimo 8 caracteres' : false; },
  password: (s: InputModel) => { return s.isValid ? false : 'A senha deve atender todos os requisitos a baixo'; },
  email: (s: InputModel) => { return /\S+@\S+\.\S+/.test(s.value) ? false : 'O e-mail inserido é invalido'; },
  city: (s: InputModel) => { return s.value && s.value.length < 5  ? 'O campo deve possuir no mínimo 5 caracteres' : false; },
};

const Registration = () => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const accountsService = new AccountService();
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);
  const [submitError, setSubmitError] : [JSX.Element, Dispatch<JSX.Element>] = useState(emptyError);
  const [step, setStep] : [number, Dispatch<SetStateAction<number>>] = useState(1);
  const [inputs, setInputs] : [RegistrationModel, Dispatch<SetStateAction<RegistrationModel>>] = useState(inputsDefaultValue);

  const inputChange = (event: InputType, valid?: boolean) => {
    const {name, value} = event.target;
    setInputs((values: RegistrationModel) => ({...values, [name]: {value: value, isValid: valid }}));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const errors = [];
    ['username', 'email', 'password', 'city'].forEach((key: string) => {
      const input: InputModel = inputs[key];
      const validator = fieldValidations[key] ? fieldValidations[key](input) : false;
      if(inputs[key].value) {
        setInputs((values: RegistrationModel) => ({...values, [key]: {...input, errorMessage: validator as string}}));
        if(typeof validator === 'string') {
          errors.push(key);
        }
      }
    });
    if(!errors.length && step === 1) {
      checkEmail();
    } else if(!errors.length && step === 2) {
      window.scrollTo(0, 0);
      const nextStep = step + 1;
      setStep(nextStep);
    } else if(!errors.length && step === 3) {
      submit();
    }
    event.preventDefault();
  };

  const checkEmail = (nextStep = true) => {
    setLoading(true);
    accountsService.getEmail(inputs.email.value).then(() => {
      setLoading(false);
      setInputs((values: RegistrationModel) => ({...values, email: 
        {
          ...inputs.email,
          errorMessage: 'Este endereço de e-mail ja possui uma conta cadastrada'
        }
      }));
    }).catch(() => {
      setLoading(false);
      if(nextStep) {
        const nextStep = step + 1;
        setStep(nextStep);
      }
    });
  };

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
            plan_pro: checkPlan(response),
            ...response
          }));
        }, 100);
      }).catch(e => {
      const errorKey = e ? Object.keys(e)[0] : '';
      setSubmitError(
        <span>
            Ocorreu um erro ao tentar criar a sua conta, por favor, tente novamente.
          { e? <><br/><br/>Motivo do erro: {e[errorKey]}</> : <></> }
          <br/><a className='hover-animation error-link' onClick={resetForm}>Clique aqui para voltar ao inicio do cadastro</a>
        </span>);
      setLoading(false);
    });
  };

  const resetForm = () => {
    setSubmitError(emptyError);
    setInputs(inputsDefaultValue);
    setStep(1);
  };

  const getFormStep = (step: number) => {
    const forms: FormsSelector = {
      1: formStepOne(),
      2: formStepTwo(),
      3: formStepThree(),
    };
    return forms[step];
  };

  const formStepOne = () => {
    return (
      <div>
        <h3 className='h3-class-sx-margin'>
          Crie uma conta para começar a buscar no Diário do Clima
        </h3>
        <div>
          <TextInput
            label='Nome Completo'
            classes='first-input'
            name='username'
            error={inputs.username.errorMessage}
            value={inputs.username.value}
            onChange={inputChange}
            required={true}
          />

          <TextInput
            label='E-mail'
            name='email'
            error={inputs.email.errorMessage}
            value={inputs.email.value}
            onChange={inputChange}
            onBlur={() => checkEmail(false)}
            required={true}
            type='email'
          />

          <PasswordField errorMessage={inputs.password.errorMessage} value={inputs.password.value} onChange={inputChange} name='password' classess='input-class'/>
          
          <SubmitForm />
        </div>
      </div>
    );
  };

  const formStepTwo = () => {
    return (
      <div>
        {SelectFormTitle()}
        <div>
          <SelectInput 
            classes='select-area-class first-input' 
            options={[{value: 'f', label: 'Feminino'},{value: 'm', label: 'Masculino'},{value: 'o', label: 'Outro'}]} 
            label='Gênero' 
            value={inputs.gender.value} 
            name='gender' 
            required={true} 
            onChange={inputChange}
          />

          <SelectInput 
            classes='select-area-class' 
            options={[{value: 'Area 1', label: 'Area 1'},{value: 'Area 2', label: 'Area 2'},{value: 'Area 3', label: 'Area 3'}]} 
            label='Area de Atuação' 
            value={inputs.sector.value} 
            name='sector' 
            required={true} 
            onChange={inputChange}
          />

          <SubmitForm />
        </div>
      </div>
    );
  };

  const formStepThree = () => {
    return (
      <div>
        {SelectFormTitle()}
        <div>
          <SelectInput 
            classes='select-area-class first-input' 
            options={TEXTS.stateList.map(state => {return { value: state, label: state };})}
            label='Estado' 
            value={inputs.state.value} 
            name='state' 
            required={true} 
            onChange={inputChange}
          />

          <TextInput
            classes='city-input'
            label='Cidade'
            name='city'
            error={inputs.city.errorMessage}
            value={inputs.city.value}
            onChange={inputChange}
            required={true}
          />

          <SubmitForm classess='submit-registration' label='Finalizar' disabled={isLoading}/>
        </div>
      </div>
    );
  };
  
  const SelectFormTitle = () => {
    return (
      <>
        <div className='h3-class-sx-margin'>
          Bem-vindo ao Diário do Clima
        </div>
        <div className='paragraph-class'>
          Queremos te conhecer um pouco melhor! Complete seu cadastro 
        </div>
      </>
    );
  };

  return (
    <section>
      <Loading isLoading={isLoading}></Loading>
      <form className='registration-form' onSubmit={handleSubmit}>
        <Grid item container xs={12} className='container'>
          <Grid item sm={1} xs={0}></Grid>
          <Grid item sm={6}>
            <Grid container>
              <Grid item sm={10} xs={12}>
                <div className='steps-area'>
                  <div>
                    <div className='steps'>
                      <div className={step === 1 ? 'step-selected-class' : 'step-class'}>1</div>
                      <div className={step === 2 ? 'step-selected-class' : 'step-class'}>2</div>
                      <div className={step === 3 ? 'step-selected-class' : 'step-class'}>3</div>
                    </div> 
                  </div>
                  {getFormStep(step)}
                </div>
                <div>
                  <div className='warn'>
                    Ao se cadastrar, você está aceitando os nossos
                  </div>
                  <div className={step > 1 ? 'warn-next-step' : ''}>
                    <Link to='' className='hover-animation'>
                      <span className='blue-link contact'>
                        Fale conosco
                      </span>
                    </Link>
                    <Link to={urls.terms.url} className='hover-animation'>
                      <span className='blue-link terms-link'>
                        Termos e condições
                      </span>
                    </Link>
                  </div>
                </div>
                <div>
                  {step === 1 ? 
                    <div  className='has-account'>
                      Já possui uma conta?
                      <a href='/?login=open' className='hover-animation'>
                        <span className='blue-link login-link'>
                          Faça o login
                        </span>
                      </a>
                    </div> : <></>
                  }
                </div>
                <div className='error-warn'>{submitError}</div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={5} xs={0}>
            <img src={computerImage} alt='imagem - pagina de cadastro'/>
          </Grid>
        </Grid>
      </form>
    </section>
  );
};

export default Registration;
