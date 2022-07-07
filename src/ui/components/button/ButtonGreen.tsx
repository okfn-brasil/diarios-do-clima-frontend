import { ButtonBase } from "@mui/material";
import { lightGreen } from "@app/ui/utils/colors";
import { buttonBaseStyle } from './styles';
import { fontButtonDarkBlue } from '@app/ui/utils/fonts';

interface PropsButtonGreen {
  children: JSX.Element | string;
  sx?: React.CSSProperties;
  onClick?: any;
}

const ButtonGreen = ({ children, sx, onClick }: PropsButtonGreen) => {
  return (
    <ButtonBase onClick={onClick} style={{
      ...buttonBaseStyle,
      ...fontButtonDarkBlue,
      fontWeight: 600,
      backgroundColor: lightGreen,
      ...sx,
    }}>
      {children}
    </ButtonBase>
  );
}

export default ButtonGreen;