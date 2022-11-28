import { Fragment, lazy, Suspense } from "react";
import "./App.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Route, Routes } from "react-router-dom";
import Main from "./layout/Main";

const HomePage = lazy(() => import("./pages/HomePage"));
const TVPage = lazy(() => import("./pages/TVPage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const TVDetailPage = lazy(() => import("./pages/TVDetailPage"));
const MovieWatch = lazy(() => import("./pages/MovieWatch"));
const TVWatch = lazy(() => import("./pages/TVWatch"));

function App() {
  return (
    <Fragment>
      <Suspense>
        <Routes>
          <Route element={<Main></Main>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route path="/tv-shows" element={<TVPage></TVPage>}></Route>
            <Route
              path="/movies/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
            <Route
              path="/tv-shows/:tvshowId"
              element={<TVDetailPage></TVDetailPage>}
            ></Route>
            <Route
              path="/movies/:movieId/watch"
              element={<MovieWatch></MovieWatch>}
            ></Route>
            <Route
              path="/tv-shows/:tvshowId/watch"
              element={<TVWatch></TVWatch>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
