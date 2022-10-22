const api_url = "http://localhost:4004";
const profileRoute = "/auth/user";

const email = document.querySelector(".email");
const name = document.querySelector(".name");
const phone = document.querySelector(".phone");
const welcomeName = document.querySelector(".welcome-name");

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

    console.log(jsonData);
  } catch (error) {
    console.log(error);
  }
}

getUser();