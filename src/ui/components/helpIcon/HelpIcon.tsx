import icon from '@app/assets/images/icons/help.svg';

import './HelpIcon.scss';

interface HelpIconProps {
  tooltip: string | React.ReactElement<any>;
}

const HelpIcon = ({tooltip}: HelpIconProps) => {
  return (
    <span className='help-icon-area'>        
      <img 
        className='help-icon hover-animation'
        src={icon} 
        alt='icone - ajuda'
      />
      {tooltip ?
        <div className='tooltip'>
          {tooltip}
        </div>
        : <></>
      }
    </span>
  );
};
export default HelpIcon;