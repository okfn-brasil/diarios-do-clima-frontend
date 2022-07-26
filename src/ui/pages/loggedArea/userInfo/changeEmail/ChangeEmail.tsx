import { Dispatch, useEffect, useState } from 'react';
import AccountService from '@app/services/accounts';
import TextInput from '@app/ui/components/forms/input/Input';
import { TEXTS } from '@app/ui/utils/portal-texts';

import EditDataModal from '../editDataModal/EditDataModal';

interface ChangeEmail {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string | null;
  setLoading: (e: boolean) => void;
}

const ChangeEmailModal = ({isOpen, setLoading, onClose, defaultEmail}: ChangeEmail) => {
  const accountsService = new AccountService();
  const [email, setEmail] : [string, Dispatch<string>] = useState('');
  const [error, setError] : [string, Dispatch<string>] = useState('');

  useEffect(() => {
    setEmail(defaultEmail || '');
  }, [defaultEmail]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const checkIfEmailExists = () => {
    setError('');
    if(email !== defaultEmail) {
      setLoading(true);
      accountsService.getEmail(email).then(() => {
        setLoading(false);
        setError(TEXTS.myAccount.existingEmail);
      }).catch(() => {
        submit();
      });
    }
  };

  const submit = () => {
    accountsService.updateUserData({ email }).then(() => {
      setLoading(false);
      onClose();
    }).catch(() => {
      setLoading(false);
      setError(TEXTS.editEmail.apiError);
    });
  };

  return (
    <EditDataModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={TEXTS.myAccount.changeEmailTitle}
      onSubmit={checkIfEmailExists}
      submitLabel={TEXTS.myAccount.saveNewEmail}
      disabled={!!error}
    >
      <div>
        <TextInput
          label='e-mail'
          value={email}
          name='email'
          required
          onChange={onChangeInput}
          error={error}
        />
      </div>
    </EditDataModal>
  );
};

export default ChangeEmailModal;

