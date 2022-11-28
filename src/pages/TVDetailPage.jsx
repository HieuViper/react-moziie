import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import Search from "../components/search/Search";
import { API_THEMOVIEDB, fetcher } from "../config/config";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CastMovieDetail from "../components/cast/CastMovieDetail";
import ReviewsMovieDetail from "../components/reviews/ReviewsMovieDetail";
import SimilarMovieDetail from "../components/similar/SimilarMovieDetail";
import SimilarTVDetail from "../components/similar/SimilarTVDetail";
import CastTVDetail from "../components/cast/CastTVDetail";
import ReviewTVDetail from "../components/reviews/ReviewTVDetail";

const TVDetailPage = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("1");
  const [searchRs, setSearchRs] = useState("");
  console.log(
    "🚀 ~ file: TVDetailPage.jsx ~ line 19 ~ TVDetailPage ~ searchRs",
    searchRs
  );
  const menuRef = useRef(null);
  const { tvshowId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/tv/${tvshowId}?api_key=${API_THEMOVIEDB}`,
    fetcher
  );
  console.log(
    "🚀 ~ file: TVDetailPage.jsx ~ line 18 ~ TVDetailPage ~ data",
    data
  );

  let temp;
  if (menuRef.current) {
    temp = menuRef.current;
    temp.classList.remove(
      "pb-1",
      "font-medium",
      "-translate-y-2",
      "border-b-2",
      "border-primary",
      "text-white"
    );
  }

  useEffect(() => {
    menuRef.current &&
      menuRef.current.classList.add(
        "pb-1",
        "font-medium",
        "-translate-y-2",
        "border-b-2",
        "border-primary",
        "text-white"
      );
  }, [currentTab]);
  if (!data) return null;

  const {
    backdrop_path,
    poster_path,
    overview,
    title,
    spoken_languages,
    imdb_id,
    first_air_date,
    episode_run_time,
    status,
    vote_average,
    tagline,
    genres,
    id,
  } = data;

  const handleTabMenu = (e) => {
    setCurrentTab(e.target.id);
    // console.log("rtaget", e.target.dataset.tab);
  };

  if (searchRs !== "") {
    navigate("/tv-shows", { state: searchRs });
  }

  return (
    <div className="page-container flex gap-5">
      <div className="basis-4/5 relative">
        <div className="h-[350px] w-full relative">
          <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent"></div>
          <img
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt=""
            className="w-full h-[350px] object-cover bg-no-repeat rounded-lg "
          />
          <div className="absolute inset-10 flex items-end justify-between">
            <div className="ml-[250px]">
              <div className="text-4xl font-bold pb-6">{title}</div>
              <div className="flex items-center gap-x-3 max-w-[400px] flex-wrap">
                {genres.map((item) => (
                  <button
                    className="py-2 px-4 mb-2 rounded-3xl border border-white uppercase w-fit hover:opacity-80"
                    key={item.id}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="flex items-center py-4 px-6 bg-primary rounded-3xl gap-1 text-xl hover:opacity-80"
              onClick={() => navigate(`/tv-shows/${id}/watch`, { state: id })}
            >
              Watch Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                />
              </svg>
            </button>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt=""
            className="absolute w-full max-w-[200px] h-[250px] bottom-0 translate-y-1/4 ml-2 rounded-xl z-10"
          />
        </div>

        <div className="w-full py-5 flex">
          <div className="basis-2/12 flex flex-col pb-10 gap-28 justify-end items-center border-r border-r-slate-700 min-h-[380px]">
            <div className="rating">
              <div className="uppercase text-lg font-bold pb-5">Rating</div>
              <div className="w-14 h-14 mx-auto">
                <CircularProgressbarWithChildren
                  value={vote_average * 10}
                  text={`${vote_average.toFixed(1)}`}
                  styles={buildStyles({
                    textSize: "28px",
                    textColor: "white",
                    trailColor: "transparent",
                    pathColor: "#ED213A",
                  })}
                />
              </div>
            </div>
            <div className="ep-length flex flex-col items-center">
              <div className="uppercase font-bold mb-3">EP LENGTH</div>
              <div className="text-gray-400">
                <span className="text-lg mr-1">{episode_run_time[0]}</span>
                <span>min</span>
              </div>
            </div>
          </div>
          <div className="basis-7/12 flex flex-col justify-center items-center gap-7 px-10 border-r border-r-slate-700">
            <div className="menu flex gap-10 text-xl text-gray-400">
              <button
                className=" hover:text-white transition-all pb-1  font-medium -translate-y-2 border-b-2 border-primary text-white"
                id="1"
                onClick={handleTabMenu}
                ref={currentTab === "1" ? menuRef : null}
              >
                Overall
              </button>
              <button
                id="2"
                className="hover:text-white transition-all "
                onClick={handleTabMenu}
                ref={currentTab === "2" ? menuRef : null}
              >
                Cast
              </button>
              <button
                id="3"
                className=" hover:text-white transition-all"
                onClick={handleTabMenu}
                ref={currentTab === "3" ? menuRef : null}
              >
                Reviews
              </button>
            </div>

            {currentTab === "1" ? (
              <Overall
                tagline={tagline}
                overview={overview}
                status={status}
                first_air_date={first_air_date}
                spoken_languages={spoken_languages}
              />
            ) : (
              ""
            )}

            {currentTab === "2" ? <CastTVDetail /> : ""}
            {currentTab === "3" ? <ReviewTVDetail /> : ""}
          </div>
          <div className="basis-3/12 pl-5">
            <Media />
          </div>
        </div>
      </div>
      <div className="basis-1/5">
        <div className="w-[250px] mb-5">
          <Search
            placeholder="Search..."
            search={searchRs}
            setSearch={setSearchRs}
          ></Search>
        </div>
        <p className="text-xl font-semibold mb-3">Similar</p>
        <SimilarTVDetail tvshowId={tvshowId} />
      </div>
    </div>
  );
};

function Overall({
  tagline,
  overview,
  status,
  first_air_date,
  spoken_languages,
}) {
  return (
    <>
      <div className="title text-lg italic">{tagline}</div>
      <div className="story">
        <div className="uppercase font-bold text-lg mb-3">Story</div>
        <p className="text-gray-400">{overview}</p>
      </div>
      <div className="details self-start">
        <div className="uppercase font-bold text-lg mb-3">Details</div>
        <p className="text-gray-400">Status: {status}</p>
        <p className="text-gray-400">Last air date: {first_air_date}</p>
        <p className="text-gray-400">
          Language: {spoken_languages.map((item) => item.english_name + " / ")}
        </p>
      </div>
    </>
  );
}

function Media() {
  //https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>
  const { tvshowId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/tv/${tvshowId}/videos?api_key=${API_THEMOVIEDB}`,
    fetcher
  );

  if (!data) return null;

  if (data.results.length <= 0) return null;
  const { results } = data;
  console.log("🚀 ~ file: TVDetailPage.jsx ~ line 241 ~ Media ~ data", data);
  return (
    <>
      <div className="uppercase text-lg font-bold mb-6">Media</div>
      {results.slice(0, 2).map((item) => (
        <div className="" key={item.id}>
          <div className="w-[250px] h-[150px] bg-slate-700 mb-2">
            <iframe
              width="250"
              height="150"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="Black Adam | Noah Centineo & Quintessa Swindell Interview | DC"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="text-gray-200 inline-block mb-2 w-[250px]">
            <p className="whitespace-nowrap overflow-hidden truncate">
              {item.name}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default TVDetailPage;
