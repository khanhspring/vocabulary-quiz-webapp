'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

type Props = {
  seconds: number;
};

export default function Countdown({ seconds }: Props) {
  const [timeLeft, setTimeLeft] = useState(0);
  const ref = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (seconds > 0) {
      setTimeLeft(seconds);
      ref.current = setInterval(() => {
        setTimeLeft((prevState) => {
          if (prevState > 0) {
            return prevState - 1;
          }
          clearInterval(ref.current);
          return 0;
        });
      }, 1000);
    }
    return () => {
      clearInterval(ref.current);
    };
  }, [seconds]);

  return <span>{timeLeft}s</span>;
}
