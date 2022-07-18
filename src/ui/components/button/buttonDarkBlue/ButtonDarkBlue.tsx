import { ButtonBase } from '@mui/material';

import './ButtonDarkBlue.scss';

interface PropsButtonDarkBlue {
  children: JSX.Element | string;
  classess?: string;
  fullWidth?: boolean;
}

const ButtonDarkBlue = ({ children, classess, fullWidth }: PropsButtonDarkBlue) => {
  return (
    <ButtonBase className={`base-button button-dark-blue font-white-bold ${classess}`} style={{width: fullWidth ? '100%' : ''}}>
      {children}
    </ButtonBase>
  );
};

export default ButtonDarkBlue;