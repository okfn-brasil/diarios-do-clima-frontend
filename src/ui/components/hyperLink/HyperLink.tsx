import { fontButtonDarkBlue, fontRoboto } from '@app/ui/utils/fonts';
import { lightGreen } from '@app/ui/utils/colors';
import LinkManager from '../linkManager/LinkManager';
import { hyperLinkStyle } from './hyperLinkStyle';

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
          ...hyperLinkStyle,
          ...sx,
      }}>
          {children}
      </span>
    </LinkManager>
  );
}

export default HyperLink;