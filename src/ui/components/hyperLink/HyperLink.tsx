import { fontButtonDarkBlue, fontRoboto } from '/src/ui/utils/fonts';
import { lightGreen } from '/src/ui/utils/colors';
import { Link } from 'react-router-dom';

interface PropsHyperLink {
  children: JSX.Element | string;
  sx?: React.CSSProperties;
  link: string;
}

const HyperLink = ({ children, link, sx = {}}: PropsHyperLink) => {
  const urlLink = link || '';
  return (
    <Link to={urlLink}>
      <span 
        className='hover-animation'
        style={{
          ...fontButtonDarkBlue,
          ...fontRoboto,
          fontWeight: 700,            
          borderBottomColor: lightGreen,
          borderBottomWidth: '4px',
          borderBottomStyle: 'solid',
          paddingTop: 0,
          paddingBottom: '2px',
          ...sx,
      }}>
          {children}
      </span>
    </Link>
  );
}

export default HyperLink;