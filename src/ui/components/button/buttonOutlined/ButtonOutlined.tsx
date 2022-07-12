import { ButtonBase } from '@mui/material';
import './ButtonOutlined.scss'

interface PropsButtonOutlined {
  children: JSX.Element | string;
  onClick?: () => void;
  classess?: string;
}

const ButtonOutlined = ({ children, sx, onClick, classess }: PropsButtonOutlined) => {
  return (
    <ButtonBase className={`base-button button-outlined hover-animation ${classess}`} onClick={onClick}>
      {children}
    </ButtonBase>
  );
}

export default ButtonOutlined;