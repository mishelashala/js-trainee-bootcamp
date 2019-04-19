window.addEventListener("load", function() {
  var form = document.querySelector(".user-form");
  // getElementById -> element or null
  // getElementsByTagName -> list of elements or null
  // getElementsByClassName -> list of elements or null
  // querySelector(selector) -> element or null
  // querySelectorAll -> list of elements or null
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var name = event.target.name.value;
    alert("Hi, " + name + " nice to meet you");
  });
});
