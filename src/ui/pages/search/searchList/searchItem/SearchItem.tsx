import { ReportModel } from '@app/models/reports.model';
import HyperLink from '@app/ui/components/hyperLink/HyperLink';
import { black, darkBlue, gray4 } from '@app/ui/utils/colors';

interface PropsSearchItem {
  data: ReportModel;
  key: string;
}

const SearchItem = ({data}: PropsSearchItem) => {
  return (
    <div style={{marginTop: '24px', padding: '32px 24px', backgroundColor: 'white'}}>
      <span>{data.id}</span>
      <div style={{fontSize: '14px', lineHeight: '16.5px', color: black, whiteSpace: 'pre-wrap'}}>{data.description}</div>
      <div 
        style={{margin: '8px 0 18px', fontSize: '14px', lineHeight: '16.5px', color: gray4}}>
        {data.created_at as string} • <span style={{textDecoration: 'underline'}}>{data.location}</span>
      </div>
      <a className='hover-animation' style={{position: 'relative'}} target='_blank' href={data.file}>
        <HyperLink>Baixar diário oficial</HyperLink>
        <div
          style={{
            position: 'absolute',
            right: '-20px',
            top: '6px',
            width: '0',
            height: '0',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '7px solid ' + darkBlue,
          }}
        ></div>
      </a>
    </div>
    );
}

export default SearchItem;
