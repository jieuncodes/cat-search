export default class SearchInput {
  constructor({ $app, onSearch }) {
    this.onSearch = onSearch;
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.autofocus = true;

    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";
    $app.appendChild($searchInput);

    $searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        onSearch(e.target.value);
      }
    });

    $searchInput.addEventListener("click", () => ($searchInput.value = ""));

    console.log("SearchInput created.", this);
  }
  render() {}
}
