export const emailFormatter = (value: string) => {
  const regex = /(?<=@)\w+(?=\.)/g;
  return value.replace(regex, "\\*\\*\\*");
};
