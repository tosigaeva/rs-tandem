import { zodResolver } from '@hookform/resolvers/zod';
import { act, fireEvent, render, renderHook, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { CUSTOM_INPUT_DEBOUNCE_TIMER, CustomInput } from './CustomInput';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('CustomInput', () => {
  it('toggles password visibility', () => {
    render(
      <Wrapper>
        <CustomInput name="password" label="Password" type="password" />
      </Wrapper>
    );

    const input = screen.getByLabelText(/password/i);
    const inputContainer = input.parentElement;

    expect(inputContainer).not.toBeNull();

    if (inputContainer == undefined) {
      return;
    }

    const visibilityToggle = within(inputContainer).getByRole('button');

    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(visibilityToggle);

    expect(input).toHaveAttribute('type', 'text');
  });
});

describe('CustomInput Validation States', () => {
  let methods;
  let user: ReturnType<typeof userEvent.setup>;

  const errorMessage = 'Invalid email address';

  beforeEach(() => {
    jest.useFakeTimers();

    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    const schema = z.object({ email: z.email('Invalid email address') });

    const { result } = renderHook(() =>
      useForm({
        resolver: zodResolver(schema),
        mode: 'all',
      })
    );

    methods = result.current;

    render(
      <FormProvider {...methods}>
        <CustomInput name="email" label="Email" type="email" />
      </FormProvider>
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it(`doesn't show error until interacted`, async () => {
    const input = screen.getByLabelText(/email/i);

    act(() => {
      jest.advanceTimersByTime(CUSTOM_INPUT_DEBOUNCE_TIMER);
    });

    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it(`shows 'Field is required' when empty and after interacting once`, async () => {
    const input = screen.getByLabelText(/email/i);
    await user.click(input);
    await user.tab();

    act(() => {
      jest.advanceTimersByTime(CUSTOM_INPUT_DEBOUNCE_TIMER);
    });

    expect(input).not.toHaveFocus();
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

    const requiredMessage = await screen.queryByText(/field is required/i);
    expect(requiredMessage).toBeInTheDocument();
  });

  it('shows error when touched, when validation fails and debounce time passes', async () => {
    const input = screen.getByLabelText(/email/i);

    await user.type(input, 'invalid');
    await user.tab();

    expect(input).not.toHaveFocus();
    expect(input).toHaveValue('invalid');

    act(() => {
      jest.advanceTimersByTime(CUSTOM_INPUT_DEBOUNCE_TIMER);
    });

    expect(screen.queryByText(errorMessage)).toBeInTheDocument();
  });

  it('does not show error until debounce time passes', async () => {
    const input = screen.getByLabelText(/email/i);
    await user.type(input, 'invalid');

    act(() => {
      jest.advanceTimersByTime(CUSTOM_INPUT_DEBOUNCE_TIMER / 2);
    });

    expect(input).toHaveValue('invalid');
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(CUSTOM_INPUT_DEBOUNCE_TIMER / 2);
    });

    expect(screen.queryByText(errorMessage)).toBeInTheDocument();
  });

  it('hides error once validation succeeds', async () => {
    const input = screen.getByLabelText(/email/i);
    await user.type(input, 'invalid mail');
    await user.tab();

    act(() => {
      jest.advanceTimersByTime(CUSTOM_INPUT_DEBOUNCE_TIMER);
    });

    expect(input).toHaveValue('invalid mail');
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

    await user.clear(input);
    await user.type(input, 'valid@mail.co');
    await user.tab();

    act(() => {
      jest.advanceTimersByTime(CUSTOM_INPUT_DEBOUNCE_TIMER);
    });

    expect(input).toHaveValue('valid@mail.co');
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });
});
