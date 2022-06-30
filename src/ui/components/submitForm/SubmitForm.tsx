import { buttonBaseStyle } from '/src/ui/components/button/styles';
import { fontButtonDarkBlue } from '/src/ui/utils/fonts';
import './SubmitForm.scss';

interface PropsSubmitForm{
  sx?: React.CSSProperties;
  label?: string;
  disabled?: boolean;
}

const SubmitForm = ({ sx, label, disabled }: PropsSubmitForm) => {
    return (
        <input disabled={disabled} value={label || 'Continuar'} type='submit' className='hover-animation' style={{
            ...buttonBaseStyle,
            ...fontButtonDarkBlue,
            backgroundColor: 'rgba(127, 227, 137, 1)',
            fontWeight: '500px',
            width: '100%',
            marginTop: '32px',
            border: '0',
            ...sx,
        }}/>
    );
}

export default SubmitForm;