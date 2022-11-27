import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const MovieCardSkeleton = () => {
  return (
    <div className="select-none relative w-[200px] h-[350px] flex flex-col justify-start items-center gap-y-2 opacity-80 hover:opacity-100 hover:scale-105 ease-in duration-200 cursor-pointer">
      {/* <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-[250px] rounded-xl object-cover"
      /> */}
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="12px"
      ></LoadingSkeleton>
      <div className="absolute top-3 left-4">
        <LoadingSkeleton
          width="60px"
          height="30px"
          radius="12px"
        ></LoadingSkeleton>
      </div>
      <div className="title text-white mx-auto">
        <LoadingSkeleton
          width="100px"
          height="16px"
          radius="6px"
        ></LoadingSkeleton>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
