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
  const leftSideStats = document.querySelectorAll(
    "#left-summary .notification"
  );
  const rightSideStats = document.querySelectorAll(
    "#right-summary .notification"
  );

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];
    const leftValue = parseInt(leftStat.dataset.value);
    const rightValue = parseInt(rightStat.dataset.value);
    if (leftValue < rightValue) {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");
    } else {
      rightStat.classList.remove("is-primary");
      rightStat.classList.add("is-warning");
    }
  });
};

const movieTemplate = (movieDetail) => {
  const boxOffice = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
  );
  const metaScore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ""));
  const awards = movieDetail.Awards.split(" ").reduce((acc, cVal) => {
    let val = parseInt(cVal);
    return isNaN(val) ? acc : acc + val;
  }, 0);

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
    <article data-value=${awards} class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value=${boxOffice} class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metaScore} class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};
