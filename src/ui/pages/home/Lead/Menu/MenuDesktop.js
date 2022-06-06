import ButtonGreen from '../../../../components/button/ButtonGreen';
import ButtonOutlined from '../../../../components/button/ButtonOutlined';
import { fontNormal1WhiteMenu, fontRoboto } from '../../../../fonts';

import './MenuDesktop.css';

function MenuDesktop() {
    return (
        <div className='menu'
            style={{
                ...fontNormal1WhiteMenu,
                ...fontRoboto,
            }}
        >
            <span>
                Diario do Clima PRO
            </span>
            <span>
                Relatorios
            </span>
            <span>
                Sobre o Diário do Clima
            </span>
            <ButtonGreen sx={{
                marginRight: '16px',
                fontSize: 14,
            }}>
                Começar a buscar
            </ButtonGreen>
            <ButtonOutlined sx={{
                fontSize: 14,
            }}>
                Iniciar Sessão
            </ButtonOutlined>
        </div>
    );
}

export default MenuDesktop;