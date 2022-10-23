const api_url = "http://localhost:4004";
const signupRoute = "/auth/signup";

const btnSignup = document.querySelector(".btn-signup");
const signupForm = document.querySelector(".signup-form");
const errMessage = document.querySelector(".errMsg");
const errMessageContainer = document.querySelector(".err-msg-container");
const errMessageLink = document.querySelector(".err-msg-link");

const handleSignup = async (e) => {
  e.preventDefault();

  const userData2 = {
    email: e.target.email.value,
    password: e.target.password.value,
    name: e.target.name.value,
    phone: e.target.phone.value,
  };

  // sending data to server to process
  try {
    const res = await fetch(api_url + signupRoute, {
      method: "POST",
      body: JSON.stringify(userData2),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await res.json();
    if (jsonResponse.status) {
      errMessage.textContent = `${jsonResponse.message},`;
      errMessageLink.textContent = "Click me to login";
      errMessage.style.color = "green";
    }

    if (!jsonResponse.status) {
      errMessage.textContent = jsonResponse.message;
      errMessageLink.textContent = "";
      errMessage.style.color = "red";
    }
  } catch (err) {
    console.log(err);
  } finally {
    e.target.email.value =
      e.target.password.value =
      e.target.name.value =
      e.target.phone.value =
        "";
  }
};

// signupForm.addEventListener("submit", handleSignup);
