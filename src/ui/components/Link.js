import { fontButtonDarkBlue } from '../fonts';

function Link({ children, }) {
    return (
        <span style={{
            ...fontButtonDarkBlue,
            borderBottomColor: 'rgba(127, 227, 137, 1)',
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