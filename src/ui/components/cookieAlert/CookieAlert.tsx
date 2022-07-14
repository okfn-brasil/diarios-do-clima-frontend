import { MouseEventHandler } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import './CookieAlert.scss';

interface PropsCookieAlert {
  onClick: MouseEventHandler<SVGSVGElement>;
}

const CookieAlert = ({ onClick }: PropsCookieAlert) => {

  return (
    <div className='cookie-alert'>
      <span>
        Nós utilizamos cookies essenciais para o site funcionar e alguns adicionais para entender como você utiliza o Diário do Clima. Mais detalhes nos Termos.
      </span>
      <CloseIcon onClick={onClick} className='hover-animation close-icon'/>
    </div>
  );
};

export default CookieAlert;
