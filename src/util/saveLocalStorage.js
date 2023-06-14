export const addLocalStorageData = ({ keyword, storageName }) => {
  const localStorageData = JSON.parse(localStorage.getItem("searchHistory"));
  const newLocalStorageData = localStorageData
    ? [...localStorageData, keyword]
    : [keyword];
  localStorage.setItem("searchHistory", JSON.stringify(newLocalStorageData));
};
