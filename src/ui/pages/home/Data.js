import { Grid } from '@mui/material';
import { fontTitle3Black, fontTitle1Green, fontNormal2Black} from '../../fonts';


function DataLabel({ data, featured, label }) {
    return (
        <span>
            <p style={{
                ...fontTitle1Green,
                textAlign: 'center',
                margin: 0,
                paddingBottom: 6.5,
                paddingTop: 30,
            }}>
                {data}
            </p>
            <p style={{ ...fontNormal2Black, textAlign: 'center', marginBottom: 80, marginTop: 0, }}><b>{featured}</b>{label}</p>
        </span>
    );
}

function Data() {
    return (
        <Grid item container xs={12} sx={{ paddingTop: '80px', paddingBottom: '80px' }} >
            <Grid item xs={12}>
                <p style={{ ...fontTitle3Black, textAlign: 'center', margin: 0, }}>
                    Dados confiáveis baseados no querido diário
                </p>
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs={4}>
                    <DataLabel data="21" featured="cidades" label=" já estão disponíveis para realizar buscas" />
                </Grid>
                <Grid item xs={4}>
                    <DataLabel data="139mil" featured="diários oficiais" label=" encontrados pela busca até o momento" />
                </Grid>
                <Grid item xs={4}>
                    <DataLabel data="2420" featured="cidades" label=" estarão disponíveis em breve" />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Data;
