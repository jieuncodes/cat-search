export default class SearchInput {
  constructor({ $app, onSearch }) {
    this.onSearch = onSearch;
    const $target = document.querySelector("header");
    const $searchInput = document.createElement("input");
    $searchInput.className = "SearchInput";
    $searchInput.autofocus = true;
    $searchInput.placeholder = "고양이를 검색해보세요.|";

    $target.appendChild($searchInput);
    $app.appendChild($target);

    $searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        onSearch(e.target.value);
      }
    });

    $searchInput.addEventListener("click", () => ($searchInput.value = ""));

    console.log("SearchInput created.", this);
  }
}
