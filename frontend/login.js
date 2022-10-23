const api_url = "http://localhost:4004";
const loginRoute = "/auth/login";

const loginForm = document.querySelector(".login-form");
const errMessage = document.querySelector(".errMsg");

const loginHandler = async (e) => {
  e.preventDefault();

  const userInfo = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  try {
    const res = await fetch(api_url + loginRoute, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await res.json();

    if (jsonResponse.status) {
      // saving the token
      localStorage.setItem("token", jsonResponse.token);
      errMessage.textContent = "Logging in...";
      errMessage.style.color = "green";

      setTimeout(() => {
        window.location = "profile.html";
      }, 3000);
    }

    if (!jsonResponse.status) {
      errMessage.textContent = jsonResponse.message;
    }
  } catch (err) {
    console.log(err);
  }
};

loginForm.addEventListener("submit", loginHandler);
