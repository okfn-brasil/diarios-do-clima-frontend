import BackIcon from '@app/assets/images/icons/back-arrow.svg';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';

import ProFlag from '@app/ui/components/proFlag/ProFlag';

import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  children: JSX.Element;
  onClose?: () => void;
  onBack?: () => void;
  className?: string;
  title?: string;
  showFlag?: boolean;
}

const Modal = ({isOpen, className, children, showFlag, onBack, onClose, title}: ModalProps) => {

  return (
    <>
      {isOpen ? 
        <div className={`shadow-modal ${className}`}>
          <div className='modal-container'>
            {onClose? <div>
              <Grid container alignItems='center' className='modal-header'>
                <CloseIcon className='hover-animation close-icon' onClick={onClose} />
                <div className='modal-title h3-class'>{title}<ProFlag show={!!showFlag} margin={12} spaceBottom={4}/></div>
              </Grid>
            </div>: <></>}

            {onBack? <div>
              <Grid container alignItems='center' className='modal-header'>
                <img className='hover-animation back-icon' src={BackIcon} onClick={onBack} />
                <div className='modal-title h3-class'>{title}<ProFlag show={!!showFlag} margin={12} spaceBottom={4}/></div>
              </Grid>
            </div>: <></>}
            {children}
          </div>
        </div> :
        <></>
      }
    </>
  );
};

export default Modal;
