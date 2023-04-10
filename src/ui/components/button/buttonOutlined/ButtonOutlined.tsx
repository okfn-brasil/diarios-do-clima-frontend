import { ButtonBase } from '@mui/material';

import './ButtonOutlined.scss';

interface PropsButtonOutlined {
  children: JSX.Element | string;
  onClick?: () => void;
  classes?: string;
  fullWidth?: boolean;
}

const ButtonOutlined = ({ children, onClick, classes, fullWidth }: PropsButtonOutlined) => {
  return (
    <ButtonBase className={`base-button button-outlined hover-animation ${classes}`} style={{width: fullWidth ? '100%' : ''}} onClick={onClick}>
      {children}
    </ButtonBase>
  );
};

export default ButtonOutlined;