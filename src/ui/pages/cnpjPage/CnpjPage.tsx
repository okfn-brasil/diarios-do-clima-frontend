import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GazettesService from '@app/services/gazettes';
import { removeSpecialChars } from '@app/ui/utils/functions.utils';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import './CnpjPage.scss';

const CnpjPage = () => {
  const navigate = useNavigate();
  const gazettesService = new GazettesService();
  useEffect(() => {
    const id = '11709051000103'; // TO DO REMOVER MOCK removeSpecialChars(new URLSearchParams(window.location.search).get('id') || '');
    gazettesService.getCnpj(id).then(response => {
      //
    }).catch(() => {
      navigate(urls.notFound.url);
    });
  }, []);

  return (
    <Grid container className='container cnpj-page'>
      
    </Grid>
  );
};

export default CnpjPage;
