/**
 * Código JavaScrit que será executado no navegador (cliente)
 */

console.log("app.js loaded...");

function getWeatherFor(endereco) {
  fetch("/weather?address=" + endereco)
    .then((r) =>
      r.json().then((j) => {
        if (j.error) {
          saida.textContent = j.error;
        } else {
          console.log(r.url);
          saida.textContent = j.formatted_address;
          erro.textContent = "A temperatura é " + j.temperatura;
        }
      })
    )
    .catch((e) => (saida.textContent = e.toString()));
}

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const saida = document.getElementById("saida");
const erro = document.getElementById("erro");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  saida.textContent = "Localizando informação...";
  erro.textContent = "";

  getWeatherFor(search.value);
});
