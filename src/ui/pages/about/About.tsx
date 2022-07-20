import { Link } from 'react-router-dom';
import desktopBanner from '@app/assets/images/about/about-desktop.png';
import mobileBanner from '@app/assets/images/about/about-mobile.png';
import ButtonSolidGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import { TEXTS } from '@app/ui/utils/portal-texts';
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
              {TEXTS.aboutPage.title}
            </div>
            <div className='h2-class'>
              {TEXTS.aboutPage.subTitle}
            </div>
            <p className='paragraph-class '>
              {TEXTS.aboutPage.description}
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
          <div className='subtitle'>{TEXTS.aboutPage.photoLegend}</div>
          <div className='spacing-top'>
            <h3 className='h3-class'>{TEXTS.aboutPage.whereStarted}</h3>
            <p className='paragraph-class'>{TEXTS.aboutPage.p1}</p>
            <p className='paragraph-class'>{TEXTS.aboutPage.p2}</p>
          </div>

          <div className='vertical-spacing-container'>
            <h2 className='h2-class dark-text'>{TEXTS.aboutPage.objective}</h2>
          </div>
        </Grid>
      </Grid>

        
      <Grid container item sm={12} className='vertical-spacing-container gray-area' justifyContent='center'>
        <Grid item sm={8} className='container'>
          <h3 className='h3-class-sx-margin'>{TEXTS.aboutPage.support}</h3>
          <p className='paragraph-class'>{TEXTS.aboutPage.becomePro}</p>
          <Link to={urls.purchase.url}>
            <ButtonSolidGreen  >
              {TEXTS.aboutPage.signUp}
            </ButtonSolidGreen>
          </Link>
        </Grid>
      </Grid>

        
      <Grid container item sm={12} justifyContent='center' className='vertical-spacing-container'>
        <Grid className='container partners' item sm={10}>
          <h3 className='h3-class'>{TEXTS.aboutPage.partnersTitle}</h3>
          <Grid container className='partners-list'>
            {partners.map(partner => {
              return (
                <div key={partner.logo} className='partner-box'>
                  <div className='partner-logo'>{partner.logo}</div>
                  <a className='blue-link' href={partner.link}>{TEXTS.aboutPage.accessSite}</a>
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