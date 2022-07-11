import { ButtonBase } from "@mui/material";
import './ButtonOutlined.scss'

interface PropsButtonOutlined {
  children: JSX.Element | string;
  sx?: React.CSSProperties;
  onClick?: () => void;
  classess?: string;
}

const ButtonOutlined = ({ children, sx, onClick, classess }: PropsButtonOutlined) => {
  return (
    <ButtonBase className={`base-button button-outlined hover-animation ${classess}`} sx={sx} onClick={onClick}>
      {children}
    </ButtonBase>
  );
}

export default ButtonOutlined;