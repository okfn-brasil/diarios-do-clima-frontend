import { Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DiarioLogo from '../../../../assets/images/logo.svg';
import ButtonGreen from "../../../components/button/ButtonGreen";
import ButtonOutlined from "../../../components/button/ButtonOutlined";
import { darkBlue, green } from '../../../colors';

import './MenuMobileOverlay.css';

function MenuMobileOverlay({ onClose }) {
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
            justifyContent: 'flex-start'
        }}>
            <Grid item container>
                <Grid item xs={12}
                    sx={{
                        paddingTop: '60px',
                        paddingRight: '24px',
                        paddingLeft: '24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <img src={DiarioLogo} alt="Logo do Diario do Clima" />
                    <CloseIcon onClick={onClose} />
                </Grid>
                <Grid className="menuItem" sx={{ paddingTop: '60px' }} item xs={12}>Diário do clima PRO</Grid>
                <Grid className="menuItem" item xs={12}>Relatórios</Grid>
                <Grid className="menuItem" item xs={12}>Sobre o Diário do Clima</Grid>

                <Grid item xs={12} sx={{
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    paddingBottom: '16px',
                }}>
                    <ButtonGreen
                        sx={{
                            minWidth: '100%',
                        }}>
                        Começar a buscar
                    </ButtonGreen>
                </Grid>
                <Grid item xs={12} sx={{
                    paddingLeft: '24px',
                    paddingRight: '24px',
                }}>
                    <ButtonOutlined sx={{
                        minWidth: '100%',
                    }}>
                        Iniciar sessão
                    </ButtonOutlined>
                </Grid>


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
                    fontSize: 14,
                    color: green,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <span style={{
                        width: '50%',
                        height: '100%',
                        borderRightStyle: 'solid',
                        borderRightWidth: '1px',
                        borderRightColor: green,
                    }}>Fale conosco</span>
                    <span>Termos e condições</span>
                </div>
            </div>
        </div>
    );
}

export default MenuMobileOverlay;

<Grid item xs={12} sx={{

}}>
    <span style={{
        width: '50%',
        height: '100%',
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: green,
    }}>Fale conosco</span>
    <span>Termos e condições</span>
</Grid>