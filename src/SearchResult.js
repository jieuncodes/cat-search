export default class SearchResult {
  constructor({ $app, initialData, onClick }) {
    this.$target = document.querySelector(".results");
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    this.$target.appendChild(this.$searchResult);
    $app.appendChild(this.$target);

    this.data = initialData;
    this.onClick = onClick;

    this.setState = (nextData) => {
      this.data = nextData;

      this.render();
    };

    this.render();
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat) => `
            <div class="item">
              <img data-id=${cat.id} data-name=${cat.name} src=${cat.url} alt=${cat.name} />
            </div>
          `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", (event) => {
        this.onClick(event.target.dataset.id);
      });
      $item.addEventListener("mouseenter", (event) => {
        const hoverBox = document.createElement("div");
        hoverBox.className = "hover-box";

        const imgElement = event.currentTarget.firstElementChild;
        hoverBox.innerHTML = imgElement.dataset.name;
        $item.appendChild(hoverBox);
      });
      $item.addEventListener("mouseleave", (event) => {
        const hoverBox = document.querySelector(".hover-box");
        if (hoverBox) {
          $item.removeChild(hoverBox);
        }
      });
    });
  }
}
