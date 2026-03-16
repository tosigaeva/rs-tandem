import { zodResolver } from '@hookform/resolvers/zod';
import { act, fireEvent, render, renderHook, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { CustomInput } from './CustomInput';

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

  it('does not show error when touched, when validation fails, when non-blur', async () => {
    const input = screen.getByLabelText(/email/i);
    await user.type(input, 'invalid');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(input).toHaveValue('invalid');
    expect(screen.queryByText(/invalid email address/i)).not.toBeInTheDocument();
  });

  it('shows error when touched, when validation fails, when blur', async () => {
    const input = screen.getByLabelText(/email/i);

    await user.type(input, 'invalid');
    await user.tab();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(input).toHaveValue('invalid');
    expect(screen.queryByText(/invalid email address/i)).toBeInTheDocument();
  });

  it(`shows 'Field is required' when touched, when validation fails and input is empty, when blur`, async () => {
    const input = screen.getByLabelText(/email/i);
    await user.click(input);
    await user.tab();

    act(() => {
      jest.advanceTimersByTime(300);
    });
    const errorMessage = screen.queryByText(/invalid email address/i);

    expect(errorMessage).not.toBeInTheDocument();
    expect(/field is required/i).toBeInTheDocument();
  });

  it('does not show error when touched, when validation succeeds, when blur', async () => {
    const input = screen.getByLabelText(/email/i);
    await user.type(input, 'correct@mail.co');
    await user.tab();

    act(() => {
      jest.advanceTimersByTime(300);
    });
    const errorMessage = screen.queryByText(/invalid email address/i);

    expect(input).toHaveValue('correct@mail.co');
    expect(errorMessage).not.toBeInTheDocument();
  });
});
