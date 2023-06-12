import * as model from "./model.js";
import mapView from "./views/mapView.js";
import detailsView from "./views/detailsView.js";
import searchView from "./views/searchView.js";

const controlLoadMap = async function (mapElement) {
  await model.getLocalIP();

  await model.getDetails();

  await model.loadMap(mapElement);

  model.loadMarkerToMap();

  detailsView.render(model.state.details);
};

const controlSearchResult = async function () {
  const ipAddress = searchView.getIP();

  if (!ipAddress) return;

  await model.getDetails(ipAddress);

  await model.updateMap();

  model.loadMarkerToMap();

  detailsView.render(model.state.details);
};

const init = function () {
  mapView.addHandlerLoad(controlLoadMap);
  searchView.addHandlerSearch(controlSearchResult);
};

init();
