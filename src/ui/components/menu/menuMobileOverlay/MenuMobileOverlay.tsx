import { Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DiarioLogo from '/src/assets/images/logo.svg';
import ButtonGreen from '/src/ui/components/button/ButtonGreen';
import ButtonOutlined from '/src/ui/components/button/ButtonOutlined';
import { darkBlue, green } from '/src/ui/utils/colors';
import { fontRoboto, fontSora } from '/src/ui/utils/fonts';

import './MenuMobileOverlay.scss';
import { Link } from 'react-router-dom';
import { MouseEventHandler } from 'react';
import { urls } from '/src/ui/utils/urls';

interface PropsMenuMobileOverlay {
  onClose: MouseEventHandler<SVGSVGElement>;
  showLoginForm: any;
  isLoggedIn: boolean;
}

const MenuMobileOverlay = ({ onClose, showLoginForm, isLoggedIn }: PropsMenuMobileOverlay)  => {
    const onShowLoginForm = () => {
      showLoginForm(true);
      onClose({} as any);
    }

    return (
        <div style={{
            zIndex: 999,
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: darkBlue,
            fontSize: 22,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            ...fontSora,
        }}>
            <Grid item container>
                <Grid item xs={12}
                    sx={{
                        paddingTop: '34px',
                        paddingRight: '24px',
                        paddingLeft: '24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '52px',
                    }}
                >
                    <img style={{width: '160px'}} src={DiarioLogo} alt='Logo do Diario do Clima' />
                    <CloseIcon sx={{ color: 'white' }} onClick={onClose} />
                </Grid>
                { isLoggedIn ? <div className='menu-item'><Link to=''>Buscar</Link></div> : <></>}
                <div className='menu-item'><Link to=''>Diário do clima PRO</Link></div>
                <div className='menu-item'><Link to=''>Relatórios</Link></div>
                <div className='menu-item'><Link to=''>Sobre o Diário do Clima</Link></div>
                { isLoggedIn ? <></> :
                  <>
                    <Grid item xs={12} sx={{
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        paddingBottom: '16px',
                    }}>
                      <Link to={urls.registration.url}>
                        <ButtonGreen
                            sx={{
                                minWidth: '100%',
                            }}>
                            Começar a buscar
                        </ButtonGreen>
                      </Link>
                    </Grid>
                    <Grid  onClick={onShowLoginForm} item xs={12} sx={{
                        paddingLeft: '24px',
                        paddingRight: '24px',
                    }}>
                        <ButtonOutlined sx={{
                            minWidth: '100%',
                        }}>
                            Iniciar sessão
                        </ButtonOutlined>
                    </Grid>
                  </>
                }
            </Grid>
            <div style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
            }}>
                <div style={{
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    paddingBottom: '16px',
                    textAlign: 'center',
                    fontSize: 14,
                    color: green,
                    display: 'flex',
                    justifyContent: 'space-between',
                    ...fontRoboto,
                }}>
                    <span style={{
                        width: '50%',
                        height: '100%',
                        borderRightStyle: 'solid',
                        borderRightWidth: '1px',
                        borderRightColor: green,
                    }}>Fale conosco</span>
                    <span
                    style={{
                      width: '50%',
                      height: '100%',
                  }}>Termos e condições</span>
                </div>
            </div>
        </div>
    );
}

export default MenuMobileOverlay;
