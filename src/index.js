import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { addOffset, addTileLayer, getAddress, validateIp } from "./helpers";
import icon from "../images/icon-location.svg";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
});

addTileLayer(map);
L.marker([51.5, -0.09], { icon: markerIcon }).addTo(map);

function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value).then((data) => setInfo(data));
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  const { lat, lng, country, timezone, region } = mapData.location;
  ipInfo.innerHTML = mapData.ip;
  locationInfo.innerHTML = country + " " + region;

  timezoneInfo.innerHTML = timezone;
  ispInfo.innerHTML = mapData.isp;

  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);

  if (matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getAddress("102.22.22.1").then(setInfo);
});
