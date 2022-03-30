import { useInput } from '../src/pages/Panel/Components/useInput';
import { act, renderHook } from '@testing-library/react-hooks';

describe('Input Insertion', () => {
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
