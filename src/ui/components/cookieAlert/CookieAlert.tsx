import { MouseEventHandler } from 'react';
import { TEXTS } from '@app/ui/utils/portal-texts';
import CloseIcon from '@mui/icons-material/Close';

import './CookieAlert.scss';

interface PropsCookieAlert {
  onClick: MouseEventHandler<SVGSVGElement>;
}

const CookieAlert = ({ onClick }: PropsCookieAlert) => {

  return (
    <div className='cookie-alert'>
      <span>
        {TEXTS.cookieAlert.text}
      </span>
      <CloseIcon onClick={onClick} className='hover-animation close-icon'/>
    </div>
  );
};

export default CookieAlert;
