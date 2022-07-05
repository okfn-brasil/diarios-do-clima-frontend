import { fontButtonDarkBlue, fontRoboto } from '/src/ui/utils/fonts';
import { lightGreen } from '/src/ui/utils/colors';
import LinkManager from '../linkManager/LinkManager';

interface PropsHyperLink {
  children: JSX.Element | string;
  sx?: React.CSSProperties;
  link: string;
}

const HyperLink = ({ children, link, sx = {}}: PropsHyperLink) => {
  const urlLink = link || '';
  return (
    <LinkManager to={urlLink}>
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
    </LinkManager>
  );
}

export default HyperLink;