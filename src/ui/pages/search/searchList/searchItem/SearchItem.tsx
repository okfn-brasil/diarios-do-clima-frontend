import { Dispatch, useState } from 'react';
import { GazetteModel } from '@app/models/gazettes.model';
import { TEXTS } from '@app/ui/utils/portal-texts';

import './SearchItem.scss';

interface PropsSearchItem {
  data: GazetteModel;
  key: string;
}

const SearchItem = ({data}: PropsSearchItem) => {
  const [isShowingTooltip, setVisibilityTooltip] : [boolean, Dispatch<boolean>] = useState(false);

  const showTooltip = () => {
    setVisibilityTooltip(true);
    setTimeout(() => {
      document.getElementById('txt-link')?.focus();
    }, 150);
  };

  const hideTooltip = () => {
    setTimeout(() => {
      setVisibilityTooltip(false);
    }, 150);
  };

  return (
    <div className='search-item'>
      <div className='search-item-desc' dangerouslySetInnerHTML={{__html: data.excerpt}}></div>
      <div className='search-item-date'>
        {data.date as string} • <span>{data.territory_name}</span>
      </div>
      <span className='hover-animation download-link'>
        <span onClick={showTooltip} className='hyper-link'>{TEXTS.searchPage.item.download}</span>
        <div onClick={showTooltip} className='arrow-link' ></div>

        { isShowingTooltip ? 
          <div className='tooltip' onMouseLeave={hideTooltip}>
            <a target='_blank' id='txt-link' href={data.txt_url} onBlur={hideTooltip} rel='noreferrer'><div className='tooltip-link'>.TXT</div></a>
            <a target='_blank' href={data.url} rel='noreferrer'><div className='tooltip-link'>.PDF</div></a>
          </div> 
          : <></> }
      </span>
    </div>
  );
};

export default SearchItem;
