export const formatDate = (time: string) => {
  const date = new Date(time);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}h`;
};

export const utcToLocal = (time: string) => {
  const utcDate = new Date(time);
  return new Date(
    utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
  ).toString();
};
