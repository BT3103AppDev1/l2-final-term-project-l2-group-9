import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// method will be called and fed into filterJobs(input) function.
async function fetchJobs(input) {
  const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/search',
    params: {
      query: input, // input is changed based on user input
      page: "1",
      num_pages: "1"
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data; // Optionally return the data for further processing
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

export default fetchJobs;


