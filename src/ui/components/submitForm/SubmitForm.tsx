import './SubmitForm.scss';

interface PropsSubmitForm{
  sx?: React.CSSProperties;
  classess?: string;
  label?: string;
  disabled?: boolean;
}

const SubmitForm = ({ sx, label, disabled, classess }: PropsSubmitForm) => {
  return (
    <input 
    className={`submit-form base-button hover-animation ${classess}`}
    disabled={disabled} 
    value={label || 'Continuar'} 
    type='submit' 
    style={sx}/>
  );
}

export default SubmitForm;