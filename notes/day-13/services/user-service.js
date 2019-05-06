const usernameList = [];

const getAllUsernames = () => {
  return usernameList;
};

const addUsername = username => {
  usernameList.push(username);
};

module.exports = {
  getAllUsernames,
  addUsername
};
