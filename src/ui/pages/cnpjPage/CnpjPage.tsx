import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GazettesService from '@app/services/gazettes';
import ButtonDarkBlue from '@app/ui/components/button/buttonDarkBlue/ButtonDarkBlue';
import Loading from '@app/ui/components/loading/Loading';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import Partner from './partnerItem/PartnerItem';

import './CnpjPage.scss';

interface InfoModel {
  infoName: string;
  infoText?: string;
}

const partnerMock = {
  'Identificador': 'PJ',
  'Data de entrada da sociedade': 'dd/mm/aaaa',
  'Nome do representante legal': 'Lorem ipsum',
  'CNPJ do sócio': 'CNPJ do sócio',
  'Código do país (sócio estrangeiro)': 'Lorem ipsum',
  'Código de qualificação do representante legal': 'Lorem ipsum',
  'Código de qualificação do sócio': '000',
  'Número de CPF do representante legal': '000.000.000-00',
  'Faixa etária': 'Lorem ipsum',
};

const Info = ({infoName, infoText}: InfoModel) => {
  return (
    <>
      {infoName && infoText ?
        <div className='info-item'>
          <div className='info-name'>{infoName}</div>
          <div className='info-text'>{infoText}</div>
        </div>
        : 
        <></>
      }
    </>
  );
};

const CnpjPage = () => {
  const [isLoading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const gazettesService = new GazettesService();

  useEffect(() => {
    setLoading(true);
    gazettesService.getCnpj(params.id as string).then(() => {
      setLoading(false);
      //TO DO INTEGRAÇÃO
    }).catch(() => {
      setLoading(false);
      //navigate(urls.notFound.url);
    });
  }, [params]);

  return (
    <Grid container className='container cnpj-page' justifyContent='center'>
      <Grid item sm={10} xs={12}>
        {isLoading ?
          <Loading isRelative={true} isLoading={true}></Loading>
          : 
          <div>
            <div className='cnpj-header'>
              <div>
                <div className='small-text font-sora'>{TEXTS.cnpjPage.cnpjTitle}</div>
                <div className='h2-class font-sora'>11.709.051/0001-03</div>
                <div className='h3-class font-sora'>JUREMA CONSULTORIA E SERVIÇOS LTDA</div>
              </div>
              <div>
                <Link to={urls.search.url}>
                  <ButtonDarkBlue>{TEXTS.cnpjPage.search}</ButtonDarkBlue>
                </Link>
              </div>
            </div>

            <div className='cnpj-info-section'>
              <div className='info-column'>
                <div className='info-block'>
                  <div className='info-title'>{TEXTS.cnpjPage.situation}</div>
                  <Info infoName='Situação Cadastral' infoText='Ativa'/>
                  <Info infoName='Data da Situação Cadastral' infoText='24/02/2010'/>
                </div>

                <div className='info-block'>
                  <div className='info-title'>{TEXTS.cnpjPage.geralInfo}</div>
                  <Info infoName='Nome fantasia' infoText='Nome fantasia'/>
                  <Info infoName='Data de abertura' infoText='Data de abertura'/>
                  <Info infoName='Porte' infoText='Demais'/>
                  <Info infoName='Matriz ou filial' infoText='Matriz'/>
                  <Info infoName='Qualificação do responsável' infoText='Lorem ipsum sit amet'/>
                  <Info infoName='Capital social' infoText='Lorem ipsum sit amet'/>
                  <Info infoName='Ente federativo responsável' infoText='Lorem ipsum sit amet'/>
                  <Info infoName='Simples nacional' infoText='Sim'/>
                  <Info infoName='Código e descrição da atividade econômica principal' infoText='62.01-5-01 - Desenvolvimento de programas de computador sob encomenda'/>
                  <Info infoName='Código e descrição das atividades secundárias' infoText={`62.09-1-00 - Suporte técnico, manutenção e outros serviços em tecnologia da informação
62.04-0-00 - Consultoria em tecnologia da informação
85.99-6-03 - Treinamento em informática
70.20-4-00 - Atividades de consultoria em gestão empresarial, exceto consultoria técnica específica
72.10-0-00 - Pesquisa e desenvolvimento experimental em ciências físicas e naturais
72.20-7-00 - Pesquisa e desenvolvimento experimental em ciências sociais e humanas
74.10-2-99 - atividades de design não especificadas anteriormente
59.11-1-99 - Atividades de produção cinematográfica, de vídeos e de programas de televisão não especificadas anteriormente`}
                  />
                  <Info infoName='Código e endereço da natureza jurídica' infoText='206-2 - Sociedade Empresária Limitada'/>
                </div>
              </div>
              <div className='info-column'>
                <div className='info-block'>
                  <div className='info-title'>{TEXTS.cnpjPage.address}</div>
                  <Info infoName='Logradouro' infoText='R. Fradique Coutinho'/>
                  <Info infoName='Número' infoText='1590'/>
                  <Info infoName='Complemento' infoText='Apt. 34'/>
                  <Info infoName='Bairro/Distrito' infoText='Pinheiros'/>
                  <Info infoName='CEP' infoText='05.416-002'/>
                  <Info infoName='Município, UF e país' infoText='São Paulo/SP, Brasil'/>
                  <Info infoName='Telefone 1' infoText='(11) 00000-0000'/>
                  <Info infoName='Telefone 2' infoText='(11) 00000-0000'/>
                  <Info infoName='E-mail' infoText='email@email.com'/>
                  <Info infoName='Situação especial' infoText='Lorem ipsum'/>
                  <Info infoName='Data da situação especial' infoText='dd/mm/aaaa'/>
                </div>
              </div>
            </div>

            <div className='partners'>
              <div className='h3-class'>{TEXTS.cnpjPage.partners}</div>
              <div className='partners-list'>
                {[partnerMock, partnerMock, partnerMock].map((partner, index) => <Partner key={index} name={`Sócio ${index + 1}`} data={partner} />)}
              </div>
            </div>
          </div>
        }
      </Grid>
    </Grid>
  );
};

export default CnpjPage;
