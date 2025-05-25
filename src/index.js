import { validateIp } from "./helpers";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData() {
  if (validateIp(ipInput.value)) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_grC6CY2oBjqQiOzIVspZ8tIb4XJUN&ipAddress=${ipInput.value}`
    )
      .then((response) => response.json())
      .then(console.log);
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

// 10.111.201.22
