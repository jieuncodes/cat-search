import { getLocalStorageData } from "../util/storageHandler.js";

export default class SearchHistory {
  constructor({ onClick }) {
    this.onClick = onClick;
    this.savedLocalStorage = getLocalStorageData();

    const searchHistoryContainer = document.getElementById("recent-search");
    this.$target = this.createHistoryList(searchHistoryContainer);

    this.setState = this.updateState.bind(this);
    this.render = this.renderList.bind(this);
    this.render();
    this.setupClickHandler();
  }

  createHistoryList(container) {
    const list = document.createElement("ul");
    container.appendChild(list);
    return list;
  }

  updateState() {
    this.savedLocalStorage = getLocalStorageData();
    this.render();
  }

  renderList() {
    const fiveRecentKeyword = this.savedLocalStorage.slice(-5).reverse();
    this.$target.innerHTML = fiveRecentKeyword
      .map((keyword) => `<li data-btn-type="history">${keyword}</li>`)
      .join(" ");
  }

  setupClickHandler() {
    this.$target.addEventListener("click", (e) => {
      if (e.target.dataset.btnType !== "history") {
        return;
      }
      const keyword = e.target.innerText;
      this.onClick(keyword);
    });
  }
}
