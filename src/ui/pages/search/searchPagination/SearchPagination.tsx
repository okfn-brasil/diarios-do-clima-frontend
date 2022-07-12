import { Grid } from '@mui/material';
import './SearchPagination.scss';

interface Pagination {
  onChangePage: (e: number) => void;
  listSize: number;
  itemsPerPage: number;
  currentPage: number;
}

const SearchPagination = ({onChangePage, currentPage, listSize, itemsPerPage}: Pagination) => {

  const pages = () => {
    var pageNumbers = [];
    if(listSize/itemsPerPage < 5) {
      for (var i = 0;  i < listSize/itemsPerPage && pageNumbers.length < 5; i++) {
        pageNumbers.push(getPage(i));
      }
    } else if(currentPage < listSize - 3){
      [currentPage, currentPage + 1, null, listSize - 2, listSize - 1].forEach((i) => pageNumbers.push(getPage(i)));
    } else {
      [ 0, null, listSize - 3, listSize - 2, listSize - 1].forEach((i) => pageNumbers.push(getPage(i)));
    }
    return pageNumbers;
  }

  const getPage = (i: number | null) => {
    const isCurrentPage = i === currentPage;
    const currentClass = isCurrentPage ? 'page-number-current-class' : 'page-number-class';
    return (
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
    )
  }

  const nextPage = () => {
    if(currentPage < ((listSize / itemsPerPage) - 1)) {
      onChangePage(currentPage + 1);
    }
  }

  const previousPage = () => {
    if(currentPage) {
      onChangePage(currentPage - 1);
    }
  }

  return (
    <>
      {listSize ?
        <div className='pagination'>
        <Grid container justifyContent='center'>
          <Grid  sm={8} item container justifyContent='center'>
            <Grid className='pagination-container' alignItems='center' container justifyContent='space-between'>
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
        </Grid>
      </div>  
      :<></>
      }
    </> 
   
  );
}

export default SearchPagination;

