import { API_URL_IP, API_URL_DETAILS } from "./config";
import locationIcon from "../images/location.svg";
import { fetchPro } from "./helper";
import * as leaflet from "leaflet";

export const state = {
  ipAddress: "",
  mapInstance: "",
  markerIcon: leaflet.icon({
    iconUrl: locationIcon,
    iconSize: [38, 95],
    iconAnchor: [20, 60],
    popupAnchor: [0, -20],
  }),

  details: {},
};

export const getLocalIP = async function () {
  const { ip: localIP } = await fetchPro(API_URL_IP);
  state.ipAddress = localIP;
};

export const getDetails = async function (ip = state.ipAddress) {
  const details = await fetchPro(`${API_URL_DETAILS}${ip}`);

  const detailsObj = {
    ipAddress: details.ip,
    country: details.location.country,
    city: details.location.city,
    postalCode: details.location.postalCode,
    timezone: details.location.timezone,
    isp: details.isp,
    coordinates: [details.location.lat, details.location.lng],
  };

  state.details = detailsObj;
};

export const loadMarkerToMap = function (
  coordinates = state.details.coordinates
) {
  return L.marker(coordinates, { icon: state.markerIcon })
    .addTo(state.mapInstance)
    .bindPopup(
      L.popup({
        minWidth: 100,
        maxWidth: 250,
        autoClose: false,
        closeOnClick: false,
        className: "popup",
      })
    )
    .setPopupContent(`${state.details.ipAddress}`)
    .openPopup();
};

export const loadMap = async function (
  mapElement,
  coordinates = state.details.coordinates
) {
  try {
    state.mapInstance = leaflet
      .map(mapElement, { zoomControl: false })
      .setView(coordinates, 15);

    leaflet
      .tileLayer(
        "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      )
      .addTo(state.mapInstance);
  } catch (error) {
    console.error(error);
  }
};

export const updateMap = async function (
  coordinates = state.details.coordinates
) {
  try {
    state.mapInstance.setView(coordinates, 15);
  } catch (error) {
    console.error(error);
  }
};
