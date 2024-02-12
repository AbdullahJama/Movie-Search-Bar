import MovieForm from "./MovieForm";
import React from "react";
import "./App.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";

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
      {!responseData.data && responseData.loading ? (
        <MovieForm movieName={movieName} />
      ) : (
        <MovieForm
          movieName={movieName}
          inputStyle={{
            width: "300px",
            height: "25px",
            borderRadius: "30px",
            marginRight: "15px",
            marginleft: "0px",
            marginTop: "0px",
            fontSize: "15px",
          }}
          buttonStyle={{
            borderRadius: "20px",
            marginTop: "7px",
            marginRight: "0px",
            marginLeft: "10px",
            fontSize: "15px",
            padding: "0px",
            height: "35px",
            width: "90px",
          }}
          containerStyle={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            height: "10vh",
            marginTop: "10px",
          }}
          h1Style={{
            fontSize: "30px",
            margin: "0px",
            marginRight: "20px",
            marginTop: "5px",
          }}
        />
      )}

      {responseData.data && (
        <div className="cardContainer">
          <Card
            className="movieCard"
            sx={{
              borderRadius: "30px",
              border: "3px solid orange",
              outline: "none",
            }}
          >
            <CardMedia
              sx={{ width: "100%", height: "100%" }}
              component="img"
              alt="Movie Poster"
              height="140"
              image={responseData.data.poster_path}
            />
            <div className="layover">
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    color: "white",
                    position: "relative",
                    bottom: "23px",
                    fontSize: "25px",
                    fontWeight: "30px",
                  }}
                >
                  {responseData.data.title}
                </Typography>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    bottom: "40px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "17px",
                      position: "relative",
                      bottom: "-10px",
                    }}
                  >
                    {truncateGenre(responseData.data.genres, 1)}
                  </Typography>
                  ""
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "17px",
                      position: "relative",
                      bottom: "-10px",
                    }}
                  >
                    {" "}
                    |{" "}
                  </Typography>
                  ""
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "17px",
                      position: "relative",
                      bottom: "-10px",
                    }}
                  >
                    {responseData.data.release_date}
                  </Typography>
                </span>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    color: "white",
                    fontSize: "20px",
                    position: "relative",
                    right: "15px",
                    bottom: "25px",
                    overflow: "hidden",
                  }}
                >
                  {truncateText(responseData.data.overview, 150)}
                </Typography>

                <Typography sx={{ color: "white" }}></Typography>
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
