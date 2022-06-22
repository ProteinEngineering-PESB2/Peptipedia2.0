import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";

export default function useLoadingComponent() {
  const loadingContext = useLoadingContext();

  const loading = async () => {
    loadingContext.done();
  };

  useEffect(() => {
    loading();
  }, []);

  return {};
}
