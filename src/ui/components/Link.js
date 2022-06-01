import { fontButtonDarkBlue } from '../fonts';
import { lightGreen } from '../colors';

function Link({ children, }) {
    return (
        <span style={{
            ...fontButtonDarkBlue,
            borderBottomColor: lightGreen,
            borderBottomWidth: '4px',
            borderBottomStyle: 'solid',
            paddingTop: 0,
            paddingBottom: '2px',
        }}>
            {children}
        </span>
    );
}

export default Link;