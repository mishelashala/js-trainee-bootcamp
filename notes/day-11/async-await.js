(async function() {
  const getValue = () => Promise.resolve(10);
  const multiply = (x, y) => Promise.resolve(x + y);

  try {
    var value = await getValue();
    var double = await multiply(2, value);
  } catch (err) {
    console.log("err: ", err);
  }
  console.log("double: ", double);
})();
