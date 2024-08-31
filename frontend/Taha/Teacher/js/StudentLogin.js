console.log("hello");

document.getElementById("form").onsubmit = function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (email == "student@gmail.com" && password == "student") {
    window.location.href = "../home.html";
  } else {
    window.alert("Incorrect Credentials");
  }
};
