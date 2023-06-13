export default class Loading {
  constructor({ $app, initialState }) {
    this.state = initialState;

    this.$target = document.createElement("div");
    this.$target.className = "loading modal";

    $app.appendChild(this.$target);

    this.render = () => {
      this.$target.innerHTML = `<span>LOADING....</span>`;
      this.$target.style.display = this.state ? "block" : "none";
    };

    this.setState = (nextState) => {
      console.log(nextState);
      this.state = nextState;
      this.render();
    };
  }
}
