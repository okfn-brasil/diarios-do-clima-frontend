import { Grid } from "@mui/material";
import { fontTitle3Black, fontSora, fontRoboto } from "/src/ui/utils/fonts";
import './BecomePro.scss';
import { green, darkBlue, gray5, gray2 } from "/src/ui/utils/colors";
import CheckIcon from '@mui/icons-material/Check';
import ButtonGreen from "/src/ui/components/button/ButtonGreen";
import { Link } from "react-router-dom";
import ButtonOutlined from "/src/ui/components/button/ButtonOutlined";
import { urls } from "/src/ui/utils/urls";

interface PropsBecomePro {
  isDesktop: boolean;
}

const BecomePro = ({isDesktop}: PropsBecomePro) => {
  return (
    <Grid container className='container'>
      <Grid item container xs={0} sm={3}></Grid>
      <Grid item xs={12} sm={6}>
        <div style={{
          ...fontTitle3Black,
          ...fontSora,
          color: darkBlue,
          paddingTop: isDesktop ? '80px' : '36px',
        }}>
          Torne-se assinante do <span style={{color: green}}>Diário do Clima PRO</span>
        </div>
        <p style={subtitleFont}>Ao assinar, você nos ajuda a desenvolver esse projeto sem fins lucrativos e tem acesso aos benefícios do Diário do Clima PRO</p>
        <p style={{...subtitleFont, marginTop: '30px', marginBottom: '0'}}>O seu cadastro básico inclui:</p>
        <div style={itemGroupStyle}>
          <div style={itemsStyle}>
            <span style={checkItemStyle}><CheckIcon color='disabled'/></span> Acesso limitado ao conteúdo
          </div>
        </div>
        <hr style={{...itemGroupStyle, borderColor: gray2, borderTop: 'none'}}/>
        <div style={itemGroupStyle}>
          <p style={{...subtitleFont, marginBottom: '0'}}>A assinatura PRO inclui:</p>
          <div style={itemsStyle}>
            <span style={checkItemStyle}><CheckIcon sx={{ color: green }}/></span> Visualização de resultados de todo o histórico disponível no banco de dados
          </div>
          <div style={itemsStyle}>
            <span style={checkItemStyle}><CheckIcon sx={{ color: green }}/></span> Filtro de busca por temas inteligentes
          </div>
          <div style={itemsStyle}>
            <span style={checkItemStyle}><CheckIcon sx={{ color: green }}/></span> Criação de alertas com filtros e palavras-chaves personalizadas
          </div>
        </div>
        <div style={{ marginTop: '34px', marginBottom: isDesktop ? '141px' : '50px'}}>
          <Link to={urls.purchase.url}><ButtonGreen sx={buttonStyle}>Quero assinar</ButtonGreen></Link>
          <Link to={urls.startSearch.url}><ButtonOutlined sx={{...buttonStyle, color: gray5}}>Continuar sem assinatura</ButtonOutlined></Link>
        </div>
      </Grid>
    </Grid>
  );
}

export default BecomePro;

const subtitleFont: React.CSSProperties = {
  ...fontRoboto, 
  fontSize: '18px', 
  margin: '10px 0', 
  color: gray5
}

const itemsStyle: React.CSSProperties = {
  position: 'relative',
  paddingLeft: '36px',
  marginTop: '20px',
}

const checkItemStyle: React.CSSProperties = {
  top: '0',
  position: 'absolute',
  left: '0',
};

const itemGroupStyle: React.CSSProperties = {
  marginBottom: '18px',
}

const buttonStyle: React.CSSProperties = {
  width: '100%',
  marginTop: '18px',
}