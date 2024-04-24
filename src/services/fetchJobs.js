import axios from "axios";
import log from "./logger";
// dotenv from "dotenv";

// replace with file path
//dotenv.config({ path: "./.env" });
// method will be called and fed into filterJobs(input) function.
async function fetchJobs(input) {
  log.info("Fetching Job"); // Logged

  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: {
      query: input, // input is changed based on user input
      page: "1",
      num_pages: "7", // alter if you want more pages
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    log.debug("Sending request with options:", options); // Logged
    const response = await axios.request(options);
    log.debug("Response received:", response.data); // Logged
    return response.data;
  } catch (error) {
    log.error("Error fetching jobs:", error); // Logged
    throw error;
  }
}

// For testing purposes, will remove it eventually
// console.log(import.meta.env.VITE_API_KEY);
//fetchJobs("Data Analyst, Singapore")
//  .then((data) => console.log(data))
// .catch((error) => console.error(error));
export default fetchJobs;
