import LinkManager from '../linkManager/LinkManager';

interface PropsHyperLink {
  children: JSX.Element | string;
  link: string;
  classess?: string;
}

const HyperLink = ({ children, link, classess}: PropsHyperLink) => {
  const urlLink = link || '';
  return (
    <LinkManager to={urlLink}>
      <span 
        className={`hover-animation hyper-link ${classess}`}>
        {children}
      </span>
    </LinkManager>
  );
};

export default HyperLink;