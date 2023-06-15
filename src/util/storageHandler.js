const localStorageData = JSON.parse(localStorage.getItem("searchHistory"));

export const addLocalStorageData = ({ keyword, storageName }) => {
  const newLocalStorageData = localStorageData
    ? [...localStorageData, keyword]
    : [keyword];
  localStorage.setItem("searchHistory", JSON.stringify(newLocalStorageData));
};

export const getLocalStorageData = () => {
  return localStorageData;
}