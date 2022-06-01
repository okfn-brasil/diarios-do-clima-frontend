import { Grid } from "@mui/material";
import Link from '../../components/Link';
import {
    fontTitle3Black,
    fontNormal2Black,
} from '../../fonts';

function MoreData() {
    return (
        <Grid item container xs={12}
            justifyContent='center'
            sx={{
                paddingTop: '80px',
                paddingBottom: '80px',
            }}
        >
            <Grid item xs={8}>
                <p style={fontTitle3Black}>Mais dados. Mais insights</p>
                <p style={fontNormal2Black}>Informações curadas por profissionais e baseadas nos diários oficiais para ajudar pesquisadores, consultores e organizações a estarem a par dos últimos acontecimentos.</p>
                <Link>
                    Saiba mais sobre os relatórios
                </Link>
            </Grid>
        </Grid>
    );
}

export default MoreData;