import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
  angle: number;
  distance: number;
}

interface UseMousePositionOptions {
  centerX?: number;
  centerY?: number;
  throttle?: number;
}

export function useMousePosition(options: UseMousePositionOptions = {}): MousePosition {
  const { centerX = 0, centerY = 0, throttle = 16 } = options;
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    angle: 0,
    distance: 0,
  });

  const lastUpdateRef = useRef<number>(Date.now());

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdateRef.current < throttle) return;
      lastUpdateRef.current = now;

      const x = event.clientX;
      const y = event.clientY;

      // Calculate angle from center point
      const deltaX = x - centerX;
      const deltaY = y - centerY;
      const angle = Math.atan2(deltaY, deltaX);

      // Calculate distance from center
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      setPosition({
        x,
        y,
        angle,
        distance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [centerX, centerY, throttle]);

  return position;
}
