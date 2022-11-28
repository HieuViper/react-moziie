import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { API_THEMOVIEDB, fetcher } from "../../config/config";
import StarRatings from "react-star-ratings";

//https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>
const ReviewTVDetail = () => {
  const { tvshowId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/tv/${tvshowId}/reviews?api_key=${API_THEMOVIEDB}`,
    fetcher
  );
  if (!data) return null;
  if (data.results.length <= 0) return null;
  const { results } = data;
  console.log(results);

  return (
    <div className="px-5 min-h-[380px] max-h-[380px] flex flex-col gap-10 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      {results.length > 0 ? (
        results.map((item) => (
          <div className="flex gap-5" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.author_details.avatar_path}`}
              className="w-16 h-16 bg-cover rounded-full"
            />
            <div className="">
              <div className="flex justify-between">
                <div className="">{item.author_details.name}</div>
                <div className="rating">
                  {item.author_details.rating && (
                    <StarRatings
                      rating={
                        parseInt(item.author_details.rating.toFixed() / 2) < 1
                          ? 1
                          : parseInt(item.author_details.rating.toFixed() / 2)
                      }
                      starRatedColor="orange"
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                      starSpacing="1px"
                    />
                  )}
                </div>
              </div>
              <div className="content text-gray-400">{item.content}</div>
            </div>
          </div>
        ))
      ) : (
        <p>There are no reviews</p>
      )}
    </div>
  );
};

export default ReviewTVDetail;
