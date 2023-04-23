const $loginBtn = document.getElementById("login_btn");
const $loginInput = document.getElementById("login_input");
const $passwordInput = document.getElementById("password_input");
const $loginError = document.getElementById("login_error");

$loginBtn.addEventListener("click", async () => {
  const login = $loginInput.value;
  const password = $passwordInput.value;
  console.log(login, password);
  const response = await fetch(
    "https://login-service-wsb-wj.netlify.app/.netlify/functions/login",
    {
      method: "POST",
      body: JSON.stringify({
        login, //to samo jak by było login:login, password:password
        password,
      }),
    }
  ).then((res) => res.json());

  if (response.isLogged) {
    localStorage.setItem("isLogged", "yes");
    window.location.href = "mainScreen.html";
  } else {
    $loginError.classList.remove("not_visible");
  }
});
