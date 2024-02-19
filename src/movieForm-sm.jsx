import React from "react";
import { useState } from "react";
import "./App.css";
import SearchIcon from "@mui/icons-material/Search";
import "./movieForm-sm.css";

export default function ({
  movieName,
  inputStyle,
  buttonStyle,
  containerStyle,
  h1Style,
}) {
  const [movie, setMovie] = useState("");
  const changeHandle = (e) => {
    setMovie((m) => e.target.value);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    movieName(movie);
    setMovie("");
  };

  return (
    <form style={containerStyle} className="movieForm" onSubmit={submitHandle}>
      <h1 style={h1Style}>DownTime</h1>

      <input
        style={inputStyle}
        type="text"
        value={movie}
        onChange={changeHandle}
        placeholder="Search a movie.."
      />
      <button
        onClick={submitHandle}
        variant="contained"
        className="buttonStyle"
        style={buttonStyle}
      >
        Search
      </button>
    </form>
  );
}
