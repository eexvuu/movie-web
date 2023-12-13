import axios from "axios";
import { useEffect, useReducer } from "react";
import { API_KEY, URL } from "../api";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, movies: [], loading: true, error: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        movies: action.payload.movies,
        totalPage: Math.ceil(action.payload.totalResults / 10),
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

function useMovieSearch(query, pageNumber) {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: false,
    totalPage: 0,
    movies: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axios.get(URL, {
          params: {
            apikey: API_KEY,
            s: query,
            page: pageNumber,
          },
        });

        if (res.data.Response === "False") {
          dispatch({ type: "FETCH_ERROR" });
        } else {
          dispatch({
            type: "FETCH_SUCCESS",
            payload: {
              movies: res.data.Search,
              totalResults: res.data.totalResults,
            },
          });
        }
      } catch (e) {
        dispatch({ type: "FETCH_ERROR" });
      }
    };

    fetchData();
  }, [query, pageNumber]);

  return { ...state };
}

export default useMovieSearch;
