const fetchData = async (searchInput) => {
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
};

const root = document.querySelector(".autoComplete");
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input is-primary" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);

  resultsWrapper.innerHTML = "";
  dropdown.classList.add("is-active");

  if (input.value === "") dropdown.classList.remove("is-active");

  if (!movies.length) {
    const p = document.createElement("p");
    p.innerText = "No Movies Found";
    resultsWrapper.appendChild(p);
  } else {
    movies.forEach((movie) => {
      const item = document.createElement("a");
      const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
      item.classList.add("dropdown-item");
      item.innerHTML = `
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
      `;
      resultsWrapper.appendChild(item);
    });
  }
};

input.addEventListener("input", debounce(onInput, 500));

document.addEventListener("click", (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});
