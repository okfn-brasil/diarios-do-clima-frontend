import { ButtonBase } from '@mui/material';

import './ButtonOutlined.scss';

interface PropsButtonOutlined {
  children: JSX.Element | string;
  onClick?: () => void;
  classess?: string;
  fullWidth?: boolean;
}

const ButtonOutlined = ({ children, onClick, classess, fullWidth }: PropsButtonOutlined) => {
  return (
    <ButtonBase className={`base-button button-outlined hover-animation ${classess}`} style={{width: fullWidth ? '100%' : ''}} onClick={onClick}>
      {children}
    </ButtonBase>
  );
};

export default ButtonOutlined;