import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from "@mui/material";
import Link from '../../components/Link';
import {
    fontTitle3Black,
    fontNormal2Black,
    fontRoboto,
    fontSora,
} from '../../fonts';

function MoreData() {
    const theme = useTheme();
    const isBig = useMediaQuery(theme.breakpoints.up('lg'));
    return (
        <Grid item container xs={12}
            justifyContent='center'
            sx={{
                paddingTop: isBig ? '80px' : '60px',
                paddingBottom: isBig ? '80px' : '60px',
            }}
        >
            <Grid item xs={10} md={8}>
                <p style={{
                    ...fontTitle3Black,
                    ...fontSora,
                    margin: 0,
                    marginBottom: 8,
                }}>Mais dados. Mais insights</p>
                <p style={{
                    ...fontNormal2Black,
                    ...fontRoboto,
                    margin: 0,
                    marginBottom: 44,
                    maxWidth: 782,
                    lineHeight: '22px',
                }}>Informações curadas por profissionais e baseadas nos diários oficiais para ajudar pesquisadores, consultores e organizações a estarem a par dos últimos acontecimentos.</p>
                <Link >
                    Saiba mais sobre os relatórios
                </Link>
            </Grid>
        </Grid>
    );
}

export default MoreData;