import React from 'react';
import Modal from '@app/ui/components/modal/Modal';

import './AdvancedSearchModal.scss';
import { TEXTS } from '@app/ui/utils/portal-texts';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const items = TEXTS.searchPage.advancedSearch;

const AdvancedSearchModal = ({isOpen, onClose}: AdvancedSearchModalProps) => {

  return (
    <Modal isOpen={isOpen} title='Dicas de busca avançada' onClose={onClose} className='advanced-search-modal'>
      <div className='advanced-search-modal-content'>
        <div className='general-info'>
          {TEXTS.searchPage.advancedSearchTitle}
        </div>
        <div>
          {items.map(item => 
            <div key={item.title} className='advanced-item'>
              <div className='advanced-item-title paragraph-class'>{item.title}</div>
              <div className='advanced-item-desc small-text'>{item.desc || 'Explicação de quando utilizar'} </div>
              <div className='advanced-item-ex small-text'>Ex: {item.ex}</div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AdvancedSearchModal;
