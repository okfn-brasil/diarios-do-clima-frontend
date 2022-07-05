import { Dispatch, SetStateAction, useState } from "react";
import { gray2, gray5 } from "/src/ui/utils/colors";

interface FAQItemProps {
  title: string;
  children?: JSX.Element | string;
}

const FAQItem = ({title, children}: FAQItemProps) => {
  const [isOpen, setOpen] : [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);


  return (
    <div style={{padding: '32px 0', borderBottom: '1px solid '+ gray2, cursor: 'pointer'}} onClick={()=> setOpen(!isOpen)}>
      <div className='hover-animation' style={{fontSize: '16px', lineHeight: '19px', fontWeight: 600}}>{title}</div>
      <div style={{fontSize: '18px', lineHeight: '22px', margin: isOpen ? '8px 0 0' : '0', color: gray5, transition: '0.1s', overflow: 'hidden', maxHeight: isOpen ? '100vh' : 0}}>
        {children}
      </div>
    </div>
  );
}

export default FAQItem;