import { useState, useEffect, useRef } from "react";

/* Hook genérico para ejecutar una función asincrónica con estado de carga/error
   y limpieza automática (cancelación) al desmontar. */
export default function useAsync(fn, deps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    setError(null);

    fnRef
      .current()
      .then((result) => {
        if (!canceled) setData(result);
      })
      .catch((err) => {
        if (!canceled) setError(err?.message ?? "Unknown error");
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, deps);

  return { data, loading, error };
}
