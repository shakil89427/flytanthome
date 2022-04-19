import { useLayoutEffect } from "react";

const Scroll = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default Scroll;
