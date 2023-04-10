import { ChangeEvent, Dispatch, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserState } from '@app/models/user.model';
import ResetPasswordService from '@app/services/resetPassword';
import { RootState } from '@app/stores/store';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import Input from '@app/ui/components/forms/input/Input';
import InputError from '@app/ui/components/forms/inputError/inputError';
import Loading from '@app/ui/components/loading/Loading';
import { testEmail } from '@app/ui/utils/functions.utils';
import { TEXTS } from '@app/ui/utils/portal-texts';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';

import './ForgotPassword.scss';

interface ForgotPasswordModal {
  onClickClose: () => void;
}

const ForgotPassowrd = ({onClickClose}: ForgotPasswordModal) => {
  const resetPasswordService = new ResetPasswordService();
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);
  const [email, setEmail] : [string, Dispatch<string>] = useState(userData.email as string || '');
  const [error, setError] : [string, Dispatch<string>] = useState('');
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);
  const [sent, setSent] : [boolean, Dispatch<boolean>] = useState(false);

  const onSubmit = () => {
    if (testEmail(email)) {
      setError('');
      setLoading(true);
      resetPasswordService.startReset(email).then(() => {
        setSent(true);
        setLoading(false);
      }).catch(error => {
        if(error?.email[0] === 'We couldn\'t find an account associated with that email. Please try a different e-mail address.') {
          setError(TEXTS.forgotPassword.notFound);
        } else {
          setError(TEXTS.forgotPassword.apiError);
        }
        setLoading(false);
      });
    } else {
      setError(TEXTS.forgotPassword.emailInvalid);
    }
  };

  return (
    <div className='forgot-password-modal'>
      <Loading isLoading={isLoading}></Loading>
      <Grid container justifyContent='center'>
        <Grid item xs={12} sm={5} className='container forgot-password-content'>
          <div>
            <CloseIcon className='hover-animation close-icon' onClick={onClickClose} />
          </div>
          <hr className='thin-line' />
          <div className='modal-padding'>
            { !sent ? 
              <Grid>
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
                  <InputError classes='send-error'>{error}</InputError>
                </div>
                <div className='button-area'>
                  <ButtonGreen onClick={onSubmit}>{TEXTS.forgotPassword.button}</ButtonGreen>
                </div>
              </Grid>
              : 
              <Grid>
                <div className='text-area success'>
                  <p className='h3-class'>{TEXTS.forgotPassword.sentTitle}</p>
                  <p className='paragraph-class'>
                    {TEXTS.forgotPassword.sentText}
                  </p>
                  <ButtonGreen onClick={onClickClose}>{TEXTS.forgotPassword.buttonClose}</ButtonGreen>
                </div>
              </Grid>
            }
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ForgotPassowrd;
