import { ButtonBase } from '@mui/material';

import './ButtonGreen.scss';

interface PropsButtonGreen {
  children: JSX.Element | string;
  onClick?: () => void;
  classess?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

const ButtonGreen = ({ children, disabled, fullWidth, onClick, classess }: PropsButtonGreen) => {
  return (
    <ButtonBase disabled={disabled} className={`base-button button-green font-dark-blue ${classess}`} style={{width: fullWidth ? '100%' : ''}} onClick={onClick}>
      {children}
    </ButtonBase>
  );
};

export default ButtonGreen;