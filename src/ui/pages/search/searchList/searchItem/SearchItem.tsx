import { GazetteModel } from '@app/models/gazettes.model';

import './SearchItem.scss';

interface PropsSearchItem {
  data: GazetteModel;
  key: string;
}

const SearchItem = ({data}: PropsSearchItem) => {
  return (
    <div className='search-item'>
      <div className='search-item-desc' dangerouslySetInnerHTML={{__html: data.text}}></div>
      <div className='search-item-date'>
        {data.date as string} • <span>{data.territory_name}</span>
      </div>
      <a className='hover-animation' target='_blank' href={data.file_raw_txt} rel='noreferrer'>
        <span className='hyper-link'>Baixar diário oficial</span>
        <div className='arrow-link' ></div>
      </a>
    </div>
  );
};

export default SearchItem;
