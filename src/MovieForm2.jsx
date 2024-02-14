import React from "react";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./MovieForm2.css";

export default function ({ movieName }) {
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
    <form
      // style={containerStyle}
      className="containerStyle"
      onSubmit={submitHandle}
    >
      <h1 className="h1No2">DownTime</h1>

      <input
        className="input2"
        type="text"
        value={movie}
        onChange={changeHandle}
        placeholder="Search a movie.."
      />
      <button
        onClick={submitHandle}
        variant="contained"
        className="buttonStyle2"
        //style={buttonStyle}
      >
        Search
      </button>
    </form>
  );
}
