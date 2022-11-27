import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>
const Search = ({ placeholder, setSearch }) => {
  // const [search, setSearch] = useState("");
  // const { data, error } = useSWR(
  //   `https://api.themoviedb.org/3/search/movie?api_key=${API_THEMOVIEDB}&query=${search}`,
  //   fetcher
  // );

  // const movies = data?.results || [];
  // console.log(
  //   "🚀 ~ file: MoviePage.jsx ~ line 13 ~ MoviePage ~ movies",
  //   movies
  // );
  const [searchRs, setSearchRs] = useState("");
  const searchInput = useRef(null);

  const handleChange = (e) => {
    setSearchRs(e.target.value);
  };

  const handlePressEnter = (e) => {
    if (e.keyCode === 13) {
      setSearch(document.querySelector("#search").value);
    }
  };
  const handleClick = (e) => {
    setSearch(document.querySelector("#search").value);
  };
  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
  }, []);
  return (
    <div className="flex justify-center items-center mx-auto">
      <input
        type="text"
        id="search"
        className="rounded-lg p-4 text-white bg-transparent w-full border border-primary outline-none rounded-r-none"
        placeholder={placeholder}
        ref={searchInput}
        onChange={handleChange}
        onKeyDown={handlePressEnter}
        value={searchRs}
      />
      <button
        className="p-4 rounded-lg bg-primary text-white border border-primary rounded-l-none"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Search;
