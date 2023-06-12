class SearchView {
  _parentElement = document.querySelector(".search");

  getIP() {
    const query =
      this._parentElement.querySelector(".search__input").value;

    this._clearInput();

    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search__input").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
