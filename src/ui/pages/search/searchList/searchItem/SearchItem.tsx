import { ReportModel } from '@app/models/reports.model';
import HyperLink from '@app/ui/components/hyperLink/HyperLink';
import './SearchItem.scss';

interface PropsSearchItem {
  data: ReportModel;
  key: string;
}

const SearchItem = ({data}: PropsSearchItem) => {
  return (
    <div className='search-item'>
      <span>{data.id}</span>
      <div className='search-item-desc'>{data.description}</div>
      <div className='search-item-date'>
        {data.created_at as string} • <span>{data.location}</span>
      </div>
      <a className='hover-animation' target='_blank' href={data.file}>
        <HyperLink link=''>Baixar diário oficial</HyperLink>
        <div className='arrow-link' ></div>
      </a>
    </div>
    );
}

export default SearchItem;
