import { ButtonBase } from '@mui/material';

import './ButtonDark.scss';

interface PropsButtondark {
  children: JSX.Element | string;
  classess?: string;
  fullWidth?: boolean;
}

const Buttondark = ({ children, classess, fullWidth }: PropsButtondark) => {
  return (
    <ButtonBase className={`base-button button-dark-blue font-white-bold ${classess}`} style={{width: fullWidth ? '100%' : ''}}>
      {children}
    </ButtonBase>
  );
};

export default Buttondark;