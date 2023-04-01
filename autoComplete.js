const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input is-primary" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    dropdown.classList.add("is-active");

    resultsWrapper.innerHTML = "";

    if (input.value === "") dropdown.classList.remove("is-active");

    if (!items.length) {
      const p = document.createElement("p");
      p.innerText = "Not Found";
      resultsWrapper.appendChild(p);
    } else {
      items.forEach((item) => {
        const option = document.createElement("a");

        option.classList.add("dropdown-item");

        option.innerHTML = renderOption(item);

        option.addEventListener("click", (event) => {
          dropdown.classList.remove("is-active");
          input.value = inputValue(item);
          onOptionSelect(item);
        });

        resultsWrapper.appendChild(option);
      });
    }
  };

  input.addEventListener("input", debounce(onInput, 500));

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
