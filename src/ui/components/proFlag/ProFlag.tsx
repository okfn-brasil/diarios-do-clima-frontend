import { Link } from 'react-router-dom';
import { urls } from '@app/ui/utils/urls';

import './ProFlag.scss';

interface ProFlagProps {
  spaceBottom?: number;
  margin?: number;
  show: boolean;
}

const ProFlag = ({spaceBottom, show, margin = 8}: ProFlagProps) => {
  return (
    <>
      {show ? <Link to={urls.becomePro.url}><div className='pro-flag' style={{marginLeft: margin, transform: `translateY(-${spaceBottom}px)`}}>Pro</div></Link> : <></>}
    </>
  );
};

export default ProFlag;