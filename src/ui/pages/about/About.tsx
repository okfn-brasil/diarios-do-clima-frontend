import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import secondBanner from '@app/assets/images/about/about.png';
import firstBanner from '@app/assets/images/about/about-desktop-top.png';
import { UserState } from '@app/models/user.model';
import { RootState } from '@app/stores/store';
import ButtonSolidGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import LinkManager from '@app/ui/components/linkManager/LinkManager';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import './About.scss';

const AboutPage = () => {
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);

  return (
    <div className='about-page'>
      <Grid container item className='container top-space banner-area' style={{backgroundImage: 'url(' + firstBanner + ')'}} sm={12} justifyContent='center'>
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
      <Grid container item className='container banner-area' style={{backgroundImage: 'url(' + secondBanner + ')'}} sm={12} justifyContent='center'>
        <Grid container item sm={8}>
          <div className='vertical-spacing-container about-header'>
            <div className='h2-class'>
              {TEXTS.aboutPage.secondTitle}
            </div>
            <p className='paragraph-class '>
              {TEXTS.aboutPage.secondSubTitle}
            </p>
            <LinkManager to={urls.registration.url}>
              <ButtonGreen classes='start-search'>
                {TEXTS.aboutPage.secondBannerButton}
              </ButtonGreen>
            </LinkManager>
          </div>
        </Grid>
      </Grid>
      <Grid container item sm={12} className='container were-started' justifyContent='center'>
        <Grid item sm={8}>
          <div className='spacing-top'>
            <h3 className='h3-class'>{TEXTS.aboutPage.whereStarted}</h3>
            <p className='paragraph-class'>{TEXTS.aboutPage.p1}</p>
          </div>

          <div className='vertical-spacing-container'>
            <h2 className='h2-class dark-text'>{TEXTS.aboutPage.objective}</h2>
          </div>
        </Grid>
      </Grid>

      <Grid container item sm={12} className='vertical-spacing-container light-blue-area' justifyContent='center'>
        <Grid item sm={8} className='container'>
          <h3 className='h3-class-sx-margin'>{TEXTS.aboutPage.support}</h3>
          <p className='paragraph-class'>{TEXTS.aboutPage.becomePro}</p>
          <Link to={userData.id ? urls.purchase.url : urls.registration.url}>
            <ButtonSolidGreen  >
              {TEXTS.aboutPage.signUp}
            </ButtonSolidGreen>
          </Link>
        </Grid>
      </Grid>

      <Grid container item sm={12} justifyContent='center' className='vertical-spacing-container'>
        <Grid className='partners container' container justifyContent='center' item sm={12}>
          <Grid item sm={8} container>
            <h3 className='h3-class partners-title'>{TEXTS.aboutPage.partnersTitle}</h3>
          </Grid>
          <Grid item sm={12} container className='partners-list'>
            {TEXTS.partners.map(partner => {
              return (
                <div key={partner.logo} className={`partner-box ${partner.customSize? 'has-custom-size' : ''}`}>
                  <div className='partner-logo'><a href={partner.link} target='_noblank'><img width={partner?.customSize?.width} alt='logo' src={partner.logo}/></a></div>
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
