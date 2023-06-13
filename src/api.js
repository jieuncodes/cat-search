const API_ENDPOINT =
  "https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev";

export const api = {
  fetchCats: async (keyword) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
      if (!res.ok) {
        console.log("error fetching data");
      }
      const data = await res.json();
      console.log("data", data);

      return data.data;
    } catch (e) {
      console.warn(e);
      throw new Error("error fetching data");
    }
  },
};
