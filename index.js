const fetchData = async (searchInput) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apiKey: "50ee4742",
      s: searchInput,
    },
  });
  console.log(res.data);
};

const input = document.querySelector("input");

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);
};

input.addEventListener("input", debounce(onInput, 500));
