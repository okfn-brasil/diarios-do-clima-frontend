import { ButtonBase } from "@mui/material";
import { buttonBaseStyle } from './styles';
import { fontButtonDarkBlue } from '../../fonts';

function ButtonGreen({ children, sx }) {
    return (
        <ButtonBase style={{
            ...buttonBaseStyle,
            ...fontButtonDarkBlue,
            backgroundColor: 'rgba(127, 227, 137, 1)',
            fontWeight: '500px',
            ...sx,
        }}>
            {children}
        </ButtonBase>
    );
}

export default ButtonGreen;