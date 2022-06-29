import { ButtonBase } from "@mui/material";
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
            backgroundColor: 'rgba(127, 227, 137, 1)',
            ...sx,
        }}>
            {children}
        </ButtonBase>
    );
}

export default ButtonGreen;