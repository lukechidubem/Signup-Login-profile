const api_url = "http://localhost:4004";
const profileRoute = "/auth/user";

const email = document.querySelector(".email");
const name = document.querySelector(".name");
const phone = document.querySelector(".phone");
const welcomeName = document.querySelector(".welcome-name");
const logout = document.querySelector(".logout");

async function getUser() {
  try {
    const res = await fetch(api_url + profileRoute, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });

    const jsonData = await res.json();

    email.textContent = jsonData.data.email;
    name.textContent = jsonData.data.name;
    welcomeName.textContent = jsonData.data.name;
    phone.textContent = jsonData.data.phone;
  } catch (error) {
    console.log(error);
  }
}

getUser();

function logoutHandler(e) {
  e.preventDefault();
  email.textContent = "";
  name.textContent = "";
  welcomeName.textContent = "";
  phone.textContent = "";

  localStorage.removeItem("token");

  setTimeout(() => {
    window.location = "login.html";
  }, 2000);

  setTimeout(() => {
    window.location = "../index.html";
  }, 2000);
}

logout.addEventListener("click", logoutHandler);
