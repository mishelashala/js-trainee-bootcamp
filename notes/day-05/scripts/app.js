(function(global) {
  // Internal state (private fields in Java)
  var form;
  var input;
  var todoList;
  var filter = "all";
  var allButton;
  var pendingButton;
  var doneButton;
  var clearButton;

  // The entry point of our application (constructor in Java)
  // cashElements: the app needs to reference some elements on the dom
  // attatchEvents: the app needs to react to some dom events (click, submit)
  // render: we need to show things on the screen when the app start (initial/first render)
  function init() {
    cashElements();
    attachEvents();
    render();
  }

  // we expose the api of our application, in this case we
  // only expose init. The rest of the functions are private
  global.app = {
    init: init
  };

  // Every variable must have a reference to a dom node,
  // in this "phase" we add those references.
  function cashElements() {
    form = global.document.querySelector("#todo-form");
    input = global.document.querySelector("#todo-input");
    todoList = global.document.querySelector("#todo-list");
    allButton = global.document.querySelector("#all");
    pendingButton = global.document.querySelector("#pending");
    doneButton = global.document.querySelector("#done");
    clearButton = global.document.querySelector("#clear-all-todos");
  }

  // The app need to react to some events, here we add
  // the listeners to those events
  function attachEvents() {
    // somebody submited the form (clicked the button or pressed enter)?
    // cool, let's call the function addTodo to... well... add a todo
    form.addEventListener("submit", addTodo);

    // somebody clicked the all button to change the filter to all?
    // cool, let's call the function setFilterTo with the value "all"
    // to... well... set the filter to "all"
    allButton.addEventListener("click", setFilterTo("all"));

    // somebody clicked the pending button to change the filter to pending?
    // cool, let's call the function setFilterTo with the value "pending"
    // to... well... set the filter to "pending"
    pendingButton.addEventListener("click", setFilterTo("pending"));

    // somebody clicked the pending button to change the filter to done?
    // cool, let's call the function setFilterTo with the value "done"
    // to... well... set the filter to "done"
    doneButton.addEventListener("click", setFilterTo("done"));

    // somebody clicked the pending button remove all completed todos?
    // cool, let's call the function removeCompletedTodos to... well...
    // remove all the completed todos
    clearButton.addEventListener("click", removeCompletedTodos);
  }

  // The app needs to "print/show" things on the screens.
  // Here's where the magic happens
  function render() {
    // get all the todos stored on the repository
    var todos = global.TodoRepository.find();

    // no todos? :happy_face: render a message on the
    // screen telling: Nothing to do, yay!
    if (todos.length === 0) {
      return renderMessage("Nothing to do, yay!");
    }

    // is there any filter active (all, pending, done)? Ok
    // then filter the todos and keep just the ones that
    // match the filter criteria
    var filteredTodos = todos.filter(function(todo) {
      if (filter === "all") {
        return true;
      }

      if (filter === "pending") {
        return !todo.complete;
      }

      if (filter === "done") {
        return todo.complete;
      }
    });

    // no todos after the filter? Cool
    // Print to the screen the message: Nothing here
    if (filteredTodos.length === 0) {
      return renderMessage("Nothing here");
    }

    // The document doesn't know what it is a todo
    // the document only works with domNodes, so just
    // convert all our filtered todos into domNodes.
    var todoNodes = filteredTodos.map(function(todo) {
      // let's create a list item
      var todoNode = global.document.createElement("li");

      // let's add it an id (so we can identify 'em later)
      todoNode.setAttribute("id", "todo-" + todo.id);

      // add the text
      todoNode.textContent = todo.text;

      // is completed? let's mark it with the "done" class
      if (todo.complete) {
        todoNode.classList.add("done");
      }

      // if somebody clicks it let's toggle the class
      todoNode.addEventListener("click", toggleTodo);
      return todoNode;
    });

    // we must clean the list first (we don't want duplicated elements)
    todoList.innerHTML = "";

    // we must add every todoNode into the todoList
    todoNodes.forEach(function(todo) {
      todoList.appendChild(todo);
    });
  }

  // let's remove all the todos
  function removeCompletedTodos() {
    // get all the todos stored on the repository
    var todos = global.TodoRepository.find();

    // we only care about the completed ones
    var doneTodos = todos.filter(function(todo) {
      return todo.complete;
    });

    // let's remove every complete todo from the repository
    doneTodos.forEach(function(doneTodo) {
      global.TodoRepository.remove(doneTodo);
    });

    // print (update) the todo list on the screen!
    render();
  }

  // let's add a todo
  function addTodo(event) {
    // this function gets called when someone submits the form
    // we don't the form to redirect to other page. So, let's
    // prevent that
    event.preventDefault();

    // get the text from the input on the form
    var todoText = event.target.todo.value;

    // let's create a todo using the TodoModel
    var todo = global.TodoModel.create(todoText);

    // let's save it, we don't wanna miss a thing... (see what i did there, he?)
    global.TodoRepository.save(todo);

    // let's clean the input
    input.value = "";

    // print (update) the todo list on the screen!
    render();
  }

  // somebody clicked the todo?
  // if it's already marked as done let's unmark it
  // if it's pending let's mark it as done
  function toggleTodo(event) {
    // this funciton gets called when somebody clicks a todo
    // and the click event gets triggered.
    event.preventDefault();

    // if it's already marked as done let's unmark it (remove class done)
    // if it's pending let's mark it as done (add class done)
    event.target.classList.toggle("done");

    // let's get the id of that todo from the element
    // that was clicked
    var todoId = event.target.getAttribute("id");

    // the id has this form "todo-1", we only care about
    // the number, so let's extract it
    var id = todoId.split("-")[1];

    // get the todo from the repository, the id is a tring and find
    // accepts a number, so let's convert it to a number.
    // Find returns a list, if find... well... finds the todo
    // it will return a list with only one todo.
    // So let's extract the todo from the list
    var todo = global.TodoRepository.find(Number(id))[0];

    // if it's already marked as done let's unmark it
    // if it's pending let's mark it as done
    todo.complete = !todo.complete;

    // don't create a new one, just update the existing one
    global.TodoRepository.save(todo, false);

    // print (update) the todo list on the screen!
    render();
  }

  // somebody want's to change the filter (all, pending, done)?
  function setFilterTo(filterState) {
    // we can return functions from other functions
    // with this we avoid duplication
    return function() {
      // update the filter
      filter = filterState;

      // print (update) the todo list on the screen!
      render();
    };
  }

  // generic function used to show a message on the todo list
  function renderMessage(messageText) {
    // let's crate a list item element
    var message = global.document.createElement("li");

    // lets add some text to that element
    message.textContent = messageText;

    // let's clear the todo list
    todoList.innerHTML = "";

    // let's add the message to the todo list on the screen
    todoList.appendChild(message);
  }
})(window);
