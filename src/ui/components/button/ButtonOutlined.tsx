import { ButtonBase } from "@mui/material";
import { buttonBaseStyle } from './styles';
import { fontButtonWhite } from '/src/ui/utils/fonts';

interface PropsButtonOutlined {
  children: JSX.Element | string;
  sx?: React.CSSProperties;
  onClick?: any;
}

const ButtonOutlined = ({ children, sx, onClick }: PropsButtonOutlined) => {
  return (
    <ButtonBase onClick={onClick} style={{
      ...buttonBaseStyle,
      ...fontButtonWhite,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgba(172, 181, 189, 1)',
      fontWeight: 600,
      borderWidth: '1px',
      borderStyle: 'solid',
      ...sx,
    }}>
      {children}
    </ButtonBase>
  );
}

export default ButtonOutlined;