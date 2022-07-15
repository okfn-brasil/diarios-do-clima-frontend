import React from 'react';
import Modal from '@app/ui/components/modal/Modal';

import './AdvancedSearchModal.scss';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const items = [
  {
    title: '+ significa operação E',
    desc: 'Utilize + quando os resultados devem conter ambos os termos',
    ex: 'crédito + cartão',
  },
  {
    title: '| significa operação OU',
    desc: 'Utilize | quando os resultados devem conter pelo menos um dos termos',
    ex: 'débito | crédito',
  },
  {
    title: '- nega um único token',
    desc: 'Explicação de quando utilizar',
    ex: '',
  },
  {
    title: '" envolve um número de tokens para significar uma frase para pesquisa',
    desc: 'Explicação de quando utilizar',
    ex: '',
  },
  {
    title: '* no final de um termo significa uma consulta de prefixo',
    desc: '',
    ex: '',
  },
  {
    title: '~N depois de uma palavra significa editar a distância (indefinição)',
    desc: '',
    ex: '',
  },
  {
    title: '~N depois de uma frase significa quantidade de despejo',
    desc: '',
    ex: '',
  },
  {
    title: '* no final de um termo significa uma consulta de prefixo',
    desc: '',
    ex: '',
  },
];

const AdvancedSearchModal = ({isOpen, onClose}: AdvancedSearchModalProps) => {

  return (
    <Modal isOpen={isOpen} title='Dicas de busca avançada' onClose={onClose} className='advanced-search-modal'>
      <div className='advanced-search-modal-content'>
        <div className='general-info'>
          Para usar um desses caracteres literalmente, escape-o com uma barra invertida (\).
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
