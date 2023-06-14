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
    this.setupDarkModeToggle();

    const handleSearchInput = async (keyword) => {
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

    new SearchInput({
      $app,
      onSearch: handleSearchInput,
    });
    const searchHistory = new SearchHistory({
      keywords: this.state.history,
      onClick: handleSearchInput,
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
      initialLoadingState: this.state.isLoading,
    });
    const loading = new Loading({ $app, initialState: this.state.isLoading });

    this.setState = (nextState) => {
      this.state = { ...this.state, ...nextState };
      searchResult.setState({
        data: this.state.data,
        isLoading: this.state.isLoading,
      });
      loading.setState(this.state.isLoading);
      searchHistory.setState({ keywords: this.state.history });
    };
  }

  setupDarkModeToggle() {
    const darkToggleCheckbox = document.getElementById("dark-toggle");

    darkToggleCheckbox.addEventListener("change", (event) => {
      const checkBox = event.target.closest("input");
      document.body.classList.toggle("dark-mode", checkBox.checked);
    });
  }
}
