const API_ENDPOINT =
  "https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev";

export const api = {
  fetchCats: async (keyword) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
      if (!res.status === 200) {
        console.log("error fetching data");
      }
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn(e);
      throw new Error("error fetching data");
    }
  },
  fetchCatInfo: async (id) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
      if (!res.status === 200) {
        console.log("error fetching cat info");
      }
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn(e);
      throw new Error("error fetching cat info");
    }
  },
};
