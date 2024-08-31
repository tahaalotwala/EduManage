document.getElementById("form").onsubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  console.log({ name, email, phone, password });
  window.location.href = "../home.html";
};
