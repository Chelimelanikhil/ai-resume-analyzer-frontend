const API_BASE_URL = "https://ai-resume-analyzer-backend-1.onrender.com/api";

/**
 * Fetch jobs based on user's resume data
 * @param {Object} resumeData - Contains skills, experience, etc.
 * @returns {Promise<Array>} Array of matched jobs
 */
export const fetchMatchedJobs = async (resumeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        skills: resumeData.skills || [],
        experience: resumeData.experience || [],
        jobTitle: resumeData.jobTitle || "",
        location: resumeData.location || "",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await response.json();
    return {
      success: true,
      jobs: data.jobs || [],
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return {
      success: false,
      error: error.message,
      jobs: [],
    };
  }
};

/**
 * Search jobs with filters
 * @param {Object} filters - Search filters
 * @returns {Promise<Array>} Array of jobs
 */
export const searchJobs = async (filters) => {
  try {
    const queryParams = new URLSearchParams({
      query: filters.query || "",
      location: filters.location || "",
      jobType: filters.jobType || "",
      experience: filters.experience || "",
    });

    const response = await fetch(`${API_BASE_URL}/jobs/search?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to search jobs");
    }

    const data = await response.json();
    return {
      success: true,
      jobs: data.jobs || [],
    };
  } catch (error) {
    console.error("Error searching jobs:", error);
    return {
      success: false,
      error: error.message,
      jobs: [],
    };
  }
};

/**
 * Get job details by ID
 * @param {string} jobId - Job ID
 * @returns {Promise<Object>} Job details
 */
export const getJobDetails = async (jobId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch job details");
    }

    const data = await response.json();
    return {
      success: true,
      job: data.job,
    };
  } catch (error) {
    console.error("Error fetching job details:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Apply to a job
 * @param {string} jobId - Job ID
 * @returns {Promise<Object>} Application result
 */
export const applyToJob = async (jobId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to apply to job");
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error("Error applying to job:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};