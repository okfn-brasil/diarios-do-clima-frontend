import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GazettesService from '@app/services/gazettes';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import './CnpjPage.scss';

const CnpjPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const gazettesService = new GazettesService();

  useEffect(() => {
    gazettesService.getCnpj(params.id as string).then(() => {
      //
    }).catch(() => {
      navigate(urls.notFound.url);
    });
  }, [params]);

  return (
    <Grid container className='container cnpj-page'>
      
    </Grid>
  );
};

export default CnpjPage;
