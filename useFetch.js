import { useEffect, useState, useRef } from "react";

export const useFetch = (url) => {
  const isMounted = useRef(true);
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {
      //cleanup
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true, error: null });

    // si es true es porque todavia esta montado el componente
    /*
    if (isMounted.current) {
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          setState({
            loading: false,
            error: null,
            data,
          });
        })
        .catch(() => {
          setState({
            data: null,
            loading: false,
            error: "No se pudo cargar la info",
          });
        });
    } else {
      console.log("setState no se llamó");
    }
    */

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (isMounted.current) {
          setState({
            loading: false,
            error: null,
            data,
          });
        }
      })
      .catch(() => {
        setState({
          data: null,
          loading: false,
          error: "No se pudo cargar la info",
        });
      });
  }, [url]);

  return state;
};
