import { Dispatch, SetStateAction, useState } from 'react';
import selectArrow from '@app/assets/images/icons/arrow-down.svg';

interface PartnerModel {
  name: string;
  data : {
    'Identificador': string;
    'Data de entrada da sociedade': string;
    'Nome do representante legal': string;
    'CNPJ do sócio': string;
    'Código do país (sócio estrangeiro)': string;
    'Código de qualificação do representante legal': string;
    'Código de qualificação do sócio': string;
    'Número de CPF do representante legal': string;
    'Faixa etária': string;
    [key: string]: string;
  }
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
              {Object.keys(data).map(key => 
                <div className='partner-info-item'>
                  <div className='info-name'>{key}</div>
                  <div className='info-text'>{data[key]}</div>
                </div>
              )}
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