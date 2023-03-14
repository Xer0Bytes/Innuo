import { useEffect, useState } from "react";

export const UseIntersectionObserver = (ref) => {
  const [isVisible, SetIsVisible] = useState();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      SetIsVisible(entry.isIntersecting);
    });
    observer.observe(ref.current);
  }, [ref]);
  return isVisible;
};

export default UseIntersectionObserver;
