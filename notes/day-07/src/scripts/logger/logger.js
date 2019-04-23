function error(msg) {
  alert(msg);
}

function info(msg) {
  console.log(msg);
}

// named exports
// exports.info = info;
// exports.error = error;
// module exports

module.exports = {
  error,
  info
};
