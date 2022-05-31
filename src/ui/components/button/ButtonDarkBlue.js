import { ButtonBase } from "@mui/material";
import { buttonBaseStyle } from './styles';
import { fontButtonWhite } from '../../fonts';

function ButtonDarkBlue({ children, sx }) {
    return (
        <ButtonBase style={{
            ...fontButtonWhite,
            ...buttonBaseStyle,
            backgroundColor: 'rgba(23, 32, 48, 1)',
            fontWeight: '500px',
            ...sx,
        }}>
            {children}
        </ButtonBase>
    );
}

export default ButtonDarkBlue;