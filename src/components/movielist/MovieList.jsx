import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import MovieCard from "../moviecard/MovieCard";
import { API_THEMOVIEDB, fetcher } from "../../config/config";
import useSWR from "swr";
import MovieCardSkeleton from "../skeleton/MovieCardSkeleton";

const MovieList = ({ type }) => {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=${API_THEMOVIEDB}`,
    fetcher
  );

  const movies = data?.results || [];
  const isLoading = !data && !error;

  return (
    <div className="movie-list">
      {isLoading && (
        <Swiper grabCursor={"true"} spaceBetween={30} slidesPerView={5}>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
        </Swiper>
      )}
      {!isLoading && (
        <Swiper
          grabCursor={"true"}
          spaceBetween={30}
          slidesPerView={5}
          navigation={true}
          modules={[Pagination, Navigation]}
          pagination={{
            clickable: true,
          }}
        >
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default MovieList;
