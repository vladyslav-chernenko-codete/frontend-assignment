export const dateFormatter = (data: string | number) => {
  const date = new Date(data);
  return date.toLocaleDateString("gb-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
