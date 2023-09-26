const addDash = (name) => {
  return name.trim().split(" ").join("-");
};
const removeChar = (str, char) => {
  return str.split(char).join(" ");
};

module.exports = { addDash, removeChar };
