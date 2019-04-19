// A repository is used to "persist" (save) models
(function(global) {
  // The place where we store our data. Usually called...
  // well... data store. In this case we store our data
  // on memory
  var data = [];

  // TodoRepository api, we expose find, save and remove
  global.TodoRepository = {
    find: find,
    save: save,
    remove: remove
  };

  // Wanna find some todo?
  // if you passs a number to "find" (the id of the todo)
  // it will return that todo in a list
  // if you don't pass a number it will give you the entire
  // list of todos
  // find :: Number -> List<TodoModel>
  function find(id) {
    if (id) {
      // predicate -> true | false
      return data.filter(function(todo) {
        // '1' === '1' -> true
        //  1  === '1' -> false
        // '1' == '1' -> true
        //  1  == '1'   -> true
        return todo.id === id;
      });
    }

    return data;
  }

  // Wanna save a new todo?
  // Wanna update a todo?
  // "save" takes todo arguments: the todo to save and
  // the upsert option.
  // if upsert is true then the todo you pass will be
  // treated as a new todo and it will be added to
  // the data source.
  // if upsert is false then it will try to find the todo
  // on the data store and it will be updated
  // save :: (TodoModel, Boolean) -> TodoModel
  function save(todo, upsert = true) {
    if (upsert) {
      data.push(todo);
    } else {
      var index = data.findIndex(function(t) {
        return t.id === todo.id;
      });
      data[index] = todo;
    }

    return todo;
  }

  // Wanna remove a todo?
  // "remove" takes a todo, it will try to find it
  // on the data store. if it finds it it will
  // delete it, otherwhis it will do nothing
  // remove :: Todo -> null
  function remove(todo) {
    // predicate -> true | false
    var index = data.findIndex(function(t) {
      return t.id === todo.id;
    });

    // todo not found
    if (index === -1) {
      return null;
    }

    data.splice(index, 1);
    return null;
  }
})(window);
