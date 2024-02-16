import fetchJobs from './fetchJobs';

async function filterJobs(input) {
  let data = await fetchJobs(input);
  
}