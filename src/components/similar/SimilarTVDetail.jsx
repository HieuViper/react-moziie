import React from "react";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { fetcher, API_THEMOVIEDB } from "../../config/config";
import MovieCard from "../moviecard/MovieCard";

const SimilarTVDetail = ({ tvshowId }) => {
  //https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>
  // if (!tvshowId) return null;
  console.log(
    "🚀 ~ file: SimilarTVDetail.jsx ~ line 8 ~ SimilarTVDetail ~ tvshowId",
    tvshowId
  );
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/tv/${tvshowId}/similar?api_key=${API_THEMOVIEDB}`,
    fetcher
  );
  if (!data) return null;
  if (data.results.length <= 0) return null;
  const { results } = data;
  console.log(
    "🚀 ~ file: SimilarTVDetail.jsx ~ line 7 ~ SimilarTVDetail ~ data",
    results
  );

  return (
    <div className="similar w-full pl-5 select-none h-full">
      <Swiper
        grabCursor={"true"}
        slidesPerView={2}
        direction={"vertical"}
        // spaceBetween={30}
        // navigation={true}
        modules={[Pagination, Navigation]}
        pagination={{
          clickable: true,
        }}
        autoHeight={"true"}
        // height={"400px"}
      >
        {results.length > 0 &&
          results.slice(0, 10).map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SimilarTVDetail;
