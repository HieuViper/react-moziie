import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSWR from "swr";
import MovieRecommend from "../components/recommendation/MovieRecommend";
import Search from "../components/search/Search";
import { API_THEMOVIEDB, fetcher } from "../config/config";

//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
const MovieWatch = () => {
  const [searchRs, setSearchRs] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${state}?api_key=${API_THEMOVIEDB}`,
    fetcher
  );
  if (!data) return null;
  if (data.length <= 0) return null;
  console.log(
    "🚀 ~ file: MovieRecommend.jsx ~ line 13 ~ MovieRecommend ~ results",
    data
  );

  const {
    backdrop_path,
    poster_path,
    overview,
    title,
    spoken_languages,
    imdb_id,
    release_date,
    runtime,
    status,
    vote_average,
    tagline,
    genres,
    id,
  } = data;

  if (searchRs !== "") {
    navigate("/movies", { state: searchRs });
  }

  return (
    <div className="page-container flex gap-10">
      <div className="basis-9/12 h-screen flex flex-col gap-4">
        <iframe
          src={`https://2embed.org/embed/movie?tmdb=${state}`}
          width="100%"
          height="500"
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
        ></iframe>
        <div className="text-2xl font-semibold">{title}</div>

        <div className="flex gap-3">
          <div className="flex items-center gap-1 ">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="15"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
            </svg>
            <p className="text-gray-400">{vote_average.toFixed(1)}</p>
          </div>
          <div className="flex items-center gap-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                clip-rule="evenodd"
              />
            </svg>

            <p className="text-gray-400">{release_date}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {genres.map((item) => (
            <button
              className="py-2 px-4 mb-2 rounded-3xl border border-white uppercase w-fit hover:opacity-80"
              key={item.id}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="">
          <div className="text-lg font-semibold">Overview:</div>
          <p className="text-gray-400">{overview}</p>
        </div>
      </div>
      <div className="basis-3/12 justify-center flex flex-col items-center ">
        <Search
          placeholder="Search..."
          search={searchRs}
          setSearch={setSearchRs}
        />
        <p className="text-xl font-semibold my-3">Recommendations</p>
        <MovieRecommend movieId={state} />
      </div>
    </div>
  );
};

export default MovieWatch;
