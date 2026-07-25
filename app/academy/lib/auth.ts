export const loginStudent = (
  email: string,
  matricule: string
) => {
  const students = JSON.parse(
    localStorage.getItem("students") || "[]"
  );

  const student = students.find(
    (s: any) =>
      s.email === email &&
      s.matricule === matricule &&
      s.status === "Approved"
  );

  return student || null;
};