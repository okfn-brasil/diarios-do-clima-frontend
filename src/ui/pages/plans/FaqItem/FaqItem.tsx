import { Dispatch, SetStateAction, useState } from 'react';
import './FaqItem.scss';

interface FAQItemProps {
  title: string;
  children?: JSX.Element | string;
}

const FAQItem = ({title, children}: FAQItemProps) => {
  const [isOpen, setOpen] : [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);


  return (
    <div className='faq-item' onClick={()=> setOpen(!isOpen)}>
      <div className='hover-animation faq-item-title'>{title}</div>
      <div className={`faq-content ${isOpen ? 'faq-open' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default FAQItem;