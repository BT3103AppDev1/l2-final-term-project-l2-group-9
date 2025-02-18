import fetchJobs from "./fetchJobs.js";

async function filterJobs(input) {
  let fetchedJson = await fetchJobs(input);
  let jobs = fetchedJson.data;
  const extractedData = jobs.map((job) => ({
    jobID: job.job_id,
    employerName: job.employer_name,
    employerLogo: job.employer_logo,
    jobTitle: job.job_title,
    jobEmploymentType: job.job_employment_type,
    jobLocation: job.job_location,
    jobDesc: job.job_description,
    applyLink: job.job_apply_link,
    jobPostDate: toReadableDate(job.job_posted_at_timestamp),
    jobPostDateTime: job.job_posted_at_timestamp,
    jobDuration:
      job.job_required_experience.required_experience_in_months == null
        ? "Not Stated"
        : job.job_required_experience.required_experience_in_months + " months",
    jobAvgSalary:
      findAvgSalary(job.job_min_salary, job.job_max_salary) == null
        ? "Not Disclosed"
        : "SGD$" +
          findAvgSalary(job.job_min_salary, job.job_max_salary) +
          "/month",
  }));
  return extractedData;
}

// For testing purposes, will remove it eventually
//filterJobs("software engineer Intern, Singapore")
//  .then((data) => console.log(data[0]))
//  .catch((error) => console.error(error));

function toReadableDate(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const readableDate = date.toLocaleString("en-US", options);

  return readableDate;
}

function findAvgSalary(minSalary, maxSalary) {
  if (minSalary !== null) {
    if (maxSalary !== null) {
      return (maxSalary + minSalary) / 2;
    }
    return minSalary;
  }
  if (maxSalary !== null) {
    return maxSalary;
  }
  return null;
}

export default filterJobs;
