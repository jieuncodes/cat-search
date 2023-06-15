import { api } from "../api.js";
import { addLocalStorageData } from "../util/saveLocalStorage.js";
import ImageInfo from "./ImageInfo.js";
import Loading from "./Loading.js";
import SearchHistory from "./SearchHistory.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";

export default class App {
  constructor($app) {
    this.state = {
      data: [],
      history: JSON.parse(localStorage.getItem("searchHistory")) || [],
      isLoading: true,
      isDarkMode: false,
    };

    new SearchInput({
      $app,
      onSearch: this.handleSearchInput.bind(this),
    });

    this.searchHistory = new SearchHistory({
      keywords: this.state.history,
      onClick: this.handleSearchInput,
    });

    this.imageInfo = new ImageInfo({
      $app,
      imageState: {
        visible: false,
        catDetails: null,
      },
    });
    

    this.searchResult = new SearchResult({
      $app,
      initialData: this.state.data,
      onClick: this.handleImageClick,
      initialLoadingState: this.state.isLoading,
    });

    this.loading = new Loading({ $app, initialState: this.state.isLoading });

    this.setState = (nextState) => {
      this.state = { ...this.state, ...nextState };
      this.searchResult.setState({
        data: this.state.data,
        isLoading: this.state.isLoading,
      });
      this.loading.setState(this.state.isLoading);
      this.searchHistory.setState({ keywords: this.state.history });
    };

    this.setupDarkModeToggle();
  }

  setupDarkModeToggle() {
    const darkToggleCheckbox = document.getElementById("dark-toggle");

    darkToggleCheckbox.addEventListener("change", (event) => {
      const checkBox = event.target.closest("input");
      document.body.classList.toggle("dark-mode", checkBox.checked);
    });
  }

  async handleImageClick(id){
    const catDetails = await api.fetchCatInfo(id);

    this.imageInfo.setState({
      visible: true,
      catDetails,
    });
  };
  async handleSearchInput (keyword){
    try {
      this.setState({ isLoading: true });
      const data = await api.fetchCats(keyword);
      this.setState({ data });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
      addLocalStorageData({ keyword, storageName: "searchHistory" });
      this.state.history.push(keyword);
    }
  };
}
