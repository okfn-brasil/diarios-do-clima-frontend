import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CNPJInfo, CNPJPartner } from '@app/models/cnpj.model';
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
  const [isLoadingPartner, setLoadingPartner]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [cnpj, setCNPJ]: [CNPJInfo, Dispatch<CNPJInfo>] = useState({} as CNPJInfo);
  const [partners, setPartners]: [CNPJPartner[], Dispatch<CNPJPartner[]>] = useState([] as CNPJPartner[]);
  const params = useParams();
  const navigate = useNavigate();
  const gazettesService = new GazettesService();

  useEffect(() => {
    setLoading(true);
    gazettesService.getCnpj(params.id as string).then(result => {
      setCNPJ(result.cnpj_info as CNPJInfo);
      getPartners(params.id as string);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      navigate(urls.notFound.url);
    });
  }, [params]);

  const getPartners = (cnpj: string) => {
    setLoadingPartner(true);
    gazettesService.getCnpjPartners(cnpj).then(result => {
      setPartners(parsePartners(result.partners) as CNPJPartner[]);
      setLoadingPartner(false);
    }).catch(() => {
      setLoadingPartner(false);
    });
  };

  const parsePartners = (partners: CNPJPartner[]) => {
    return partners.map(partner => {
      return {
        'CNPJ': partner.cnpj_completo,
        'CPF do Sócio': partner.cnpj_cpf_socio,
        'Data de início': partner.data_entrada_sociedade,
        'Faixa etária': partner.faixa_etaria,
        'Identificador de Sócio': partner.identificador_socio,
        'Nome do representante legal': partner.nome_representante_legal,
        'CPF do representante legal': partner.numero_cpf_representante_legal,
        'País sócio estrangeiro': partner.pais_socio_estrangeiro,
        'Qualificação do representante legal': partner.qualificacao_representante_legal,
        'Qualificação do sócio': partner.qualificacao_socio,
        'Razão Social': partner.razao_social,
      };
    });
  };

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
                <div className='h2-class font-sora'>{cnpj.cnpj_completo}</div>
                <div className='h3-class font-sora'>{cnpj.razao_social}</div>
              </div>
              <div>
                <Link to={urls.search.url + '?period=1&query=' + cnpj.cnpj_completo}>
                  <ButtonDarkBlue>{TEXTS.cnpjPage.search}</ButtonDarkBlue>
                </Link>
              </div>
            </div>

            <div className='cnpj-info-section'>
              <div className='info-column'>
                <div className='info-block'>
                  <div className='info-title'>{TEXTS.cnpjPage.situation}</div>
                  <Info infoName='Situação Cadastral' infoText={cnpj.situacao_cadastral}/>
                  <Info infoName='Data da Situação Cadastral' infoText={cnpj.data_situacao_cadastral}/>
                </div>

                <div className='info-block'>
                  <div className='info-title'>{TEXTS.cnpjPage.geralInfo}</div>
                  <Info infoName='Nome fantasia' infoText={cnpj.nome_fantasia}/>
                  <Info infoName='Data de abertura' infoText={cnpj.data_inicio_atividade}/>
                  <Info infoName='Porte' infoText={cnpj.porte}/>
                  <Info infoName='Matriz ou filial' infoText={cnpj.identificador_matriz_filial}/>
                  <Info infoName='Qualificação do responsável' infoText={cnpj.qualificacao_do_responsavel}/>
                  <Info infoName='Capital social' infoText={cnpj.capital_social}/>
                  <Info infoName='Ente federativo responsável' infoText={cnpj.ente_federativo_responsavel}/>
                  <Info infoName='Simples nacional' infoText={cnpj.opcao_pelo_simples}/>
                  <Info infoName='Código e descrição da atividade econômica principal' infoText={cnpj.cnae}/>
                  <Info infoName='Código e descrição das atividades secundárias' infoText={cnpj.cnae_fiscal_secundario}/>
                  <Info infoName='Código e endereço da natureza jurídica' infoText={cnpj.natureza_juridica}/>
                </div>
              </div>
              <div className='info-column'>
                <div className='info-block'>
                  <div className='info-title'>{TEXTS.cnpjPage.address}</div>
                  <Info infoName='Logradouro' infoText={cnpj.logradouro}/>
                  <Info infoName='Número' infoText={cnpj.numero}/>
                  <Info infoName='Complemento' infoText={cnpj.complemento}/>
                  <Info infoName='Bairro/Distrito' infoText={cnpj.bairro}/>
                  <Info infoName='CEP' infoText={cnpj.cep}/>
                  <Info infoName='Município, UF e país' infoText={`${cnpj.municipio}, ${cnpj.uf}, ${cnpj.pais}`}/>
                  <Info infoName='Telefone 1' infoText={cnpj.ddd_telefone_1}/>
                  <Info infoName='Telefone 2' infoText={cnpj.ddd_telefone_2}/>
                  <Info infoName='E-mail' infoText={cnpj.correio_eletronico}/>
                  <Info infoName='Situação especial' infoText={cnpj.situacao_especial}/>
                  <Info infoName='Data da situação especial' infoText={cnpj.data_situacao_especial}/>
                </div>
              </div>
            </div>

            <div className='partners'>
              { partners.length || isLoadingPartner ?
                <div>
                  <div className='h3-class'>{TEXTS.cnpjPage.partners}</div>
                  <Loading height='100px' isRelative={true} isLoading={isLoadingPartner}></Loading>
                  <div className='partners-list'>
                    {partners.map((partner, index) => <Partner key={index} name={`Sócio ${index + 1}`} data={partner} />)}
                  </div>
                </div>
                : <></>
              }
            </div>

          </div>
        }
      </Grid>
    </Grid>
  );
};

export default CnpjPage;
