import { Grid } from "@mui/material";
import { darkBlue, gray, gray2, gray5, lightGreen } from "/src/ui/utils/colors";

interface Pagination {
  onChangePage: any;
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
    const pageStyle: React.CSSProperties = {
      ...pageNumberStyle,
      backgroundColor: isCurrentPage ? lightGreen : '',
      border: isCurrentPage ? '1px solid ' + lightGreen : '1px solid transparent',
      color: isCurrentPage ? darkBlue : gray5,
    };
    return (
      <span key={i !== null ? i : 'x'}>
      {i !== null ? 
        <span 
          style={pageStyle}
          className='hover-animation'
          onClick={() => onChangePage(i)}
        >
            {i + 1}
        </span>
        :
        <span style={pageStyle}>...</span>
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
        <div style={{position: 'relative', marginTop: '24px'}}>
        <Grid container justifyContent='center'>
          <Grid  sm={8} item container justifyContent='center'>
            <Grid sx={{width: '280px'}} alignItems='center' container justifyContent='space-between'>
              <div 
                style={{
                  ...currentPage ? arrowAreaStyle : arrowAreaDisabledStyle,
                }} 
                onClick={previousPage}
              >
                <div
                  style={{
                    ...currentPage ? arrowStyle : arrowDisabledStyle,
                    transform: 'rotate(135deg)',
                    marginLeft: '0',
                  }}
                >
                </div>
              </div>
              {pages()}
              <div 
                style={{
                  ...currentPage < ((listSize / itemsPerPage) - 1) ? arrowAreaStyle : arrowAreaDisabledStyle
                }} 
                onClick={nextPage}
              >
                <div style={{...currentPage < ((listSize / itemsPerPage) - 1) ? arrowStyle : arrowDisabledStyle}}>
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

const arrowAreaStyle: React.CSSProperties = {
  border: '1px solid ' + gray,
  width: '32px',
  height: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  borderColor: gray,
}

const arrowAreaDisabledStyle: React.CSSProperties = {
  ...arrowAreaStyle,
  backgroundColor: gray2,
  borderColor: gray2,
  cursor: 'not-allowed',
}

const arrowStyle: React.CSSProperties = {
  border: 'solid ' + gray5,
  borderWidth: '0 3px 3px 0',
  marginLeft: '-4px',
  padding: '3px',
  transform: 'rotate(-45deg)'
}

const arrowDisabledStyle: React.CSSProperties = {
  ...arrowStyle,
  opacity: 0.3,
}

const pageNumberStyle: React.CSSProperties = {
  width: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '32px',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '20px',
}