import { drawAxes, drawComplexityCurves, getClosestComplexity, setupCanvas } from './canvas.helpers';

describe('canvas.helpers', () => {
  describe('getClosestComplexity', () => {
    const width = 400;
    const height = 300;

    it('should return a valid complexity index when mouse is near a curve', () => {
      const result = getClosestComplexity(200, 200, width, height);

      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should return undefined when mouse is not near curves', () => {
      const result = getClosestComplexity(0, 0, width, height);

      expect(result).toBeUndefined();
    });
  });

  describe('drawComplexityCurves', () => {
    it('should draw curves for complexities', () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const width = 400;
      const height = 300;

      if (!context) {
        throw new Error('Failed to get canvas context');
      }
      context.beginPath = jest.fn();
      context.moveTo = jest.fn();
      context.lineTo = jest.fn();
      context.stroke = jest.fn();

      drawComplexityCurves(context, width, height);

      expect(context.beginPath).toHaveBeenCalled();
      expect(context.moveTo).toHaveBeenCalled();
      expect(context.lineTo).toHaveBeenCalled();
      expect(context.stroke).toHaveBeenCalled();
    });
  });

  describe('drawAxes', () => {
    it('should draw axis lines', () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Failed to get canvas context');
      }

      context.beginPath = jest.fn();
      context.moveTo = jest.fn();
      context.lineTo = jest.fn();
      context.fillText = jest.fn();

      drawAxes(context, 400, 300, 50);

      expect(context.moveTo).toHaveBeenCalled();
      expect(context.lineTo).toHaveBeenCalled();
      expect(context.fillText).toHaveBeenCalledTimes(2);
    });
  });

  describe('setupCanvas', () => {
    it('should setup canvas for device pixel ratio', () => {
      Object.defineProperty(globalThis, 'devicePixelRatio', {
        value: 2,
      });
      const canvas = document.createElement('canvas');
      const width = 400;
      const height = 300;

      const context = setupCanvas(canvas, width, height);

      expect(context?.scale).toHaveBeenCalledWith(2, 2);
      expect(canvas.width).toBe(width * 2);
      expect(canvas.height).toBe(height * 2);
    });
  });
});
