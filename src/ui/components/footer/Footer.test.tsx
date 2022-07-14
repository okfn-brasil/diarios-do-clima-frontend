
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from './Footer';

Enzyme.configure({adapter: new Adapter()});

test('renders the component', () => {
  const component = shallow(<Footer />);
  expect(!!component).toEqual(true);
});
