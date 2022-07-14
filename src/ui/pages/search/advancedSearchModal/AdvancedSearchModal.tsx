import React from 'react';
import Modal from '@app/ui/components/modal/Modal';

import './AdvancedSearchModal.scss';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvancedSearchModal = ({isOpen, onClose}: AdvancedSearchModalProps) => {

  return (
    <Modal isOpen={isOpen} title='Dicas de busca avançada' onClose={onClose} className='advanced-search-modal'>
      <div></div>
    </Modal>
  );
};

export default AdvancedSearchModal;
