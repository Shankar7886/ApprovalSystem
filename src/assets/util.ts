export function formatDateToDDMMMYYYY(dateString: string): string {
  if (!dateString) return "-";
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "-"; // Invalid date

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" }); // Jan, Feb, ...
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function formatDateForApiCall(date: unknown): string | null {
  if (date instanceof Date && !isNaN(date.getTime())) {
    return (
      date.toLocaleString("en-IN", { year: "numeric" }) +
      "-" +
      date.toLocaleString("en-IN", { month: "2-digit" }) +
      "-" +
      date.toLocaleString("en-IN", { day: "2-digit" })
    );
  }
  return null;
}