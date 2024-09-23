import { fireEvent, render } from '@testing-library/react';
import MyForm from './MyForm';

it('submits the correct value', () => {
  const onSubmitMock = jest.fn();
  const { container } = render(<MyForm onSubmit={onSubmitMock} />);
  const nameInput = container.querySelector(`[name="name"]`);
  const submitButton = container.querySelector(`[type="submit"]`);

  fireEvent.change(nameInput, {target: { value: 'test name' }});
  fireEvent.click(submitButton);

  expect(onSubmitMock).toHaveBeenCalledWith('test name');
});
