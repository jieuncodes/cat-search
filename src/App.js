import { api } from "./api.js";
import ImageInfo from "./ImageInfo.js";
import Loading from "./Loading.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";

export default class App {
  constructor($app) {
    this.state = {
      data: [],
      isLoading: true,
      isDarkMode: false,
    };
    this.setupDarkModeToggle();

    const handleSearchInput = async (keyword) => {
      this.setState({ isLoading: true });
      const data = await api.fetchCats(keyword);
      this.setState({ data, isLoading: false });
    };

    new SearchInput({
      $app,
      onSearch: handleSearchInput,
    });

    const imageInfo = new ImageInfo({
      $app,
      imageState: {
        visible: false,
        catDetails: null,
      },
    });
    const handleImageClick = async (id) => {
      const catDetails = await api.fetchCatInfo(id);

      imageInfo.setState({
        visible: true,
        catDetails,
      });
    };
    const searchResult = new SearchResult({
      $app,
      initialData: this.state.data,
      onClick: handleImageClick,
    });
    const loading = new Loading({ $app, initialState: this.state.isLoading });

    this.setState = (nextState) => {
      this.state = { ...this.state, ...nextState };
      searchResult.setState(this.state.data);
      loading.setState(this.state.isLoading);
    };

    const init = async () => {
      try {
        this.setState({ isLoading: true });
      } catch (e) {
        console.log("error", e);
      } finally {
        this.setState({ isLoading: false });
      }
    };

    init();
  }

  setupDarkModeToggle() {
    const darkToggleCheckbox = document.getElementById("dark-toggle");

    darkToggleCheckbox.addEventListener("change", (event) => {
      const checkBox = event.target.closest("input");
      document.body.classList.toggle("dark-mode", checkBox.checked);
    });
  }
}
