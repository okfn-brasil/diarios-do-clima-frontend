import { Grid } from "@mui/material";
import { darkBlue, gray5 } from "../../utils/colors";
import { fontRoboto, fontSora } from "../../utils/fonts";
import PurchaseForm from "./purchaseForm/PurchaseForm";

interface PropsPurchase {
  isDesktop: boolean;
}

const Purchase = ({isDesktop}: PropsPurchase) => {
  return (
    <Grid container className='container'>
      <Grid item lg={2} sm={1} xs={0}></Grid>
      <Grid 
        item 
        container 
        lg={8} 
        sm={10}
        xs={12}
      >
        <div
          style={{
            marginTop: isDesktop ? '56px' : '43px',
            marginBottom: '56px',
          }}
        >
          <div 
            style={{
              ...fontSora,
              fontSize: '38px',
              lineHeight: '48px',
              fontWeight: '600',
              color: darkBlue,
            }}
          >
            Comece seu período de 7 dias de teste.
          </div>
          <div
            style={{
              ...fontRoboto,
              fontSize: '18px',
              lineHeight: '22px',
              color: gray5,
              marginTop: '8px',
            }}
          >
            Usufrua dos benefícios de ser PRO sem compromisso. Cancele a qualquer momento.
          </div>
        </div>
        <Grid item xs={12}>
          <PurchaseForm />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Purchase;