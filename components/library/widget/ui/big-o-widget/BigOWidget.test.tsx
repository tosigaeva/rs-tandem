import { fireEvent, render, screen } from '@testing-library/react';

import { BigOCanvas } from './BigOWidget';

jest.mock('@/components/CodeBlock', () => ({
  __esModule: true,
  default: ({ code }: { code: string }) => <pre>{code}</pre>,
}));

jest.mock('./canvas.helpers', () => ({
  COMPLEXITIES: [
    { name: 'O(1)', func: () => 1 },
    { name: 'O(log n)', func: (n: number) => Math.log2(n) },
    { name: 'O(n)', func: (n: number) => n },
    { name: 'O(n log n)', func: (n: number) => n * Math.log2(n) },
    { name: 'O(n^2)', func: (n: number) => n * n },
  ],
  drawAxes: jest.fn(),
  drawComplexityCurves: jest.fn(),
  getClosestComplexity: jest.fn(),
  PADDING: 10,
  setupCanvas: jest.fn(() => ({
    clearRect: jest.fn(),
  })),
  TOOLTIP_HINT: 'widget.big-o.tooltip_hint',
}));

const mockGetClosestComplexity = jest.requireMock('./canvas.helpers').getClosestComplexity;

describe('BigOWidget', () => {
  const defaultProps = {
    question: {
      en: 'What is the time complexity of this algorithm?',
      ru: 'Какова временная сложность этого алгоритма?',
      by: 'Якая часавая складанасць гэтага алгарытму?',
    },
    codeExample: 'for (let i = 0; i < n; i++) { console.log(i); }',
    onSelect: jest.fn(),
    onSubmit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the question', () => {
      render(<BigOCanvas {...defaultProps} />);
      expect(screen.getByText(defaultProps.question.en)).toBeInTheDocument();
    });

    it('should render the code example', () => {
      render(<BigOCanvas {...defaultProps} />);
      expect(screen.getByText(defaultProps.codeExample)).toBeInTheDocument();
    });

    it('should render the canvas element', () => {
      render(<BigOCanvas {...defaultProps} />);
      const canvas = document.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
      expect(canvas).toHaveAttribute('width', '400');
      expect(canvas).toHaveAttribute('height', '300');
    });

    it('should render the hint trigger', () => {
      render(<BigOCanvas {...defaultProps} />);
      expect(screen.getByRole('button', { name: /hint/i })).toBeInTheDocument();
    });

    it('should display "Selected: " with empty string by default', () => {
      render(<BigOCanvas {...defaultProps} />);
      expect(screen.getByText('Selected:')).toBeInTheDocument();
    });

    it('should display selected complexity when selectedComplexity prop is provided', () => {
      render(<BigOCanvas {...defaultProps} selectedComplexity="O(n)" />);
      expect(screen.getByText('Selected: O(n)')).toBeInTheDocument();
    });

    it('should render Check Answer button', () => {
      render(<BigOCanvas {...defaultProps} />);
      expect(screen.getByRole('button', { name: /check answer/i })).toBeInTheDocument();
    });
  });

  describe('Canvas Interaction', () => {
    it('should call onSelect with correct complexity when canvas is clicked', () => {
      mockGetClosestComplexity.mockReturnValue(2);

      render(<BigOCanvas {...defaultProps} />);
      const canvas = document.querySelector('canvas');

      if (canvas) {
        fireEvent.click(canvas, { clientX: 150, clientY: 150 });
      }

      expect(defaultProps.onSelect).toHaveBeenCalledWith('O(n)');
    });

    it('should update selected display when canvas is clicked', () => {
      mockGetClosestComplexity.mockReturnValue(0);

      render(<BigOCanvas {...defaultProps} />);
      const canvas = document.querySelector('canvas');

      if (canvas) {
        fireEvent.click(canvas, { clientX: 100, clientY: 100 });
      }

      expect(screen.getByText('Selected: O(1)')).toBeInTheDocument();
    });

    it('should not call onSelect when getClosestComplexity returns undefined', () => {
      mockGetClosestComplexity.mockReturnValue();

      render(<BigOCanvas {...defaultProps} />);
      const canvas = document.querySelector('canvas');

      if (canvas) {
        fireEvent.click(canvas, { clientX: 10, clientY: 10 });
      }

      expect(defaultProps.onSelect).not.toHaveBeenCalled();
    });
  });

  describe('Mouse Hover Interaction', () => {
    it('should update cursor style on mouse move when hovering over a complexity', () => {
      mockGetClosestComplexity.mockReturnValue(1);

      render(<BigOCanvas {...defaultProps} />);
      const canvas = document.querySelector('canvas');

      if (canvas) {
        fireEvent.mouseMove(canvas, { clientX: 150, clientY: 150 });
        expect(canvas.style.cursor).toBe('pointer');
      }
    });
  });

  describe('Submit Button Logic', () => {
    it('should disable Check Answer button by default', () => {
      render(<BigOCanvas {...defaultProps} />);
      const button = screen.getByRole('button', { name: /check answer/i });

      expect(button).toBeDisabled();
    });

    it('should enable Check Answer button when a selection is made via click', () => {
      mockGetClosestComplexity.mockReturnValue(2);

      render(<BigOCanvas {...defaultProps} />);
      const canvas = document.querySelector('canvas');
      const button = screen.getByRole('button', { name: /check answer/i });

      if (canvas) {
        fireEvent.click(canvas, { clientX: 150, clientY: 150 });
      }

      expect(button).not.toBeDisabled();
    });

    it('should enable Check Answer button when selectedComplexity prop is provided', () => {
      render(<BigOCanvas {...defaultProps} selectedComplexity="O(n log n)" />);
      const button = screen.getByRole('button', { name: /check answer/i });

      expect(button).not.toBeDisabled();
    });

    it('should call onSubmit when Check Answer button is clicked', () => {
      mockGetClosestComplexity.mockReturnValue(3);

      render(<BigOCanvas {...defaultProps} selectedComplexity="O(n log n)" />);
      const button = screen.getByRole('button', { name: /check answer/i });

      fireEvent.click(button);

      expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
