import http from "k6/http";
import { check } from "k6";
export let options = {
  stages: [
    { duration: "5s", target: 5 },
    { duration: "10s", target: 10 },
    { duration: "5s", target: 5 },
  ],
};
function check_google_response(res) {
  check(res, {
    "status was 200": (r) => r.status == 200,
    "response body wasn't empty": (r) => r.body.length > 0,
  });
}
export default function () {
  const search_query = "k6 installing";
  const search_url = `https://www.google.com/search?q=${search_query}`;
  const response = http.get("https://test.k6.io");
  check_google_response(response);
}
