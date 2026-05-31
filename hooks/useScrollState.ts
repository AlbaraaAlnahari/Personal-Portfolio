import { useState, useEffect, useRef } from 'react';

interface ScrollState {
  scrollY: number;
  scrollVelocity: number;
  scrollDirection: 'up' | 'down' | 'idle';
  isScrolling: boolean;
  scrollProgress: number;
}

interface UseScrollStateOptions {
  idleTimeout?: number;
  velocityWindow?: number;
}

export function useScrollState(options: UseScrollStateOptions = {}): ScrollState {
  const { idleTimeout = 500, velocityWindow = 50 } = options;

  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    scrollVelocity: 0,
    scrollDirection: 'idle',
    isScrolling: false,
    scrollProgress: 0,
  });

  const lastScrollRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(Date.now());
  const idleTimeoutRef = useRef<NodeJS.Timeout>(undefined);
  const velocityHistoryRef = useRef<Array<{ velocity: number; time: number }>>([]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTimeRef.current;

      if (deltaTime > 0) {
        const deltaScroll = currentScrollY - lastScrollRef.current;
        const velocity = deltaScroll / deltaTime;

        // Add to velocity history
        velocityHistoryRef.current.push({ velocity, time: currentTime });

        // Remove old velocities outside window
        velocityHistoryRef.current = velocityHistoryRef.current.filter(
          (v) => currentTime - v.time < velocityWindow
        );

        // Calculate average velocity for smoothing
        const avgVelocity =
          velocityHistoryRef.current.length > 0
            ? velocityHistoryRef.current.reduce((sum, v) => sum + v.velocity, 0) /
              velocityHistoryRef.current.length
            : 0;

        // Determine scroll direction
        let direction: 'up' | 'down' | 'idle' = 'idle';
        if (Math.abs(avgVelocity) > 0.05) {
          direction = avgVelocity > 0 ? 'down' : 'up';
        }

        // Calculate scroll progress (0-1)
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = documentHeight > 0 ? currentScrollY / documentHeight : 0;

        setState({
          scrollY: currentScrollY,
          scrollVelocity: avgVelocity,
          scrollDirection: direction,
          isScrolling: true,
          scrollProgress: Math.min(scrollProgress, 1),
        });

        lastScrollRef.current = currentScrollY;
        lastTimeRef.current = currentTime;

        // Clear existing timeout
        if (idleTimeoutRef.current) {
          clearTimeout(idleTimeoutRef.current);
        }

        // Set new idle timeout
        idleTimeoutRef.current = setTimeout(() => {
          setState((prev) => ({
            ...prev,
            scrollDirection: 'idle',
            isScrolling: false,
            scrollVelocity: 0,
          }));
        }, idleTimeout);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [idleTimeout, velocityWindow]);

  return state;
}
