import React from "react";
import { useNavigate } from "react-router-dom";

// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
const TVCard = ({ item }) => {
  console.log("🚀 ~ file: MovieCard.jsx ~ line 5 ~ MovieCard ~ item", item);
  const { name, poster_path, vote_average, id } = item;
  const navigate = useNavigate();

  // item.length > 0 && (const { name, release_date, poster_path, vote_average } = { item };)
  return (
    <div
      onClick={() => navigate(`/tv-shows/${id}`)}
      className="select-none relative w-[200px] h-[350px] flex flex-col justify-start items-center gap-y-2 opacity-80 hover:opacity-100 hover:scale-105 ease-in duration-200 cursor-pointer"
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-[250px] rounded-xl object-cover"
      />
      <div className="absolute top-3 left-4 text-white  ">
        <div className="rounded-xl text-xs py-2 px-2 bg-indigo-900 flex items-center gap-x-1">
          {vote_average.toFixed(1)}
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="13"
            width="13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
          </svg>
        </div>
      </div>
      <div className="name text-white mx-auto">{name}</div>
    </div>
  );
};

export default TVCard;
