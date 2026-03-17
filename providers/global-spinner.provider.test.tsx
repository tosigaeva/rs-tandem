import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { useAuth } from '@/services/authorization/auth.store';

import { GlobalSpinnerProvider } from './global-spinner.provider';

jest.mock('@/services/authorization/auth.store', () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = jest.mocked(useAuth);

describe('GlobalSpinnerProvider', () => {
  const defaultProps = {
    children: <div data-testid="children">App Content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Conditional Rendering', () => {
    it('should render children if loading state is true', () => {
      mockUseAuth.mockReturnValue(true);

      render(<GlobalSpinnerProvider {...defaultProps} />);

      expect(screen.getByTestId('children')).toBeInTheDocument();
    });

    it('should render children if loading state is false', () => {
      mockUseAuth.mockReturnValue(false);

      render(<GlobalSpinnerProvider {...defaultProps} />);

      expect(screen.getByTestId('children')).toBeInTheDocument();
    });

    it('should show SpinnerCustom when isAuthorizing is true', () => {
      mockUseAuth.mockReturnValue(true);

      render(<GlobalSpinnerProvider {...defaultProps} />);

      expect(screen.getByTestId('global-overlay-spinner')).toBeInTheDocument();
    });

    it('should hide SpinnerCustom when isAuthorizing is false', () => {
      mockUseAuth.mockReturnValue(false);

      render(<GlobalSpinnerProvider {...defaultProps} />);

      expect(screen.queryByTestId('global-overlay-spinner')).not.toBeInTheDocument();
    });
  });
});
