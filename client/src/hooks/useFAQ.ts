import { useState } from 'react';

export function useFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return {
    activeIndex,
    toggleFAQ,
  };
}