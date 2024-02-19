import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./card.css";

export default function card() {
  const [formData, setData] = useState("");
  const [responseData, setResponse] = useState({ data: null, loading: true });

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

  return (
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
  );
}
