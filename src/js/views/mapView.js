import view from "./view.js";

class mapView extends view {
  _parentElement = document.querySelector(".map");

  addHandlerLoad(handler) {
    window.addEventListener("load", handler(this._parentElement));
  }
}

export default new mapView();
