import { ChangeEvent, Dispatch, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserState } from '@app/models/user.model';
import ResetPasswordService from '@app/services/resetPassword';
import { RootState } from '@app/stores/store';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import Input from '@app/ui/components/forms/input/Input';
import InputError from '@app/ui/components/forms/inputError/inputError';
import Loading from '@app/ui/components/loading/Loading';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { Grid } from '@mui/material';

const ForgotPassowrd = () => {
  const resetPasswordService = new ResetPasswordService();
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);
  const [email, setEmail] : [string, Dispatch<string>] = useState(userData.email as string || '');
  const [error, setError] : [string, Dispatch<string>] = useState('');
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);
  const [sent, setSent] : [boolean, Dispatch<boolean>] = useState(false);

  const onSubmit = () => {
    if (/\S+@\S+\.\S+/.test(email)) {
      setError('');
      setLoading(true);
      resetPasswordService.startReset(email).then(() => {
        setSent(true);
        setLoading(false);
      }).catch(() => {
        setError(TEXTS.forgotPassword.apiError);
        setLoading(false);
      });
    } else {
      setError(TEXTS.forgotPassword.emailInvalid);
    }
  };

  return (
    <Grid container className='container forgot-password-page'>
      <Loading isLoading={isLoading}/>
      { !sent ? 
        <Grid item sm={5} xs={12}>
          <div className='text-area'>
            <p className='h3-class'>{TEXTS.forgotPassword.title}</p>
            <p className='paragraph-class'>
              {TEXTS.forgotPassword.text}
            </p>
          </div>
          <div className='redefine-field'>
            <Input 
              onChange={(input: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(input.target.value)}
              label={TEXTS.forgotPassword.emailLabel} 
              name='email' 
              value={email} 
              required 
              type='email'
            />
            <InputError>{error}</InputError>
          </div>
          <div className='button-area'>
            <ButtonGreen onClick={onSubmit}>{TEXTS.forgotPassword.button}</ButtonGreen>
          </div>
        </Grid>
        : 
        <Grid item sm={5} xs={12}>
          <div className='text-area'>
            <p className='h3-class'>{TEXTS.forgotPassword.sentTitle}</p>
            <p className='paragraph-class'>
              {TEXTS.forgotPassword.sentText}
            </p>
          </div>
        </Grid>
      }
    </Grid>
  );
};

export default ForgotPassowrd;
