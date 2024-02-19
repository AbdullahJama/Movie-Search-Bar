import MovieForm from "./MovieForm";
import MovieForm2 from "./MovieForm2";
import React from "react";
import "./App.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";

export default function MovieSearchBar() {
  const [formData, setData] = useState("");
  const [responseData, setResponse] = useState({ Data: null, loading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://movies-api14.p.rapidapi.com/search",
          params: {
            query: formData,
          },
          headers: {
            "X-RapidAPI-Key":
              "bb39fbd85emshe8dd5bbe01a959fp1483dfjsn281f51c9d2c9",
            "X-RapidAPI-Host": "movies-api14.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const searchResult = response.data.contents[0];
        console.log(searchResult);

        setResponse({ data: searchResult, loading: false });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [formData]);

  const movieName = (m) => {
    setResponse({ data: null, loading: true });
    setData(m);
  };

  const buttonHandle = (B) => {
    let url;
    if (B === "button1") {
      url = responseData.data.youtube_trailer;
    } else if (B === "button2") {
      url = responseData.data.sources[0].link;
    }

    window.open(url, "_blank");
  };

  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    } else {
      return text.slice(0, limit) + "...";
    }
  };

  const truncateGenre = (genres, limit) => {
    if (Array.isArray(genres)) {
      return genres.slice(0, limit).join(", ");
    }
    return "Genre not available";
  };

  return (
    <div>
      {!responseData.data && !formData ? (
        <MovieForm movieName={movieName} />
      ) : (
        <MovieForm2 movieName={movieName} />
      )}

      {!responseData.data && formData && (
        <div className="rotating-lines-container">
          <RotatingLines
            visible={true}
            height="700px"
            strokeColor="orange"
            width=" 15vw"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperClass="rotating-lines"
          />
        </div>
      )}

      {responseData.data && (
        <div className="cardContainer">
          <Card className="movieCard">
            <CardMedia
              className="cardMedia"
              component="img"
              alt="Movie Poster"
              image={responseData.data.poster_path}
            />
            <div className="layover">
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="cardTitle"
                >
                  {responseData.data.title}
                </Typography>
                <span className="detailContainer">
                  <Typography className="genreData">
                    {truncateGenre(responseData.data.genres, 1)}
                  </Typography>
                  "<Typography className="genreData"> | </Typography>"
                  <Typography className="genreData">
                    {responseData.data.release_date}
                  </Typography>
                </span>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="overView"
                >
                  {truncateText(responseData.data.overview, 150)}
                </Typography>

                <Typography></Typography>
              </CardContent>
              <CardActions>
                <button
                  className="myButton2"
                  size="small"
                  onClick={() => buttonHandle("button1")}
                >
                  Trailer
                </button>

                <button
                  className="myButton1"
                  size="small"
                  onClick={() => buttonHandle("button2")}
                >
                  Watch it
                </button>
              </CardActions>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
