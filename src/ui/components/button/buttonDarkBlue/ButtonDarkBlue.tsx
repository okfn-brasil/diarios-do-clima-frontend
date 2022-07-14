import { ButtonBase } from '@mui/material';
import './ButtonDarkBlue.scss';

interface PropsButtonDarkBlue {
  children: JSX.Element | string;
  classess?: string;
}

const ButtonDarkBlue = ({ children, sx, classess }: PropsButtonDarkBlue) => {
  return (
    <ButtonBase className={`base-button button-dark-blue font-white-bold ${classess}`}>
      {children}
    </ButtonBase>
  );
}

export default ButtonDarkBlue;