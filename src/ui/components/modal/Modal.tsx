import { Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Modal.scss';
import ProFlag from '../proFlag/ProFlag';

interface ModalProps {
  isOpen: boolean;
  children: JSX.Element;
  onClose?: () => void;
  className?: string;
  title?: string;
  showFlag?: boolean;
}

const Modal = ({isOpen, className, children, showFlag, onClose, title}: ModalProps) => {

  const onClickClose = () => {
    if (onClose) {
      onClose();
    }
  }

  return (
    <>
      {isOpen ? 
        <div className={`shadow-modal ${className}`}>
          <div className='modal-container'>
            {onClose? <div>
              <Grid container alignItems='center' className='modal-header'>
                <CloseIcon className='hover-animation close-icon' onClick={onClickClose} />
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
}

export default Modal;
