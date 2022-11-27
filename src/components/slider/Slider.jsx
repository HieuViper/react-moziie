import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import useSWR from "swr";
import { API_THEMOVIEDB, fetcher } from "../../config/config";
import { useNavigate } from "react-router-dom";
import Genres from "./getGenre";
import { useEffect } from "react";

const Slider = ({ type }) => {
  const [genres, setGenres] = useState();
  console.log("🚀 ~ file: Slider.jsx ~ line 12 ~ Slider ~ genres", genres);
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=${API_THEMOVIEDB}`,
    fetcher
  );

  const movies = data?.results || [];
  console.log("🚀 ~ file: Slider.jsx ~ line 12 ~ Slider ~ movies", movies);
  const navigate = useNavigate();

  useEffect(() => {
    setGenres(Genres);
  }, []);
  return (
    <section className="slider h-[500px] page-container">
      <Swiper
        grabCursor={"true"}
        spaceBetween={40}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{
          clickable: true,
        }}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide
              key={item.id}
              onClick={() => navigate(`/movies/${item.id}`)}
            >
              <div className="w-full h-full rounded-lg relative">
                <div className="absolute opacity-0 transition-all hover:opacity-70 flex justify-center items-center inset-0 z-10 bg-gradient-to-t rounded-full from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] ">
                  <div className="p-5 flex justify-center text-center bg-white rounded-full w-[100px] h-[100px] cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="url(#MyGradient)"
                      viewBox="0 0 24 24"
                      strokeWidth="0"
                      stroke="currentColor"
                      className="w-10 h-10 block my-auto"
                    >
                      <defs>
                        <linearGradient id="MyGradient">
                          <stop offset="5%" stopColor="#ED213A" />
                          <stop offset="95%" stopColor="#93291E" />
                        </linearGradient>
                      </defs>
                      <path
                        stopColor="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                      />
                    </svg>
                  </div>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt=""
                  className="w-full h-full object-cover rounded-lg opacity-90"
                />
                <div className="absolute bottom-5 left-8 flex flex-col gap-2">
                  <span className="title text-white text-2xl capitalize font-semibold">
                    {item.title}
                  </span>
                  <span className="release text-white text-lg ">
                    {item.release_date}
                  </span>
                  <div className="mt-2 flex items-center gap-x-4">
                    {/* <div className="p-3 border border-white text-center text-white rounded-xl">
                      Advanture
                    </div>
                    <div className="p-3 border border-white text-center text-white rounded-xl">
                      Advanture
                    </div> */}
                    {item.genre_ids.map((item) => (
                      <button
                        className="p-3 border border-white text-center text-white rounded-xl"
                        key={item.id}
                      >
                        {genres &&
                          genres.genres.map((genre) =>
                            genre.id === item ? genre.name : ""
                          )}
                      </button>
                    ))}
                  </div>

                  <span className="description text-white text-md">
                    {item.overview}
                  </span>
                </div>

                <div className="absolute top-5 right-8 text-white  ">
                  <div className="rounded-2xl py-2 px-3 bg-indigo-900 flex items-center gap-x-1">
                    7.5
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
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Slider;
