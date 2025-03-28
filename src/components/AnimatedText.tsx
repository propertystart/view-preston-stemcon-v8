
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string | React.ReactNode;
  className?: string;
  once?: boolean;
  threshold?: number;
  delay?: number;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
  tag?: keyof JSX.IntrinsicElements;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  once = true,
  threshold = 0.1,
  delay = 0,
  animation = 'fade',
  tag: Tag = 'div'
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100');
              
              switch (animation) {
                case 'fade':
                  entry.target.classList.add('animate-fade');
                  break;
                case 'slide-up':
                  entry.target.classList.add('animate-slide-up');
                  break;
                case 'slide-down':
                  entry.target.classList.add('animate-slide-down');
                  break;
                case 'slide-left':
                  entry.target.classList.add('animate-slide-left');
                  break;
                case 'slide-right':
                  entry.target.classList.add('animate-slide-right');
                  break;
                default:
                  entry.target.classList.add('animate-fade');
              }
              
              if (once) {
                observer.unobserve(entry.target);
              }
            }, delay);
          } else if (!once) {
            entry.target.classList.remove('opacity-100', `animate-${animation}`);
          }
        });
      },
      { threshold }
    );

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [animation, delay, once, threshold]);

  // Create the element with the specified tag
  return React.createElement(
    Tag,
    {
      ref: elementRef,
      className: cn('opacity-0 transform', className)
    },
    text
  );
};

export default AnimatedText;
