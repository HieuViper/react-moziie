import React from "react";
import Slider from "../components/slider/Slider";
import MovieList from "../components/movielist/MovieList";

const HomePage = () => {
  return (
    <div>
      <Slider type="now_playing"></Slider>
      <section className="now-playing page-container">
        <h2 className="text-white mt-10 mb-4 text-xl font-semibold">Popular</h2>
        <MovieList type="popular"></MovieList>
      </section>
      <section className="top-rated page-container">
        <h2 className="text-white mt-10 mb-4 text-xl font-semibold">
          Top Rated
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="now-playing page-container">
        <h2 className="text-white mt-10 mb-4 text-xl font-semibold">
          Now Playing
        </h2>
        <MovieList type="now_playing"></MovieList>
      </section>
      <section className="upcoming page-container">
        <h2 className="text-white mt-10 mb-4 text-xl font-semibold">
          Upcoming
        </h2>
        <MovieList type="upcoming"></MovieList>
      </section>
    </div>
  );
};

export default HomePage;
