import React, { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <Fragment>
      <header className="header flex items-center text-white p-10">
        <div className="uppercase basis-2/4 text-2xl ">
          <Link to="/" className="inline-block cursor-pointer">
            <span className="logo1">Mo</span>
            <span className="logo2 text-yellow-500">ziie</span>
          </Link>
        </div>
        <div className="basis-2/4 flex gap-5">
          <NavLink
            end
            to="/"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Movie
          </NavLink>
          <NavLink
            to="/tv-shows"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            TV Show
          </NavLink>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
