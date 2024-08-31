console.log("hello");

document.getElementById("form").onsubmit = function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch("http://localhost:8080/teacher/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.user) window.location.href = "../Student/home.html";
      else return window.alert("There was an Error");
      console.log("Success:", data);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "../Teacher/dashboard.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      window.prompt("There was an Error");
    });
};
