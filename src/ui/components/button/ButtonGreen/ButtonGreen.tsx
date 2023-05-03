import { ButtonBase } from '@mui/material';

import './ButtonGreen.scss';

interface PropsButtonGreen {
  children: JSX.Element | string;
  onClick?: () => void;
  classes?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

const ButtonGreen = ({ children, disabled, fullWidth, onClick, classes }: PropsButtonGreen) => {
  return (
    <ButtonBase disabled={disabled} className={`base-button button-green ${classes}`} style={{width: fullWidth ? '100%' : ''}} onClick={onClick}>
      {children}
    </ButtonBase>
  );
};

export default ButtonGreen;