import { useState } from "react";
import { useEffect } from "react";

export default function useDevice() {
  const [device, setDevice] = useState("desktop");
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 500) {
        setDevice("mobile");
      } else {
        setDevice("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  return [device, setDevice];
}
