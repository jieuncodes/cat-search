export default class ImageInfo {
  $imageInfo = null;
  imageState = null;

  constructor({ $app, imageState }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $app.appendChild($imageInfo);

    this.imageState = imageState;

    this.render();
  }

  setState = (nextImageState) => {
    this.imageState = nextImageState;
    this.render();
  };

  render() {
    if (this.imageState.visible) {
      const { name, url, temperament, origin } = this.imageState.image;

      this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
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
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
