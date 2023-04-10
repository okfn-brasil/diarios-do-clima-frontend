import LinkManager from '@app/ui/components/linkManager/LinkManager';

interface PropsHyperLink {
  children: JSX.Element | string;
  link: string;
  classes?: string;
}

const HyperLink = ({ children, link, classes}: PropsHyperLink) => {
  const urlLink = link || '';
  return (
    <LinkManager to={urlLink}>
      <span 
        className={`hover-animation hyper-link ${classes}`}>
        {children}
      </span>
    </LinkManager>
  );
};

export default HyperLink;