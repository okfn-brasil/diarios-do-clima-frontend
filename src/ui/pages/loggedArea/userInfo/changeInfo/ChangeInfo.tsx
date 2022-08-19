import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FieldValidation, InputType } from '@app/models/forms.model';
import { UserState } from '@app/models/user.model';
import AccountService from '@app/services/accounts';
import TextInput from '@app/ui/components/forms/input/Input';
import InputError from '@app/ui/components/forms/inputError/inputError';
import SelectInput from '@app/ui/components/forms/select/Select';
import { TEXTS } from '@app/ui/utils/portal-texts';

import EditDataModal from '../editDataModal/EditDataModal';

import './ChangeInfo.scss';

interface UserInfoForm {
  city: string;
  full_name: string;
  gender: string;
  sector: string;
  state: string;
  [key: string]: string;
}

interface UserInfoValidation {
  full_name: string;
  city: string;
  [key: string]: undefined | boolean | Element | string;
}

interface ChangeEmail {
  isOpen: boolean;
  onClose: () => void;
  userData: UserState;
  setLoading: (e: boolean) => void;
}

const fieldValidations: FieldValidation = {
  full_name: (value: string) => { return value && value.length < 8 ? 'O campo deve possuir no mínimo 8 caracteres' : false; },
  city: (value: string) => { return value && value.length < 5  ? 'O campo deve possuir no mínimo 5 caracteres' : false; },
};

const ChangeInfoModal = ({isOpen, setLoading, onClose, userData}: ChangeEmail) => {
  const accountsService = new AccountService();
  const [userInfo, setUserInfo] : [UserInfoForm, Dispatch<SetStateAction<UserInfoForm>>] = useState({} as UserInfoForm);
  const [errors, setErrors] : [UserInfoValidation, Dispatch<SetStateAction<UserInfoValidation>>] = useState({} as UserInfoValidation);
  const [apiError, setApiError] : [string, Dispatch<string>] = useState('');
  useEffect(() => {
    setUserInfo({
      full_name: getUserInfoItem(userData.full_name),
      city: getUserInfoItem(userData.city),
      gender: getUserInfoItem(userData.gender),
      sector: getUserInfoItem(userData.sector),
      state: getUserInfoItem(userData.state),
    });
  }, [userData]);

  const getUserInfoItem = (item: string | undefined | null) => {
    return item || '';
  };

  const onChangeInput = (e: InputType) => {
    setApiError('');
    setErrors({} as UserInfoValidation);
    const {value, name} = e.target;
    setUserInfo((values: UserInfoForm) => ({...values, [name]: value}));
  };

  const onSubmit = () => {
    const errorsArr = [];
    Object.keys(userInfo).forEach(key => {
      const validator = fieldValidations[key] ? fieldValidations[key](userInfo[key]) : false;
      if (validator) {
        errorsArr.push(validator);
      }
      setErrors((values: UserInfoValidation) => ({...values, [key]: validator}));
    });

    if(!errorsArr.length){
      setLoading(true);
      accountsService.updateUserData(userInfo).then(() => {
        setLoading(false);
        onClose();
      }).catch(() => {
        setApiError(TEXTS.myAccount.updateInfoError);
        setLoading(false);
      });
    }
  };

  return (
    <EditDataModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={TEXTS.myAccount.updateInfoTitle}
      onSubmit={onSubmit}
      submitLabel={TEXTS.myAccount.saveInfo}
      disabled={!!errors.full_name || !!errors.city}
    >
      <div className='edit-info-modal'>
        <TextInput
          label={TEXTS.registration.labels.name}
          name='full_name'
          error={errors.full_name}
          value={userInfo.full_name}
          onChange={onChangeInput}
          required={true}
        />

        <SelectInput 
          classes='select-area-class' 
          options={[{value: 'f', label: 'Feminino'},{value: 'm', label: 'Masculino'},{value: 'o', label: 'Outro'}]} 
          label={TEXTS.registration.labels.gender}
          value={userInfo.gender} 
          name='gender' 
          required={true} 
          onChange={onChangeInput}
        />

        <SelectInput 
          classes='select-area-class' 
          options={[{value: 'Area 1', label: 'Area 1'},{value: 'Area 2', label: 'Area 2'},{value: 'Area 3', label: 'Area 3'}]} 
          label={TEXTS.registration.labels.area}
          value={userInfo.sector} 
          name='sector' 
          required={true} 
          onChange={onChangeInput}
        />

        <SelectInput 
          classes='select-area-class' 
          options={TEXTS.stateList.map(state => {return { value: state, label: state };})}
          label={TEXTS.registration.labels.state}
          value={userInfo.state} 
          name='state' 
          required={true} 
          onChange={onChangeInput}
        />

        <TextInput
          classes='city-input'
          label={TEXTS.registration.labels.city}
          name='city'
          error={errors.city}
          value={userInfo.city}
          onChange={onChangeInput}
          required={true}
        />
        <InputError>{apiError}</InputError>
      </div>
    </EditDataModal>
  );
};

export default ChangeInfoModal;
