import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserState } from '@app/models/user.model';
import { RootState } from '@app/stores/store';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import LinkManager from '@app/ui/components/linkManager/LinkManager';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';
import CheckIcon from '@mui/icons-material/Check';
import bg from '@app/assets/images/planos/banner_planos.png';
import { Grid } from '@mui/material';

import FAQItem from './FaqItem/FaqItem';

import './Plans.scss';

const Plans = () => {
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);

  return (
    <div className='plan-page'>
      <Grid container item className='container top-space' style={{backgroundImage: 'url(' + bg + ')'}}  sm={12} justifyContent='center'>
      <Grid container item className='container vertical-spacing-container' sm={12} justifyContent='center'>
        <Grid container item sm={8} >
            <div className='vertical-spacing-container plan-header'>
              <div className='green-title'>
                {TEXTS.plansPage.title}
              </div>
              <h2 className='h2-class'>
                {TEXTS.plansPage.subtitle}
              </h2>
              <LinkManager to={urls.purchase.url}>
                <ButtonGreen>
                  {TEXTS.plansPage.startTest}
                </ButtonGreen>
              </LinkManager>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item className='container' sm={12} justifyContent='center'>
        <Grid item sm={8} className='vertical-spacing-container plans'>
          <h2 className='h2-class'>{TEXTS.plansPage.cardsTitle}</h2>
          <p className='desc-class'>{TEXTS.plansPage.cardsSubTitle}</p>
          
          <Grid container justifyContent='space-between'>
            <div className='card-plan'>
              <h4 className='card-title'>{TEXTS.plansPage.basic}</h4>
              <p className='card-desc'>{TEXTS.plansPage.basicDesc}</p>
              <h1 className='card-price'>{TEXTS.plansPage.basicPrice}</h1>
              <div className='card-status'>{!userData.plan_pro ? TEXTS.plansPage.state : ''}</div>
              <Link to={userData.id ? urls.search.url : urls.registration.url} className='hover-animation'>
                <ButtonOutlined classess='card-button'>
                  {TEXTS.plansPage.startSearch}
                </ButtonOutlined>
              </Link>
              <div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  {TEXTS.plansPage.basicItem1}
                </div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  {TEXTS.plansPage.basicItem2}
                </div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  {TEXTS.plansPage.basicItem3}
                </div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  {TEXTS.plansPage.basicItem4}
                </div>
              </div>
            </div>

            <div className='card-pro'>
              <h4 className='card-title'>{TEXTS.plansPage.pro}</h4>
              <p className='card-desc'>{TEXTS.plansPage.proDesc}</p>
              <h1 className='card-price'>{TEXTS.plansPage.proPrice}<span>{TEXTS.plansPage.perMonth}</span></h1>
              <Link to={userData.id ? urls.purchase.url : urls.registration.url} className='hover-animation'>
                <ButtonGreen classess='card-button'>
                  {TEXTS.plansPage.startTestLink}
                </ButtonGreen>
              </Link>

              <div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  {TEXTS.plansPage.basicItem1}
                </div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  {TEXTS.plansPage.basicItem2}
                </div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  {TEXTS.plansPage.basicItem3}
                </div>
                <div className='card-list-check'>
                  <span className='check-icon'><CheckIcon color='disabled'/></span>
                  {TEXTS.plansPage.basicItem4}
                </div>
                <div className='card-list-check-pro'>
                  <span className='check-icon'><CheckIcon className='pink-icon'/></span>
                  {TEXTS.plansPage.proItem1}
                </div>
                <div className='card-list-check-pro'>
                  <span className='check-icon'><CheckIcon className='pink-icon'/></span>
                  {TEXTS.plansPage.proItem2}
                </div>
                <div className='card-list-check-pro'>
                  <span className='check-icon'><CheckIcon className='pink-icon'/></span>
                  {TEXTS.plansPage.proItem3}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item sm={12} className='vertical-spacing-container gray-area' justifyContent='center' >
        <Grid item sm={8} className='container'>
          <h3 className='h3-class'>{TEXTS.plansPage.preOrder}</h3>
          <p className='paragraph-class'>{TEXTS.plansPage.preOrderDesc}</p>
          <Grid>
            <a href={`mailto:${TEXTS.contactEmail}`}>
              <ButtonGreen classess='button'>
                {TEXTS.plansPage.contact}
              </ButtonGreen>
            </a>
            <Link to={urls.reports.url}>
              <ButtonOutlined classess='button button-gray'>
                {TEXTS.plansPage.simulate}
              </ButtonOutlined>
            </Link>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item sm={12} justifyContent='center' className='vertical-spacing-container'>
        <Grid item sm={8} className='container'>
          <h3 className='h3-class' >{TEXTS.plansPage.discount}</h3>
          <p className='paragraph-class'>{TEXTS.plansPage.discountDesc}</p>
          <a href={'mailto:' + TEXTS.contactEmail}>
            <ButtonGreen>
              {TEXTS.plansPage.getDiscount}
            </ButtonGreen>
          </a>
        </Grid>
      </Grid>

      <Grid container item sm={12} justifyContent='center' className='vertical-spacing-container'>
        <Grid item sm={8} className='container'>
          <h2 className='h2-class faq-title'>{TEXTS.plansPage.faq}</h2>
          <div>
            {TEXTS.plansPage.faqItems.map(faqItem => 
              <FAQItem key={faqItem.title} title={faqItem.title}>
                {faqItem.text}
              </FAQItem>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Plans;

