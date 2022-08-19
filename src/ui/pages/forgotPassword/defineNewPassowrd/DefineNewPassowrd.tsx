import { Dispatch, useState } from 'react';
import { InputModel, InputType } from '@app/models/forms.model';
import ResetPasswordService from '@app/services/resetPassword';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import PasswordField from '@app/ui/components/forms/passwordField/passwordField';
import Loading from '@app/ui/components/loading/Loading';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { Grid } from '@mui/material';

const DefineNewPassowrd = () => {
  const resetPasswordService = new ResetPasswordService();
  const [password, setPassword] : [InputModel, Dispatch<InputModel>] = useState({value: ''});
  const [error, setError] : [string, Dispatch<string>] = useState('');
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);
  const [sent, setSent] : [boolean, Dispatch<boolean>] = useState(false);
  const token = '';

  const onSubmit = () => {
    if(!password.isValid) {
      setError(TEXTS.defineNewPassword.error);
    } else {
      setError('');
      setLoading(true);

      resetPasswordService.validateToken(token).then(() => {
        submit();
      }).catch(() => {
        setError(TEXTS.defineNewPassword.expired);
        setLoading(false);
      });
    }
  };

  const submit = () => {
    resetPasswordService.resetPassword(token, password.value).then(() => {
      setSent(true);
      setLoading(false);
    }).catch(() => {
      setError(TEXTS.defineNewPassword.apiError);
      setLoading(false);
    });
  };

  const onChange = (event: InputType, isValid: boolean) => {
    setPassword({value: event.target.value, isValid: isValid});
  };

  return (
    <Grid container className='container forgot-password-page'>
      <Loading isLoading={isLoading} />
      { !sent ?
        <Grid item sm={5} xs={12}>
          <div className='text-area'>
            <p className='h3-class'>{TEXTS.defineNewPassword.title}</p>
            <p className='paragraph-class'>
              {TEXTS.defineNewPassword.text}
            </p>
          </div>
          <div className='redefine-field'>
            <PasswordField 
              name='password'
              value={password.value}
              errorMessage={error}
              placeholder={TEXTS.defineNewPassword.inputLabel}
              onChange={onChange}
            />
          </div>
          <div className='button-area'>
            <ButtonGreen onClick={onSubmit}>{TEXTS.defineNewPassword.button}</ButtonGreen>
          </div>
        </Grid>
        : 
        <Grid item sm={5} xs={12}>
          <div className='text-area'>
            <p className='h3-class'>{TEXTS.defineNewPassword.sentTitle}</p>
            <div className='button-area sent-link'>
              <a href='/?login=open'><ButtonGreen onClick={onSubmit}>{TEXTS.defineNewPassword.sentButton}</ButtonGreen></a>
            </div>
          </div>
        </Grid>
      }
    </Grid>
  );
};

export default DefineNewPassowrd;
