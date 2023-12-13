import React, { useState } from "react";
import useMovieSearch from "../hooks/useMovieSearch";
import MovieList from "../components/MovieList";

function HomePage() {
  const [keyword, setKeyword] = useState("spider-man");
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, movies, totalPage } = useMovieSearch(
    keyword,
    pageNumber
  );

  return (
    <MovieList
      movies={movies}
      loading={loading}
      error={error}
      keyword={keyword}
      pageNumber={pageNumber}
      onPageChange={setPageNumber}
      totalPage={totalPage}
    />
  );
}

export default HomePage;
