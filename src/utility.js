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
