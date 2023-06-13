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
    };
    
    const imageInfo = new ImageInfo({
      $app,
      imageState: {
        visible: false,
        image: null,
      },
    });

    const handleImageClick = (event) => {
      console.log("clicked1");
      imageInfo.setState({
        visible: true,
        image,
      });
    };

    const searchResult = new SearchResult({
      $app,
      initialData: this.state.data,
      onClick: handleImageClick,
    });

    const loading = new Loading({ $app, initialState: this.state.isLoading });

    this.setState = (nextState) => {
      this.state = {...this.state, ...nextState};
      searchResult.setState(this.state.data);
      loading.setState(this.state.isLoading);
    };

    const handleSearchInput = async (keyword) => {
      this.setState({ isLoading: true });
      const data = await api.fetchCats(keyword);
      this.setState({ data });
      this.setState({isLoading: false });

    };

    
    const init = async() => {
      try {
        this.setState({isLoading: true });

        new SearchInput({
          $app,
          onSearch: handleSearchInput,
        });
        

      } catch (e) {
        console.log("error", e);

      } finally {
        this.setState({isLoading: false });
        console.log("this.state", this.state)
      }
    };

    init();
  }
}
