export default class ImageInfo {
  constructor({ $app, imageState }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $app.appendChild($imageInfo);

    this.imageState = imageState;

    this.render();

    this.setState = (nextImageState) => {
      console.log("nextImageState", nextImageState);
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
    const closeBtn = this.$imageInfo.querySelector(".close");
    closeBtn.addEventListener("click", () => {
      this.$imageInfo.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      const modal = e.target.closest(".content-wrapper");
      if (!modal || !modal.contains(e.target)) {
        this.closeModal();
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal();
      }
    });
  }
}
