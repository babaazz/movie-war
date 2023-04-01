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
