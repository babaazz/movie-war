const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
      `;
  },
  inputValue(movie) {
    return movie.Title;
  },
  fetchData: async (searchInput) => {
    const res = await axios.get("http://www.omdbapi.com/", {
      params: {
        apiKey: "50ee4742",
        s: searchInput,
      },
    });
    if (res.data.Error) {
      return [];
    }
    return res.data.Search;
  },
};

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#left-autoComplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#left-summary"), "left");
  },
});

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#right-autoComplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#right-summary"), "right");
  },
});

const movieData = {
  leftMovie: null,
  rightMovie: null,
};

const onMovieSelect = async (movie, summaryTarget, side) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apiKey: "50ee4742",
      i: movie.imdbID,
    },
  });
  const movieDetail = res.data;
  summaryTarget.innerHTML = movieTemplate(movieDetail);

  if (side === "left") {
    movieData.leftMovie = movieDetail;
  } else {
    movieData.rightMovie = movieDetail;
  }
  if (movieData.leftMovie && movieData.rightMovie) {
    runComparison();
  }
};

const runComparison = () => {
  console.log("Time for comparison");
};

const movieTemplate = (movieDetail) => {
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};
