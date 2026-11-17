import { useEffect, useState } from 'react';

/** Anima o texto sem bibliotecas externas e respeita movimento reduzido. */
export default function Typewriter({ text, speed = 65, delay = 350, onComplete }) {
  const [count, setCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setCount(text.length);
      onComplete?.();
      return;
    }
    setCount(0);
    let index = 0;
    let interval;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        index += 1;
        setCount(index);
        if (index >= text.length) {
          window.clearInterval(interval);
          onComplete?.();
        }
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, speed, delay, reducedMotion, onComplete]);

  return (
    <span className="typewriter" aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {count < text.length && <span className="typing-cursor" aria-hidden="true" />}
    </span>
  );
}
