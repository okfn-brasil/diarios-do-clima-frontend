import { TEXTS } from '@app/ui/utils/portal-texts';

import './SubmitForm.scss';

interface PropsSubmitForm{
  classes?: string;
  label?: string;
  disabled?: boolean;
}

const SubmitForm = ({ label, disabled, classes }: PropsSubmitForm) => {
  return (
    <input 
      className={`submit-form base-button hover-animation ${classes}`}
      disabled={disabled} 
      value={label || TEXTS.defaultSubmitText} 
      type='submit'
    />
  );
};

export default SubmitForm;