import { Grid } from '@mui/material';
import { gray2 } from '@app/ui/utils/colors';
import mobileBanner from '@app/assets/images/about/about-mobile.png';
import desktopBanner from '@app/assets/images/about/about-desktop.png';
import { Link } from 'react-router-dom';
import ButtonSolidGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import { urls } from '@app/ui/utils/urls';
import './About.scss';

interface PropsAboutPage {
  isDesktop: boolean;
}

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
]

const AboutPage = ({isDesktop}: PropsAboutPage) => {
    return (
      <div className='about-page'>
        <Grid container item className='container top-space' sm={12} justifyContent='center'>
          <Grid container item sm={8}>
            <div className='vertical-spacing-container about-header'>
              <div className='green-title'>
                SOBRE O DIÁRIO DO CLIMA
              </div>
              <div className='h2-style'>
                Nós estamos aqui para promover transparência
              </div>
              <p className='paragraph-style '>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis diam vel nisl aliquet aliquam. Donec dignissim massa et erat semper, eu condimentum eros cursus. Etiam convallis sollicitudin faucibus.
              </p>
            </div>
          </Grid>
        </Grid>
        <Grid container item sm={12} className='banner' justifyContent='center'>
          <img src={isDesktop? desktopBanner : mobileBanner} alt='vista de satélite de um rio'/>
        </Grid>
        <Grid container item sm={12} className='container were-started' justifyContent='center'>
          <Grid item sm={8}>
            <div className='subtitle'>Foto por USGS no Unsplash</div>
            <div className='spaceing-top'>
              <h3 className='h3-style'>Onde tudo começou</h3>
              <p className='paragraph-style'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis diam vel nisl aliquet aliquam. Donec dignissim massa et erat semper, eu condimentum eros cursus. Etiam convallis sollicitudin faucibus.</p>
              <p className='paragraph-style'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis diam vel nisl aliquet aliquam. Donec dignissim massa et erat semper, eu condimentum eros cursus. Etiam convallis sollicitudin faucibus.</p>
            </div>

            <div className='vertical-spacing-container'>
              <h2 className='h2-style dark-text'>Nosso propósito é facilitar o acesso a dados sobre o clima para proteger o meio ambiente</h2>
            </div>
          </Grid>
        </Grid>

        
        <Grid container item sm={12} className='vertical-spacing-container gray-area' justifyContent='center'>
          <Grid item sm={8} className='container'>
            <h3 className='h3-style'>Contamos com seu apoio!</h3>
            <p className='paragraph-style'>Você pode se tornar um assinante. Assim, você recebe os benefícios de ser PRO e ainda ajuda o Diário do Clima a abrir os dados de novas cidades e desenvolver novas ferramentas!</p>
            <Link to={urls.purchase.url}>
              <ButtonSolidGreen  >
                Quero assinar
              </ButtonSolidGreen>
            </Link>
          </Grid>
        </Grid>

        
        <Grid container item sm={12} justifyContent='center' className='vertical-spacing-container'>
          <Grid className='container partners' item sm={10}>
            <h3 className='h3-style'>Quem está por trás disso</h3>
            <Grid container className='partners-list'>
              {partners.map(partner => {
                return (
                  <div 
                    key={partner.logo}
                    style={{
                      ...(isDesktop ? partnerStyleDesktop : partnerStyleMobile), 
                      borderBottom: partner !== partners[partners.length - 1] && !isDesktop ? '1px solid ' + gray2 : ''
                    }}
                  >
                    <div className='partner-logo'>{partner.logo}</div>
                    <a className='blue-link' href={partner.link}>Acessar o site</a>
                  </div>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
}

export default AboutPage;

const partnerStyleDesktop: React.CSSProperties = {
  width: 'calc(100% / ' + partners.length + ')',
}

const partnerStyleMobile: React.CSSProperties = {
  width: '100%', 
  padding: '32px 0',
}