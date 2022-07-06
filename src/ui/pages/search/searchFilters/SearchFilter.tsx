import { Grid } from '@mui/material';
import './SearchFilters.scss';

interface PropsSearchFilters{
  onClose?: any;
}

const SearchFilters = ({onClose}: PropsSearchFilters) => {
  return (
    <Grid onClick={onClose} item className='container search-filter' sm={12} style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
      test
    </Grid>
  );
}

export default SearchFilters;
