console.log("hello");

document.getElementById("form").onsubmit = function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch("http://localhost:8080/student/signin", {
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
      console.log("Success:", data);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.user) return (window.location.href = "../Student/home.html");
      else window.alert("There was an Error");
    })
    .catch((error) => {
      console.error("Error:", error);
      window.alert("There was an Error");
    });
};
