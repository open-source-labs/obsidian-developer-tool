import { useInput } from '../src/pages/Panel/Components/useInput';
import Enzyme , {mount,shallow} from 'enzyme';
import { act, renderHook } from '@testing-library/react-hooks';
import Playground from '../src/pages/Panel/Components/Playground';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import PlaygroundHeader from '../src/pages/Panel/Components/PlaygroundHeader';
import QueryInput from '../src/pages/Panel/Components/QueryInput';
import QueryOutput from '../src/pages/Panel/Components/QueryOutput';


Enzyme.configure({ adapter: new Adapter() });

describe('Input Insertion', () => {

   let wrapper;

   it('renders children',()=>{
    wrapper = shallow(<Playground />);
    expect(wrapper.containsMatchingElement(<PlaygroundHeader />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<QueryInput />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<QueryOutput />)).toEqual(true);
   });

  it('send "simple text" input value', () => {
    const { result } = renderHook(useInput);

    act(() => {
      result.current.onChange('simple text');
    });

    expect(result.current.inputValue).toBe('simple text');
  });

  it('send "" (no input) input value', () => {
    const { result } = renderHook(useInput);

    act(() => {
      result.current.onChange('');
    });

    expect(result.current.inputValue).toBe('');
  });
});
