import { Grid } from '@mui/material';
import { fontRoboto, fontSora } from '/src/ui/utils/fonts';
import { blue, gray5, green, lightGray, lightGray3 } from '../../utils/colors';
import { h2Style, h3Style, paragrathStyle } from '../../utils/generalStyles';
import mobileBanner from '/src/assets/images/about/about-mobile.png';
import desktopBanner from '/src/assets/images/about/about-desktop.png';
import { Link } from 'react-router-dom';
import ButtonSolidGreen from '/src/ui/components/button/ButtonGreen';

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
      <>
        <Grid container item className='container' sm={12} justifyContent='center' style={{backgroundColor: blue, marginTop: '-80px'}}>
          <Grid container item sm={8} style={{paddingTop: isDesktop ? '80px' : '56px'}}>
            <div style={{margin: isDesktop ? '80px 0' : '56px 0', color: 'white'}}>
              <div style={{...fontSora, textTransform: 'uppercase', lineHeight: '18px', fontWeight: 600, fontSize: '14px', color: green}}>
                SOBRE O DIÁRIO DO CLIMA
              </div>
              <div style={{...fontSora, fontSize: '38px', fontWeight: 600, lineHeight: '48px', margin: '8px 0',}}>
                Nós estamos aqui para promover transparência
              </div>
              <p style={{...paragrathStyle, color: 'white', marginBottom: 0}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis diam vel nisl aliquet aliquam. Donec dignissim massa et erat semper, eu condimentum eros cursus. Etiam convallis sollicitudin faucibus.
              </p>
            </div>
          </Grid>
        </Grid>
        <Grid container item sm={12} justifyContent='center' style={{height: '360px', overflow: 'hidden', marginTop: '-2px'}}>
          <img style={{width: '100%'}} src={isDesktop? desktopBanner : mobileBanner} alt='vista de satélite de um rio'/>
        </Grid>
        <Grid container item sm={12} className='container' justifyContent='center'>
          <Grid item sm={8}>
            <div style={{...fontRoboto, fontSize: '14px', lineHeight: '16px', marginTop: '8px', color: gray5}}>Foto por USGS no Unsplash</div>
            <div style={{marginTop: isDesktop? '80px' : '56px'}}>
              <h3 style={h3Style}>Onde tudo começou</h3>
              <p style={paragrathStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis diam vel nisl aliquet aliquam. Donec dignissim massa et erat semper, eu condimentum eros cursus. Etiam convallis sollicitudin faucibus.</p>
              <p style={paragrathStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis diam vel nisl aliquet aliquam. Donec dignissim massa et erat semper, eu condimentum eros cursus. Etiam convallis sollicitudin faucibus.</p>
            </div>

            <div style={{padding: isDesktop ? '58px 0' : '58px 0 34px'}}>
              <h2 style={h2Style}>Nosso propósito é facilitar o acesso a dados sobre o clima para proteger o meio ambiente</h2>
            </div>
          </Grid>
        </Grid>

        
        <Grid container item sm={12} justifyContent='center' style={{backgroundColor: lightGray3, padding: isDesktop? '80px 0' : '56px 0'}}>
          <Grid item sm={8} className='container'>
            <h3 style={{...h3Style, marginBottom: '0',}}>Contamos com seu apoio!</h3>
            <p style={{...paragrathStyle, marginTop: '8px'}}>Você pode se tornar um assinante. Assim, você recebe os benefícios de ser PRO e ainda ajuda o Diário do Clima a abrir os dados de novas cidades e desenvolver novas ferramentas!</p>
            <Link to=''>
              <ButtonSolidGreen  >
                Quero assinar
              </ButtonSolidGreen>
            </Link>
          </Grid>
        </Grid>

        
        <Grid container item sm={12} justifyContent='center' style={{padding: isDesktop? '80px 0' : '56px 0'}}>
          <Grid className='container' sm={10}>
            <h3 style={h3Style}>Quem está por trás disso</h3>
            <Grid container style={{paddingTop: '10px'}}>
              {partners.map(partner => {
                return (
                  <div 
                    style={{
                      ...(isDesktop ? partnerStyleDesktop : partnerStyleMobile), 
                      borderBottom: partner !== partners[partners.length - 1] && !isDesktop ? '1px solid ' + lightGray : ''
                    }}
                  >
                    <div style={{marginBottom: '16px'}}>{partner.logo}</div>
                    <a style={{color: blue, fontWeight: 600, fontSize: '14px', lineHeight: '16px'}} href={partner.link}>Acessar o site</a>
                  </div>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </>
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