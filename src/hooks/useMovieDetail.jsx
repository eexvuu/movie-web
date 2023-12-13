import axios from "axios";
import { useEffect, useReducer } from "react";
import { API_KEY, URL } from "../api";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: false };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: false, detail: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
function useMovieDetail(id) {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: false,
    detail: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axios.get(URL, {
          params: {
            apikey: API_KEY,
            i: id,
          },
        });

        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (e) {
        dispatch({ type: "FETCH_ERROR" });
      }
    };

    fetchData();
  }, [id]);

  return { ...state };
}

export default useMovieDetail;
