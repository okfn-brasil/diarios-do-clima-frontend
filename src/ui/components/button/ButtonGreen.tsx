import { ButtonBase } from "@mui/material";
import { lightGreen } from "../../utils/colors";
import { buttonBaseStyle } from './styles';
import { fontButtonDarkBlue } from '/src/ui/utils/fonts';

interface PropsButtonGreen {
  children: JSX.Element | string;
  sx?: React.CSSProperties;
}

const ButtonGreen = ({ children, sx }: PropsButtonGreen) => {
  return (
    <ButtonBase style={{
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