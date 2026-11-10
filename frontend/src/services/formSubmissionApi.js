
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

export const submitFormSubmission = async ({
  formType,
  data,
  sourcePage = window.location.pathname,
}) => {
  const response = await fetch(`${API_URL}/form-submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType,
      sourcePage,
      data,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Form submission failed");
  }

  return result;
};
