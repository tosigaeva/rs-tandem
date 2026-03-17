import { render } from '@testing-library/react';

import { SpinnerCustom } from './SpinnerCustom';

describe('SpinnerCustom', () => {
  it('locks body scroll on load and unsets it on destroy', () => {
    const { unmount } = render(<SpinnerCustom />);

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('unset');
  });
});
