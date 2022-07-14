import { ReportModel } from '@app/models/reports.model';

import './SearchItem.scss';

interface PropsSearchItem {
  data: ReportModel;
  key: string;
}

const SearchItem = ({data}: PropsSearchItem) => {
  return (
    <div className='search-item'>
      <div className='search-item-desc'>{data.description}</div>
      <div className='search-item-date'>
        {data.created_at as string} • <span>{data.location}</span>
      </div>
      <a className='hover-animation' target='_blank' href={data.file} rel="noreferrer">
        <span className='hyper-link'>Baixar diário oficial</span>
        <div className='arrow-link' ></div>
      </a>
    </div>
  );
};

export default SearchItem;
