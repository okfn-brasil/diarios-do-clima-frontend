import LinkManager from '../linkManager/LinkManager';
import './HyperLink.scss';

interface PropsHyperLink {
  children: JSX.Element | string;
  sx?: React.CSSProperties;
  link: string;
  classess?: string;
}

const HyperLink = ({ children, link, sx = {}, classess}: PropsHyperLink) => {
  const urlLink = link || '';
  return (
    <LinkManager to={urlLink}>
      <span 
        className={`hover-animation hyper-link ${classess}`}>
          {children}
      </span>
    </LinkManager>
  );
}

export default HyperLink;