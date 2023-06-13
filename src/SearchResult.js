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
      console.log("setstate in searchresult");
      this.data = nextData;
      console.log("this.data", this.data);

      this.render();
    };

    this.render();
  }

  render() {
    console.log("in render", this.data);
    this.$searchResult.innerHTML = this.data
      .map(
        (cat) => `
            <div class="item">
              <img src=${cat.url} alt=${cat.name} />
            </div>
          `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });
  }
}
