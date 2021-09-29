import http from "k6/http";
export default function () {
  const search_query = "k6 installing";
  const search_url = `https://www.google.com/search?q=${search_query}`;
  const response = http.get("https://test.k6.io");
  console.log(response.body);
}
