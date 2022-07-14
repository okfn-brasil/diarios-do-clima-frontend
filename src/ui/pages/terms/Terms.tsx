import { Grid } from '@mui/material';
import './Terms.scss';

const TermsPage = () => {
  return (
    <Grid container item className='container terms' sm={12} justifyContent='center'>
      <Grid container item sm={8} className='vertical-spacing-container'>
        <div className='font-sora'>
          Termos e condições
        </div>
        <div>
          <h3 className='h4-class'>Título h3</h3>
          <p className='paragraph-class'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis diam vel nisl aliquet aliquam. Donec dignissim massa et erat semper, eu condimentum eros cursus. Etiam convallis sollicitudin faucibus. Maecenas non dui eu quam consectetur finibus. Aliquam nisl dui, scelerisque a eros vel, lacinia pulvinar turpis. Phasellus placerat metus vitae dignissim scelerisque. Quisque ultrices arcu congue ante molestie, eu semper diam blandit. Nunc vehicula aliquet nibh. Vivamus convallis, lacus pharetra scelerisque consectetur, nibh turpis scelerisque arcu, eget ornare nibh risus eu nunc. Donec enim dui, feugiat et lobortis non, posuere in ipsum. Ut ut purus in dolor cursus viverra a sit amet lorem. Sed posuere finibus neque eget sodales. Vivamus sodales porttitor purus, eget rhoncus tortor.</p>
          <p className='paragraph-class'>Phasellus suscipit magna in nibh placerat, vitae viverra mauris sagittis. Aliquam erat volutpat. Integer efficitur sapien tempus maximus blandit. Donec mi risus, dictum vel aliquam eu, mollis eu elit. In hac habitasse platea dictumst. Nulla molestie facilisis quam, eu semper odio interdum condimentum. Praesent ornare ut neque sed suscipit. Curabitur mi enim, lobortis vitae est et, placerat lobortis nisl. Phasellus ligula nibh, aliquam eget ligula et, lacinia egestas arcu.</p>
        </div>

        <div className='terms-session'>
          <h4 className='h4-class'>Título h4</h4>
          <p className='paragraph-class'>Quisque ac faucibus lectus, et dignissim ex. Vestibulum a auctor nibh, in bibendum mi. Fusce consequat ligula libero, eu pretium tortor interdum at. Proin eget mi quis tellus aliquam cursus. Suspendisse et quam non leo bibendum molestie in vitae nunc. Nulla quam dolor, molestie eu dui quis, dictum faucibus arcu. Vivamus suscipit gravida leo, id laoreet leo faucibus at. Donec id bibendum leo.</p>
          <p className='list paragraph-class'>
            <div>Duis porttitor et ligula vel mollis. Fusce ac ullamcorper arcu, condimentum auctor urna. Vivamus ut euismod quam.</div> 
            <div>Ut ipsum augue, tincidunt porttitor velit non, egestas tincidunt eros. Vivamus sed urna sed nibh maximus consectetur vitae quis neque. </div> 
            <div>Quisque quis urna vel purus pretium faucibus eu a quam. Integer mauris est, auctor in maximus eget, aliquet quis massa. Integer in erat id diam vestibulum vulputate. </div> 
            <div>Ut vel ex eget dolor vestibulum volutpat. Maecenas tincidunt luctus eros, ut accumsan enim congue at.</div> 
            <div>Cras lobortis elit urna, eu vehicula sapien cursus eget. Nullam mollis, justo a consequat condimentum, mi velit facilisis metus, finibus luctus erat mi quis dolor.</div> 
          </p>
        </div>

        <div className='terms-session'>
          <h4 className='h4-class'>Título h4</h4>
          <p className='paragraph-class'>Vestibulum varius at justo eget consequat. Nunc at nibh odio. Suspendisse potenti. Donec pulvinar convallis odio, id commodo magna lobortis nec. Maecenas sed ex nec felis elementum lacinia a sagittis felis. Proin sit amet diam at arcu tristique faucibus. Phasellus viverra scelerisque tortor eget vestibulum. Donec id tortor id metus malesuada venenatis. Nulla sit amet imperdiet ligula, eu malesuada ex. Integer in ipsum molestie, tincidunt erat quis, maximus ipsum. Fusce ante ante, feugiat eget faucibus sed, euismod sit amet urna. Curabitur et sodales ante, eu vehicula dolor.</p>
        </div>
      </Grid>
    </Grid>
  );
}

export default TermsPage;

