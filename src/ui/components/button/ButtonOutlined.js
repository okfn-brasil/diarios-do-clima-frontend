import { ButtonBase } from "@mui/material";
import { buttonBaseStyle } from './styles';
import { fontButtonWhite } from '../../fonts';

function ButtonOutlined({ children, sx }) {
    return (
        <ButtonBase style={{
            ...buttonBaseStyle,
            ...fontButtonWhite,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            fontWeight: '500px',
            borderColor: 'rgba(172, 181, 189, 1)',
            borderWidth: '1px',
            borderStyle: 'solid',
            ...sx,
        }}>
            {children}
        </ButtonBase>
    );
}

export default ButtonOutlined;