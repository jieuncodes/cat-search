export default class ImageInfo {
  constructor({ $app, imageState }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $app.appendChild($imageInfo);

    this.imageState = imageState;

    this.render();

    this.setState = (nextImageState) => {
      this.imageState = nextImageState;
      this.render();
      this.addEventListeners();
    };
  }
  closeModal() {
    this.$imageInfo.style.display = "none";
    this.$imageInfo.firstElementChild.classList.remove("show");
  }

  render() {
    if (this.imageState.visible) {
      const { name, url, temperament, origin } = this.imageState.catDetails;

      this.$imageInfo.innerHTML = `
          <div class="content-wrapper fade-in-box show">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;

      this.$imageInfo.style.display = "block";
    }
  }
  addEventListeners() {
    document.addEventListener("click", (event) => {
      if (this.$imageInfo.contains(event.target)) {
        if (event.target.className === "close") {
          this.$imageInfo.style.display = "none";
        }

        const modal = event.target.closest(".content-wrapper");
        if (!modal || !modal.contains(event.target)) {
          this.closeModal();
        }
      }
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.closeModal();
      }
    });
  }
}
