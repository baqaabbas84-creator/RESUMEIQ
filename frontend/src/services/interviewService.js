import api from "../api/api";

// =========================================================
// CREATE INTERVIEW
// =========================================================

export const createInterview = async ({
  jobRole,
  difficulty = "Medium",
  resumeId = null,
}) => {
  const response = await api.post(
    "/interviews",
    {
      jobRole,
      difficulty,
      resumeId,
    }
  );

  return response.data;
};


// =========================================================
// GET ALL INTERVIEWS
// =========================================================

export const getInterviews = async () => {
  const response = await api.get(
    "/interviews"
  );

  return response.data;
};


// =========================================================
// GET SINGLE INTERVIEW
// =========================================================

export const getInterviewById = async (
  interviewId
) => {
  const response = await api.get(
    `/interviews/${interviewId}`
  );

  return response.data;
};


// =========================================================
// SUBMIT INTERVIEW
// =========================================================

export const submitInterview = async (
  interviewId,
  answers
) => {
  const response = await api.post(
    `/interviews/${interviewId}/submit`,
    {
      answers,
    }
  );

  return response.data;
};


// =========================================================
// DELETE INTERVIEW
// =========================================================

export const deleteInterview = async (
  interviewId
) => {
  const response = await api.delete(
    `/interviews/${interviewId}`
  );

  return response.data;
};


// =========================================================
// SAVE CURRENT INTERVIEW ID
// =========================================================

export const saveInterviewId = (
  interviewId
) => {
  if (!interviewId) {
    return;
  }

  localStorage.setItem(
    "currentInterviewId",
    interviewId
  );
};


// =========================================================
// GET CURRENT INTERVIEW ID
// =========================================================

export const getSavedInterviewId = () => {
  return localStorage.getItem(
    "currentInterviewId"
  );
};


// =========================================================
// CLEAR CURRENT INTERVIEW ID
// =========================================================

export const clearInterviewId = () => {
  localStorage.removeItem(
    "currentInterviewId"
  );
};