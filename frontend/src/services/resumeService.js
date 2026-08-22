import api from "../api/api";

/*
=========================================================
UPLOAD RESUME
POST /api/upload/resume

PDF/DOCX upload karega.
Backend:
- file upload karega
- text extract karega
- resume parse karega
- ATS score generate karega
- MongoDB me save karega
=========================================================
*/

export const uploadResumeFile = async (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await api.post(
    "/upload/resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


/*
=========================================================
CREATE RESUME
POST /api/resumes
=========================================================
*/

export const createResume = async (resumeData) => {
  const response = await api.post(
    "/resumes",
    resumeData
  );

  return response.data;
};


/*
=========================================================
GET ALL RESUMES
GET /api/resumes

Logged-in user ke saare resumes
=========================================================
*/

export const getResumes = async () => {
  const response = await api.get(
    "/resumes"
  );

  return response.data;
};


/*
=========================================================
GET SINGLE RESUME
GET /api/resumes/:id

Analysis / Builder page ke liye
=========================================================
*/

export const getResumeById = async (
  resumeId
) => {
  const response = await api.get(
    `/resumes/${resumeId}`
  );

  return response.data;
};


/*
=========================================================
UPDATE RESUME
PUT /api/resumes/:id

Resume Builder se edited data save karega.
=========================================================
*/

export const updateResume = async (
  resumeId,
  resumeData
) => {
  const response = await api.put(
    `/resumes/${resumeId}`,
    resumeData
  );

  return response.data;
};


/*
=========================================================
DELETE RESUME
DELETE /api/resumes/:id
=========================================================
*/

export const deleteResume = async (
  resumeId
) => {
  const response = await api.delete(
    `/resumes/${resumeId}`
  );

  return response.data;
};


/*
=========================================================
GET LATEST RESUME

Latest uploaded/created resume
fetch karega.
=========================================================
*/

export const getLatestResume = async () => {
  const data = await getResumes();

  if (
    !data?.resumes ||
    data.resumes.length === 0
  ) {
    return null;
  }

  return data.resumes[0];
};


/*
=========================================================
GET LATEST RESUME ID
=========================================================
*/

export const getLatestResumeId = async () => {
  const latestResume =
    await getLatestResume();

  return latestResume?._id || null;
};


/*
=========================================================
SAVE LATEST RESUME ID

Upload ke baad Analysis/Builder page
me resume identify karne ke liye.
=========================================================
*/

export const saveLatestResumeId = (
  resumeId
) => {
  if (!resumeId) {
    return;
  }

  localStorage.setItem(
    "latestResumeId",
    resumeId
  );
};


/*
=========================================================
GET SAVED LATEST RESUME ID
=========================================================
*/

export const getSavedLatestResumeId = () => {
  return localStorage.getItem(
    "latestResumeId"
  );
};


/*
=========================================================
CLEAR SAVED RESUME ID
=========================================================
*/

export const clearLatestResumeId = () => {
  localStorage.removeItem(
    "latestResumeId"
  );
};


/*
=========================================================
DOWNLOAD RESUME PDF

GET /api/resumes/:id/pdf

Backend:
- MongoDB se resume fetch karega
- PDF generate karega
- PDF response me bhejega

Frontend:
- PDF ko Blob me convert karega
- Automatically download karega
=========================================================
*/

export const downloadResumePDF = async (
  resumeId
) => {
  if (!resumeId) {
    throw new Error(
      "Resume ID is required"
    );
  }

  const response = await api.get(
    `/resumes/${resumeId}/pdf`,
    {
      responseType: "blob",
    }
  );

  const blob = new Blob(
    [response.data],
    {
      type: "application/pdf",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "ResumeIQ-Resume.pdf";

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);

  return true;
};


/*
=========================================================
GET RESUME PDF BLOB

Agar future me PDF ko preview karna ho
to ye helper use kar sakte hain.

Ye automatically download nahi karta.
=========================================================
*/

export const getResumePDFBlob = async (
  resumeId
) => {
  if (!resumeId) {
    throw new Error(
      "Resume ID is required"
    );
  }

  const response = await api.get(
    `/resumes/${resumeId}/pdf`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};


/*
=========================================================
GET RESUME PDF URL

Blob URL return karega.

Future:
- PDF preview
- iframe
- new tab
=========================================================
*/

export const getResumePDFUrl = async (
  resumeId
) => {
  const blob =
    await getResumePDFBlob(
      resumeId
    );

  return window.URL.createObjectURL(
    blob
  );
};


/*
=========================================================
DEFAULT EXPORT

Optional helper object.
Existing named imports par koi effect nahi padega.
=========================================================
*/

const resumeService = {
  uploadResumeFile,
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  getLatestResume,
  getLatestResumeId,
  saveLatestResumeId,
  getSavedLatestResumeId,
  clearLatestResumeId,
  downloadResumePDF,
  getResumePDFBlob,
  getResumePDFUrl,
};

export default resumeService;