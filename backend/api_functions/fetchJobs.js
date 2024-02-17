import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({path: 'backend/.env'});

// method will be called and fed into filterJobs(input) function.
async function fetchJobs(input) {
  const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/search',
    params: {
      query: input, // input is changed based on user input
      page: "1",
      num_pages: "2" // alter if you want more pages
    },
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data; // return the data for further processing in another function
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

// For testing purposes, will remove it eventually 
// fetchJobs("Data Analyst, Singapore").then(data => console.log(data)).catch(error => console.error(error));

export default fetchJobs;


