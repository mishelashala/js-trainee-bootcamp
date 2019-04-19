// TodoModel is an object that represents our todo
(function(global) {
  // every todo must have an id, so we keep
  // track internally of a counter to avoid
  // having duplicated ids
  var id = 1;

  // TodoModel api. In this case we only expose create
  global.TodoModel = {
    create: create
  };

  // Creates a todo when called, it takes a string
  // that represents the text of the todo.
  // By default the todo is marked as not completed,
  // create :: String -> TodoModel
  function create(text) {
    return {
      id: id++,
      text: text,
      completed: false
    };
  }
})(window);
