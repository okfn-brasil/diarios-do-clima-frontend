import './SubmitForm.scss';

interface PropsSubmitForm{
  classess?: string;
  label?: string;
  disabled?: boolean;
}

const SubmitForm = ({ label, disabled, classess }: PropsSubmitForm) => {
  return (
    <input 
      className={`submit-form base-button hover-animation ${classess}`}
      disabled={disabled} 
      value={label || 'Continuar'} 
      type='submit'
    />
  );
}

export default SubmitForm;