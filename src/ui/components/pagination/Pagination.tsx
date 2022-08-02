import { Grid } from '@mui/material';

import './Pagination.scss';

interface Pagination {
  onChangePage: (e: number) => void;
  listSize: number;
  itemsPerPage: number;
  currentPage: number;
}

const Pagination = ({onChangePage, currentPage, listSize, itemsPerPage}: Pagination) => {

  const pages = () => {
    const pageNumbers = [];
    const pagesSize = Math.ceil(listSize/itemsPerPage);
    if(pagesSize < 5) {
      for (let i = 0;  i < pagesSize && pageNumbers.length < 5; i++) {
        pageNumbers.push(getPage(i));
      }
    } else if( pagesSize >= 5 && currentPage < pagesSize - 3) {
      [ 
        currentPage > 1 ? 0 : undefined,
        currentPage > 1 ? null : undefined,
        currentPage > 0 ? currentPage - 1 : undefined,
        currentPage,
        currentPage + 1,
        null,
        pagesSize - 1
      ].forEach((i) => pageNumbers.push(getPage(i)));
    } else if (currentPage >= pagesSize - 3){
      [ 
        0,
        null,
        pagesSize - 4,
        pagesSize - 3,
        pagesSize - 2,
        pagesSize - 1,
      ].forEach((i) => pageNumbers.push(getPage(i)));
    }
    return pageNumbers;
  };

  const getPage = (i: number | null | undefined) => {
    const isCurrentPage = i === currentPage;
    const currentClass = isCurrentPage ? 'page-number-current-class' : 'page-number-class';
    return ( i !== undefined ? 
      <span key={i !== null ? i : 'x'}>
        {i !== null ? 
          <span 
            className={`hover-animation ${currentClass}`}
            onClick={() => onChangePage(i)}
          >
            {i + 1}
          </span>
          :
          <span className={currentClass}>...</span>
        }
      </span>
      : <span key={Math.random()}></span>
    );
  };

  const nextPage = () => {
    if(currentPage < ((listSize / itemsPerPage) - 1)) {
      onChangePage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if(currentPage) {
      onChangePage(currentPage - 1);
    }
  };

  return (
    <>
      {listSize  && listSize > 6?
        <div className='pagination'>
          <Grid>
            <Grid className='pagination-container' justifyContent='center' alignItems='center' container>
              <div 
                className={currentPage ? 'arrow-area-class' : 'arrow-area-disabled-class'} 
                onClick={previousPage}
              >
                <div className={'left-arrow ' + (currentPage ? 'arrow-class' : 'arrow-disabled-class')} >
                </div>
              </div>
              {pages()}
              <div 
                className={currentPage < ((listSize / itemsPerPage) - 1) ? 'arrow-area-class' : 'arrow-area-disabled-class'} 
                onClick={nextPage}
              >
                <div className={currentPage < ((listSize / itemsPerPage) - 1) ? 'arrow-class' : 'arrow-disabled-class'} >
                </div>
              </div>
            </Grid>
          </Grid>
        </div>  
        :<></>
      }
    </>
  );
};

export default Pagination;

