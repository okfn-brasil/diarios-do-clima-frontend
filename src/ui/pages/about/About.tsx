import { Link } from 'react-router-dom';
import desktopBanner from '@app/assets/images/about/about-desktop.png';
import mobileBanner from '@app/assets/images/about/about-mobile.png';
import ButtonSolidGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import './About.scss';

const partners = [
  {
    logo: 'Logo Parceiro 1',
    link: 'https://google.com',
  },
  {
    logo: 'Logo Parceiro 2',
    link: 'https://google.com',
  },
  {
    logo: 'Logo Parceiro 3',
    link: 'https://google.com',
  },
  {
    logo: 'Logo Parceiro 4',
    link: 'https://google.com',
  },
  {
    logo: 'Logo Parceiro 5',
    link: 'https://google.com',
  },
  {
    logo: 'Logo Parceiro 6',
    link: 'https://google.com',
  },
];

const AboutPage = () => {
  return (
    <div className='about-page'>
      <Grid container item className='container top-space' sm={12} justifyContent='center'>
        <Grid container item sm={8}>
          <div className='vertical-spacing-container about-header'>
            <div className='green-title'>
                SOBRE O DIÁRIO DO CLIMA
            </div>
            <div className='h2-class'>
                Nós estamos aqui para promover transparência
            </div>
            <p className='paragraph-class '>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis diam vel nisl aliquet aliquam. Donec dignissim massa et erat semper, eu condimentum eros cursus. Etiam convallis sollicitudin faucibus.
            </p>
          </div>
        </Grid>
      </Grid>
      <Grid container item sm={12} className='banner' justifyContent='center'>
        <img className='only-mobile' src={mobileBanner} alt='vista de satélite de um rio'/>
        <img className='only-desktop' src={desktopBanner} alt='vista de satélite de um rio'/>
      </Grid>
      <Grid container item sm={12} className='container were-started' justifyContent='center'>
        <Grid item sm={8}>
          <div className='subtitle'>Foto por USGS no Unsplash</div>
          <div className='spacing-top'>
            <h3 className='h3-class'>Onde tudo começou</h3>
            <p className='paragraph-class'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis diam vel nisl aliquet aliquam. Donec dignissim massa et erat semper, eu condimentum eros cursus. Etiam convallis sollicitudin faucibus.</p>
            <p className='paragraph-class'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis diam vel nisl aliquet aliquam. Donec dignissim massa et erat semper, eu condimentum eros cursus. Etiam convallis sollicitudin faucibus.</p>
          </div>

          <div className='vertical-spacing-container'>
            <h2 className='h2-class dark-text'>Nosso propósito é facilitar o acesso a dados sobre o clima para proteger o meio ambiente</h2>
          </div>
        </Grid>
      </Grid>

        
      <Grid container item sm={12} className='vertical-spacing-container gray-area' justifyContent='center'>
        <Grid item sm={8} className='container'>
          <h3 className='h3-class-sx-margin'>Contamos com seu apoio!</h3>
          <p className='paragraph-class'>Você pode se tornar um assinante. Assim, você recebe os benefícios de ser PRO e ainda ajuda o Diário do Clima a abrir os dados de novas cidades e desenvolver novas ferramentas!</p>
          <Link to={urls.purchase.url}>
            <ButtonSolidGreen  >
                Quero assinar
            </ButtonSolidGreen>
          </Link>
        </Grid>
      </Grid>

        
      <Grid container item sm={12} justifyContent='center' className='vertical-spacing-container'>
        <Grid className='container partners' item sm={10}>
          <h3 className='h3-class'>Quem está por trás disso</h3>
          <Grid container className='partners-list'>
            {partners.map(partner => {
              return (
                <div key={partner.logo} className='partner-box'>
                  <div className='partner-logo'>{partner.logo}</div>
                  <a className='blue-link' href={partner.link}>Acessar o site</a>
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutPage;