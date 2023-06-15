const API_ENDPOINT = "https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/";

async function fetchData(url, errorMsg) {
  try {
    const res = await fetch(url);
    if (!res.status === 200) {
      console.log(errorMsg);
    }
    if (res.status === 500) {
      console.log("Please refresh the page. " + errorMsg);
    }
    const data = await res.json();
    return data.data;
  } catch (e) {
    console.warn(e);
    throw new Error(errorMsg + ". Please refresh the page.");
  }
}

export const api = {
  fetchCats: (keyword) => fetchData(`${API_ENDPOINT}search?q=${keyword}`, "error fetching data"),
  fetchCatInfo: (id) => fetchData(`${API_ENDPOINT}${id}`, "error fetching cat info"),
  fetchRandomCats: () => fetchData(`${API_ENDPOINT}arandom50`, "error fetching random cat info"),
};
