import { validateIp } from "./helpers";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData() {
  if (validateIp(ipInput.value)) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_grC6CY2oBjqQiOzIVspZ8tIb4XJUN&ipAddress=${ipInput.value}`
    )
      .then((response) => response.json())
      .then((data) => setInfo(data));
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  console.log(mapData);
  ipInfo.innerHTML = mapData.ip;
  locationInfo.innerHTML =
    mapData.location.country + " " + mapData.location.region;

  timezoneInfo.innerHTML = mapData.location.timezone;
  ispInfo.innerHTML = mapData.isp;
}

// 202.11.23.11
