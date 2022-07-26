import { GazetteModel } from '@app/models/gazettes.model';
import { TEXTS } from '@app/ui/utils/portal-texts';

import './SearchItem.scss';

interface PropsSearchItem {
  data: GazetteModel;
  key: string;
}

const SearchItem = ({data}: PropsSearchItem) => {
  return (
    <div className='search-item'>
      <div className='search-item-desc' dangerouslySetInnerHTML={{__html: data.excerpt}}></div>
      <div className='search-item-date'>
        {data.date as string} • <span>{data.territory_name}</span>
      </div>
      <a className='hover-animation' target='_blank' href={data.txt_url} rel='noreferrer'>
        <span className='hyper-link'>{TEXTS.searchPage.item.download}</span>
        <div className='arrow-link' ></div>
      </a>
    </div>
  );
};

export default SearchItem;
