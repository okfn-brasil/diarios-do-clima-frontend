import { ButtonBase } from '@mui/material';

import './ButtonDark.scss';

interface PropsButtondark {
  children: JSX.Element | string;
  classes?: string;
  fullWidth?: boolean;
}

const Buttondark = ({ children, classes, fullWidth }: PropsButtondark) => {
  return (
    <ButtonBase className={`base-button button-dark-blue font-white-bold ${classes}`} style={{width: fullWidth ? '100%' : ''}}>
      {children}
    </ButtonBase>
  );
};

export default Buttondark;