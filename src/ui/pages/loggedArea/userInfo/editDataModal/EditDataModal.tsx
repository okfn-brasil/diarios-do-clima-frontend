import { FormEvent } from 'react';
import SubmitForm from '@app/ui/components/forms/submitForm/SubmitForm';
import Modal from '@app/ui/components/modal/Modal';

import './EditDataModal.scss';

interface EmailModal {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
  onSubmit: () => void;
  submitLabel: string;
  modalTitle: string;
  disabled?: boolean;
}

const EditDataModal = ({isOpen, disabled, modalTitle, submitLabel, onClose, onSubmit, children}: EmailModal) => {
  
  const onInternSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  
  return (
    <Modal
      title={modalTitle}
      isOpen={isOpen} 
      onBack={onClose} 
    >
      <form onSubmit={onInternSubmit} className='user-info-edit-modal edit-form-modal'>
        <div className='form-fields'>
          {children}
        </div>

        <SubmitForm label={submitLabel} disabled={disabled} />
      </form>
    </Modal>
  );
};

export default EditDataModal;
  
  