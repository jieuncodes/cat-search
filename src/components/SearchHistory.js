export default class SearchHistory {
  constructor({ keywords, onClick }) {
    this.onClick = onClick;
    this.keywords = keywords;
    const searchHistoryContianer = document.getElementById("recent-search");
    this.$target = document.createElement("div");
    searchHistoryContianer.appendChild(this.$target);

    this.setState = () => {
      const parsedData =
        JSON.parse(localStorage.getItem("searchHistory")) || [];
      this.keywords = parsedData;
      this.render();
    };

    this.render = () => {
      const fiveRecentKeyword = this.keywords.slice(-5).reverse();
      this.$target.innerHTML = fiveRecentKeyword
        .map((keyword) => {
          return `<span data-btn-type="history">${keyword}</span>`;
        })
        .join(" ");
      console.log(this.$target);
    };
    this.render();
    this.handleKeywordClick();
  }
  handleKeywordClick() {
    this.$target.addEventListener("click", (e) => {
      if (!e.target.dataset.btnType === "history") {
        return;
      }
      const keyword = e.target.innerText;
      this.onClick(keyword);
    });
  }
}
