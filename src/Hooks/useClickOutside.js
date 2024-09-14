// We are adding event handler inside useEffect hook since we need to remove it
import { useEffect, useRef } from "react";
export default function useClickOutiside(closeFunction) {
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        closeFunction();
      }
    }
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [closeFunction]);
  return { ref };
}
