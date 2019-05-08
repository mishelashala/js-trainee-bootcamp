const usernameList = [];

const getAllUsernames = () => {
  return usernameList;
};

const addUsername = username => {
  usernameList.push(username);
};

const updateUsername = (oldUsername, newUsername) => {
  // predicate: true | false
  const index = usernameList.findIndex(un => oldUsername === un);
  usernameList[index] = newUsername;
};

const deleteUsername = username => {
  const index = usernameList.findIndex(un => oldUsername === un);
  usernameList.splice(index, 1);
};

module.exports = {
  getAllUsernames,
  addUsername,
  updateUsername,
  deleteUsername
};
