import { ButtonBase } from '@mui/material';

import './ButtonGreen.scss';

interface PropsButtonGreen {
  children: JSX.Element | string;
  onClick?: () => void;
  classess?: string;
}

const ButtonGreen = ({ children, onClick, classess }: PropsButtonGreen) => {
  return (
    <ButtonBase className={`base-button button-green font-dark-blue ${classess}`} onClick={onClick}>
      {children}
    </ButtonBase>
  );
};

export default ButtonGreen;