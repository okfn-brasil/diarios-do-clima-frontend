import { Dispatch, SetStateAction, useState } from 'react';
import selectArrow from '@app/assets/images/icons/arrow-down.svg';
import { CNPJPartner } from '@app/models/cnpj.model';

interface PartnerModel {
  name: string;
  data : CNPJPartner;
}

const Partner = ({data, name}: PartnerModel) => {
  const [isOpen, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  return (
    <>
      {data ?
        <div className='info-item partner-info'>
          <div className='partner-name hover-animation' onClick={() => setOpen(!isOpen)}>
            <img className={isOpen ? 'open-partner-img' : ''} src={selectArrow} alt='seta'/>
            {name}
          </div>
          { isOpen ? 
            <div className='partner-infos-items'>
              {Object.keys(data).map(key => {
                if(data[key]) {
                  return (
                    <div className='partner-info-item'>
                      <div className='info-name'>{key}</div>
                      <div className='info-text'>{data[key]}</div>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
            </div>
            :
            <></>
          }
        </div>
        : 
        <></>
      }
    </>
  );
};

export default Partner;