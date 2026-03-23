import { zodResolver } from '@hookform/resolvers/zod';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { CUSTOM_INPUT_DEBOUNCE_TIMER, CustomInput } from './CustomInput';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const advanceDebounce = async (time = CUSTOM_INPUT_DEBOUNCE_TIMER) => {
  await act(async () => {
    jest.advanceTimersByTime(time);
    await Promise.resolve();
  });
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
  let user: ReturnType<typeof userEvent.setup>;

  const invalidEmailMatcher = /invalid email/i;
  const schema = z.object({
    email: z.string().min(1, 'Field is required').email('Invalid email address'),
  });

  const ValidationWrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm({
      resolver: zodResolver(schema),
      mode: 'all',
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  beforeEach(() => {
    jest.useFakeTimers();

    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ValidationWrapper>
        <CustomInput name="email" label="Email" type="email" />
      </ValidationWrapper>
    );
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it(`doesn't show error until interacted`, async () => {
    const input = screen.getByLabelText(/email/i);

    await advanceDebounce();

    expect(screen.queryByText(invalidEmailMatcher)).not.toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it(`shows 'Field is required' when empty and after interacting once`, async () => {
    const input = screen.getByLabelText(/email/i);
    await user.click(input);
    act(() => {
      fireEvent.blur(input);
    });

    await advanceDebounce();

    expect(screen.queryByText(invalidEmailMatcher)).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/field is required/i)).toBeInTheDocument();
    });
  });

  it('shows error when touched, when validation fails and debounce time passes', async () => {
    const input = screen.getByLabelText(/email/i);

    await user.type(input, 'invalid');
    act(() => {
      fireEvent.blur(input);
    });

    expect(input).toHaveValue('invalid');

    await advanceDebounce();

    await waitFor(() => {
      expect(screen.getByText(invalidEmailMatcher)).toBeInTheDocument();
    });
  });

  it('does not show error until debounce time passes', async () => {
    const input = screen.getByLabelText(/email/i);
    await user.type(input, 'invalid');

    await advanceDebounce(CUSTOM_INPUT_DEBOUNCE_TIMER / 2);

    expect(input).toHaveValue('invalid');
    expect(screen.queryByText(invalidEmailMatcher)).not.toBeInTheDocument();

    await advanceDebounce(CUSTOM_INPUT_DEBOUNCE_TIMER / 2);

    await waitFor(() => {
      expect(screen.getByText(invalidEmailMatcher)).toBeInTheDocument();
    });
  });

  it('hides error once validation succeeds', async () => {
    const input = screen.getByLabelText(/email/i);
    await user.type(input, 'invalid mail');
    act(() => {
      fireEvent.blur(input);
    });

    await advanceDebounce();

    expect(input).toHaveValue('invalid mail');
    await waitFor(() => {
      expect(screen.getByText(invalidEmailMatcher)).toBeInTheDocument();
    });

    await user.clear(input);
    await user.type(input, 'valid@mail.co');
    act(() => {
      fireEvent.blur(input);
    });

    await advanceDebounce();

    expect(input).toHaveValue('valid@mail.co');
    expect(screen.queryByText(invalidEmailMatcher)).not.toBeInTheDocument();
  });
});
