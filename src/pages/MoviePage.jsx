import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useSWR from "swr";
import MovieCard from "../components/moviecard/MovieCard";
import Search from "../components/search/Search";
import { API_THEMOVIEDB, fetcher } from "../config/config";
import ReactPaginate from "react-paginate";
import MovieCardSkeleton from "../components/skeleton/MovieCardSkeleton";

const itemsPerPage = 20;
const MoviePage = () => {
  const [nextPage, setNextPage] = useState(1);
  console.log(
    "🚀 ~ file: MoviePage.jsx ~ line 14 ~ MoviePage ~ nextPage",
    nextPage
  );
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const { state } = useLocation();
  console.log("🚀 ~ file: MoviePage.jsx ~ line 12 ~ MoviePage ~ state", state);
  const [search, setSearch] = useState("");
  console.log(
    "🚀 ~ file: MoviePage.jsx ~ line 11 ~ MoviePage ~ search",
    search
  );
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_THEMOVIEDB}`
  );
  console.log("🚀 ~ file: MoviePage.jsx ~ line 31 ~ MoviePage ~ url", url);
  const { data, error } = useSWR(url, fetcher);
  console.log("🚀 ~ file: MoviePage.jsx ~ line 26 ~ MoviePage ~ data", data);

  const movies = data?.results || [];
  console.log(
    "🚀 ~ file: MoviePage.jsx ~ line 13 ~ MoviePage ~ movies",
    movies
  );

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
    console.log(event.selected);
  };

  // const loading = !data && !error;
  const isLoading = !data && !error;

  useEffect(() => {
    if (state !== null && search === "") setSearch(state);
  }, [state]);

  useEffect(() => {
    if (search === "" || nextPage !== 1) {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_THEMOVIEDB}&page=${nextPage}`
      );
    } else if (search !== "" || nextPage !== 1) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_THEMOVIEDB}&query=${search}&page=${nextPage}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_THEMOVIEDB}&page=${nextPage}`
      );
    }
  }, [search, nextPage]);

  return (
    <Fragment>
      <div className="page-container mb-10 w-[300px]">
        <Search
          placeholder="Find films that best fit you..."
          search={search}
          setSearch={setSearch}
        ></Search>
      </div>
      {/* {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto mb-5 animate-spin"></div>
      )} */}
      {isLoading && (
        <div className="flex flex-wrap justify-center items-center page-container gap-10 ">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className="flex flex-wrap justify-center items-center page-container gap-10 ">
        {!isLoading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </Fragment>
  );
};

export default MoviePage;
