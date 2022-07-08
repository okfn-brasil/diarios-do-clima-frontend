import { ButtonBase } from "@mui/material";
import './ButtonGreen.scss';

interface PropsButtonGreen {
  children: JSX.Element | string;
  sx?: React.CSSProperties;
  onClick?: () => void;
  classess?: string;
}

const ButtonGreen = ({ children, sx, onClick, classess }: PropsButtonGreen) => {
  return (
    <ButtonBase className={`base-button button-green font-dark-blue ${classess}`} sx={sx} onClick={onClick}>
      {children}
    </ButtonBase>
  );
}

export default ButtonGreen;