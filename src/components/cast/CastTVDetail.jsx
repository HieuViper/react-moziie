import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { API_THEMOVIEDB, fetcher } from "../../config/config";

//https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
const CastTVDetail = () => {
  const { tvshowId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/tv/${tvshowId}/credits?api_key=${API_THEMOVIEDB}`,
    fetcher
  );
  console.log(data);
  if (!data) return null;
  if (data.cast.length <= 0) return null;
  const { cast } = data;
  console.log(
    "🚀 ~ file: CastTVDetail.jsx ~ line 17 ~ CastTVDetail ~ cast",
    cast
  );
  return (
    <div className="min-h-[380px] max-h-[380px] w-full">
      <div className="grid grid-cols-2 gap-10 ">
        {cast.slice(0, 8).map((item) => (
          <div className="flex items-center gap-2">
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
              className="rounded-full h-11 w-11 object-cover"
              alt=""
            />
            <p className="text-gray-200">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastTVDetail;
