const isLogged = localStorage.getItem("isLogged");
if (isLogged !== "yes") {
  logout();
}

var map = L.map("map").setView([40, 10], 4);
L.tileLayer(
  "https://api.maptiler.com/maps/toner-v2/{z}/{x}/{y}.png?key=iQ6rc0TA1NiraYHps3Da",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);

const $logout = document.getElementById("logout");
const $countryInput = document.getElementById("country_input");
const $countryBtn = document.getElementById("country_btn");
const $countryName = document.getElementById("country_name");
const $countryPopulation = document.getElementById("country_population");
const $countryCapital = document.getElementById("country_capital");
const $generateName = document.getElementById("new_name");
const $generateIdentityBtn = document.getElementById("generate_identity");
const $generateEmail = document.getElementById("new_email");
const $generateDob = document.getElementById("new_dob");
const $generatePicture = document.getElementById("new_picture");

$generateIdentityBtn.addEventListener("click", async () => {
  const newPerson = await fetch("https://randomuser.me/api/").then((response) =>
    response.json()
  );
  const newPersonData = newPerson.results[0];
  console.log(newPersonData);

  $generateName.innerText = newPersonData.name.first;
  $generateEmail.innerText = newPersonData.email;
  const dob = newPersonData.dob.date;
  $generateDob.innerText = dob.split("T")[0];
  $generatePicture.src = newPersonData.picture.large;
});

function logout() {
  localStorage.setItem("isLogged", "no");
  window.location.href = "index.html";
}

$logout.addEventListener("click", logout);

$countryBtn.addEventListener("click", async () => {
  const country = $countryInput.value;
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${country}`
  ).then((res) => res.json());

  const countryInfo = response[0];
  console.log(response);

  $countryPopulation.innerText = countryInfo.population;
  $countryCapital.innerText = countryInfo.capital[0];
  $countryName.innerText = countryInfo.name.official;

  map.panTo(countryInfo.latlng, { animate: true, duration: 1.0 });
});
