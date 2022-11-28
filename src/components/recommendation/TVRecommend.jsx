import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { API_THEMOVIEDB, fetcher } from "../../config/config";
import MovieCard from "../moviecard/MovieCard";

//https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1
const TVRecommend = ({ tvshowId }) => {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/tv/${tvshowId}/recommendations?api_key=${API_THEMOVIEDB}`,
    fetcher
  );
  if (!data) return null;
  if (data.results.length <= 0) return null;
  const { results } = data;
  console.log(
    "🚀 ~ file: TVRecommend.jsx ~ line 13 ~ TVRecommend ~ results",
    results
  );

  return (
    <div className="recommendation w-[80%] select-none h-full min-h-[600px]">
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

export default TVRecommend;
