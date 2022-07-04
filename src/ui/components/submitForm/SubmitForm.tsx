import { buttonBaseStyle } from '/src/ui/components/button/styles';
import { fontButtonDarkBlue } from '/src/ui/utils/fonts';
import './SubmitForm.scss';
import { lightGreen } from '../../utils/colors';

interface PropsSubmitForm{
  sx?: React.CSSProperties;
  label?: string;
  disabled?: boolean;
}

const SubmitForm = ({ sx, label, disabled }: PropsSubmitForm) => {
  return (
    <input 
    className='submit-form hover-animation' 
    disabled={disabled} 
    value={label || 'Continuar'} 
    type='submit' 
    style={{
      ...buttonBaseStyle,
      ...fontButtonDarkBlue,
      backgroundColor: lightGreen,
      fontWeight: '500px',
      width: '100%',
      marginTop: '32px',
      border: '0',
      transition: 'none',
      ...sx,
    }}/>
  );
}

export default SubmitForm;