import icon from '@app/assets/images/icons/help.svg';
import './HelpIcon.scss';

const HelpIcon = () => {
  return (
    <span className='hover-animation'>        
      <img 
        className='help-icon'
        src={icon} 
        alt='icone - ajuda'
      />
    </span>
  );
};
export default HelpIcon;