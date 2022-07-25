import { logEvent } from "firebase/analytics";
import useStore from "../Store/useStore";

const useAnalytics = () => {
  const { analytics } = useStore();

  const addLog = (eventName, properties = {}) => {
    if (!eventName) return;
    try {
      logEvent(analytics, `Web_${eventName}`, {
        ...properties,
        location: window?.location?.pathname,
      });
    } catch (err) {}
  };

  return { addLog };
};

export default useAnalytics;
