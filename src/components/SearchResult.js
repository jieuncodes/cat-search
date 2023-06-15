export default class SearchResult {
  constructor({ $app, initialData, onClick, initialLoadingState }) {
    this.$target = document.querySelector(".results");
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    this.$target.appendChild(this.$searchResult);
    $app.appendChild(this.$target);

    this.data = initialData;
    this.onClick = onClick;
    this.isLoading = initialLoadingState;

    this.setState = (nextState) => {
      this.data = nextState.data;
      this.isLoading = nextState.isLoading;
      this.render();
    };

    document.addEventListener("mouseenter", this.onMouseEnter.bind(this), true);
    document.addEventListener("mouseleave", this.onMouseLeave.bind(this), true);
    this.addImageEventListeners();
  }

  render() {
    if (!this.isLoading) {
      if (!this.data || this.data.length === 0) {
        this.$searchResult.innerHTML = `<div class="no-result">검색 결과가 없습니다.</div>`;
      } else {
        this.$searchResult.innerHTML = this.data
          .map(
            (cat) => `
                    <div class="item">
                      <img loading="lazy" data-id=${cat.id} data-name=${cat.name} src=${cat.url} alt=${cat.name} />
                    </div>
                  `
          )
          .join("");
      }
    }
  }

  onMouseEnter(event) {
    if (
      !(event.target instanceof Element) ||
      !event.target.matches(".SearchResult .item img")
    ) {
      return;
    }
    const hoverBox = document.createElement("div");
    hoverBox.className = "hover-box";
    hoverBox.innerHTML = event.target.dataset.name;
    event.target.parentNode.appendChild(hoverBox);
  }

  onMouseLeave(event) {
    if (
      !(event.target instanceof Element) ||
      !event.target.matches(".SearchResult .item img")
    ) {
      return;
    }

    const hoverBox = event.target.parentNode.querySelector(".hover-box");
    if (hoverBox) {
      event.target.parentNode.removeChild(hoverBox);
    }
  }

  addImageEventListeners() {
    document.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      if (!id) return;
      this.onClick(id);
    });
  }
}
