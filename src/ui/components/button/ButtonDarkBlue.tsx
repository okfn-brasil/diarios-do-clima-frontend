import { ButtonBase } from "@mui/material";
import { buttonBaseStyle } from './styles';
import { fontButtonWhite } from '@app/ui/utils/fonts';

interface PropsButtonDarkBlue {
  children: JSX.Element | string;
  sx?: React.CSSProperties;
}

const ButtonDarkBlue = ({ children, sx }: PropsButtonDarkBlue) => {
  return (
    <ButtonBase style={{
      ...fontButtonWhite,
      ...buttonBaseStyle,
      fontWeight: 600,
      backgroundColor: 'rgba(23, 32, 48, 1)',
      ...sx,
    }}>
      {children}
    </ButtonBase>
  );
}

export default ButtonDarkBlue;