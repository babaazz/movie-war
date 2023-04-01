const expect = chai.expect;

const waitfor = (selector) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();
      }
    }, 30);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject();
    }, 3000);
  });
};

beforeEach(() => {
  document.querySelector("#target");
  createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector("#target"),
    onOptionSelect(movie) {
      document.querySelector(".tutorial").classList.add("is-hidden");
      onMovieSelect(movie, document.querySelector("#left-summary"), "left");
    },
  });
});

it("check if dropdown is hidden", () => {
  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).not.to.include("is-active");
});

it("check if dropdown is active", async () => {
  const input = document.querySelector("input");
  input.value = "avengers";
  input.dispatchEvent(new Event("input"));

  await waitfor(".dropdown-item");

  const dropdown = document.querySelector(".dropdown");

  expect(dropdown.className).to.include("is-active");
});

it("check if dropdown items are displaying", async () => {
  const input = document.querySelector("input");
  input.value = "avengers";
  input.dispatchEvent(new Event("input"));

  await waitfor(".dropdown-item");

  const items = document.querySelectorAll(".dropdown-item");
  expect(items.length).to.equal(10);
});
